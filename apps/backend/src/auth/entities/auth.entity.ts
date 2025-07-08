import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'auth' })
export class Auth {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  accessToken?: string;
}
