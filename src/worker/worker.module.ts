import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'src/entity/service.entity';
import { WorkerEntity } from 'src/entity/worker.entity';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
@Module({
  imports: [TypeOrmModule.forFeature([Service, WorkerEntity])],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
