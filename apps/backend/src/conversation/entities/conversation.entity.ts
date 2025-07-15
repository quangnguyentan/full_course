import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'conversation' })
export class Conversation {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToMany(() => User, (user) => user.conversations)
  @JoinTable()
  participants: User[];

  @ManyToOne(() => Message, (message) => message.conversation)
  messages: Message[];
}
