import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WorkerEntity } from 'src/entity/worker.entity';
import { CreateWokerDto } from './../dto/create-worker.dto';
import { WorkerService } from './worker.service';

@Controller('/worker')
export class WorkerController {
  constructor(private workerService: WorkerService) {}

  // Create Worker
  @Post('/create')
  async createWorker(@Body() createWorkerdto: CreateWokerDto) {
    return this.workerService.createWorker(createWorkerdto);
  }

  // Get All Workers
  @Get('/all')
  async getAllWorkers() {
    return this.workerService.getAllWorkers();
  }

  // Get One Worker
  @Get('/:id')
  async getOneWorker(@Param('id') id: number) {
    return this.workerService.getOneWorker(id);
  }

  // Update Worker
  @Put('/:id')
  async editWorkerProfile(
    @Param('id') id: number,
    @Body() createWorkerdto: CreateWokerDto,
  ): Promise<WorkerEntity> {
    return this.workerService.editWorkerProfile(id, createWorkerdto);
  }

  // Delete Worker
  @Delete('/delete/:id')
  async deleteWorker(@Param('id') id: number) {
    return this.workerService.deleteWorker(id);
  }
}
