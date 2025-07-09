import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { hash, verify } from 'argon2';
import { SignUpInput } from './dto/signup.input';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser({ email, password }) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) throw new UnauthorizedException('Email chưa được đăng ký');

    const isPasswordValid = await verify(user?.password, password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    return user;
  }
  async generateToken(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }
  async generateRefreshToken(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    return this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
  }
  async register(signUpInput: SignUpInput) {
    const { email, password, ...user } = signUpInput;
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    const hashedPassword = await hash(password);
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      createdAt: new Date(),
      authStrategy: 'email',
      ...user,
    });
    return await this.userRepository.save(newUser);
  }
  async login(user: User) {
    const accessToken = await this.generateToken(user.id);
    const refreshToken = await this.generateRefreshToken(user.id);
    return {
      id: user.id,
      email: user.email,
      authStrategy: 'email',
      accessToken,
      refreshToken,
    };
  }
  async validateJwtUser(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new UnauthorizedException('User not found');
    const currentUser = { id: user?.id, email: user?.email };
    return currentUser;
  }
  async validateGoogleUser(googleUser: SignUpInput) {
    const user = await this.userRepository.findOne({
      where: { email: googleUser.email },
    });
    if (user) {
      const { password, ...authUser } = user;
      return authUser;
    }
    const dbUser = this.userRepository.create({
      ...googleUser,
      createdAt: new Date(),
      authStrategy: 'google',
    });
    await this.userRepository.save(dbUser);
    const { password, ...authUser } = dbUser;
    return authUser;
  }
}
