import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-google-oauth20';
import { VerifiedCallback } from 'passport-jwt';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID') ?? '',
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET') ?? '',
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL') ?? '',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifiedCallback,
  ) {
    const user = await this.authService.validateGoogleUser({
      email: profile.emails[0].value,
      authStrategy: profile?.provider ?? 'google',
      password: '',
    });
    done(null, user);
  }
}
