import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';

import { User } from './user/entities/user.entity';
import { Auth } from './auth/entities/auth.entity';
import { Post } from './post/entities/post.entity';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/entities/comment.entity';
import { MessageModule } from './message/message.module';
import { Message } from './message/entities/message.entity';
import { ConversationModule } from './conversation/conversation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT') || 3306,
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'), // ✅ Thiếu password
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Auth, Post, Comment, Message], // ✅ Đảm bảo đủ entity
        synchronize: true, // ⚠️ Bỏ khi production
      }),
    }),
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
    MessageModule,
    ConversationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
