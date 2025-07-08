import { IsEmail, MinLength } from 'class-validator';

export class SignInInput {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
