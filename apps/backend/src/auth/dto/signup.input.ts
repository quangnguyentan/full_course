import { IsEmail, IsString, MinLength } from 'class-validator';
import { Column } from 'typeorm';

export class SignUpInput {
  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @MinLength(1)
  password: string;

  @Column({ nullable: true })
  @IsString()
  authStrategy?: string;

  @Column()
  createdAt?: Date;
}
