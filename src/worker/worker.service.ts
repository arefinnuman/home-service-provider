import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkerEntity } from 'src/entity/worker.entity';
import { Repository } from 'typeorm';
import { CreateWokerDto } from './../dto/create-worker.dto';

@Injectable()
export class WorkerService {
  @InjectRepository(WorkerEntity)
  private workerRepository: Repository<WorkerEntity>;

  // Create User
  async createWorker(createWorkerdto: CreateWokerDto) {
    const {
      userName,
      password,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      city,
    } = createWorkerdto;
    const worker = new WorkerEntity();
    worker.userName = userName;
    worker.password = password;
    worker.firstName = firstName;
    worker.lastName = lastName;
    worker.email = email;
    worker.phoneNumber = phoneNumber;
    worker.address = address;
    worker.city = city;
    // worker.workerService = category;
    await worker.save();
    return worker;
  }

  // Get All worker
  async getAllWorkers(): Promise<WorkerEntity[]> {
    const workers = await this.workerRepository.find();
    return workers;
  }

  // Get One worker
  async getOneWorker(id: number): Promise<WorkerEntity> {
    const found = await this.workerRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException('Worker not found');
    }

    return found;
  }

  // Update worker
  async editWorkerProfile(
    id: number,
    createWorkerdto: CreateWokerDto,
  ): Promise<WorkerEntity> {
    const {
      userName,
      password,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      city,
    } = createWorkerdto;
    const worker = await this.getOneWorker(id);
    worker.userName = userName;
    worker.password = password;
    worker.firstName = firstName;
    worker.lastName = lastName;
    worker.email = email;
    worker.phoneNumber = phoneNumber;
    worker.address = address;
    worker.city = city;

    await worker.save();
    return worker;
  }

  // Delete worker
  async deleteWorker(id: number): Promise<WorkerEntity> {
    const worker = await this.getOneWorker(id);
    await worker.remove();
    return worker;
  }
}
