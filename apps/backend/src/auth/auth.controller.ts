import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/signin.input';
import { SignUpInput } from './dto/signup.input';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) { }

  @Post('login')
  async signIn(
    @Body() signInInput: SignInInput,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(signInInput);
    const result = await this.authService.login(user);
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });
    return { user: result };
  }

  @Post('register')
  async signUp(@Body() signUpInput: SignUpInput) {
    return this.authService.register(signUpInput);
  }
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() { }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Res() res: Response) {
    const userData = await this.authService.login(req.user);
    res.cookie('accessToken', userData.accessToken, {
      httpOnly: true, // Không cho frontend JS truy cập
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 2 phút
    });
    res.redirect(
      `${this.configService.get<string>('CLIENT_URL')}/api/auth/google/callback?userId=${userData?.id}`,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get('verify-token')
  verify() {
    return 'ok';
  }
}
