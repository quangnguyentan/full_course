import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  createdAt?: Date;

  @Column({ nullable: true })
  authStrategy?: string;
}
