import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'src/entity/service.entity';
import { Worker } from 'src/entity/worker.entity';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'siamulbaria@gmail.com',
          pass: 'gokfomtuknkbvlnh',
        },
      },
    }),
    TypeOrmModule.forFeature([Service, Worker]),
  ],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
