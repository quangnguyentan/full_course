import { Post } from 'src/post/entities/post.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from 'src/message/entities/message.entity';
import { Conversation } from 'src/conversation/entities/conversation.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  profilePicture: string;

  @Column({ default: '' })
  bio: string;

  @Column({
    type: 'enum',
    enum: ['male', 'female', 'other'],
    default: 'other',
  })
  gender: 'male' | 'female' | 'other';

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable()
  followers: User[];

  @ManyToMany(() => User, (user) => user.followers)
  following: User[];

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @ManyToMany(() => Post, (post) => post.bookmarkedBy)
  bookmarks: Post[];

  @ManyToMany(() => Post, (post) => post.likes)
  likedPosts: Post[];

  @ManyToMany(() => Comment, (comment) => comment.likedBy)
  likedComments: Comment[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[];

  @ManyToMany(() => Conversation, (conversation) => conversation.participants)
  conversations: Conversation[];

  @CreateDateColumn()
  createdAt?: Date;

  @Column({ nullable: true })
  authStrategy?: string;
}
