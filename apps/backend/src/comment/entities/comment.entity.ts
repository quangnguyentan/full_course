import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';

@Entity({ name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  post: Post;

  @ManyToOne(() => User, (user) => user.comments, { nullable: false })
  author: User;

  @ManyToMany(() => User, (user) => user.likedComments)
  likedBy: User[];
}
