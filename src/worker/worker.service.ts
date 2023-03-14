import { MailerService } from '@nestjs-modules/mailer';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Service } from 'src/entity/service.entity';
import { Worker } from 'src/entity/worker.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(Worker)
    private workerRepository: Repository<Worker>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,

    private mailerService: MailerService,
  ) {}

  // Create Worker
  async createWorker(createWorkerdto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createWorkerdto.password, salt);
    createWorkerdto.password = hashedPassword;
    try {
      return await this.workerRepository.save(createWorkerdto);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exist');
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  // Login Worker
  async loginWorker(signInDto) {
    const { userName, password } = signInDto;

    const user = await this.workerRepository.findOneBy({ userName });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user.userName;
    } else {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }

  // View Profile
  async getOneWorker(workerId) {
    const found = await this.workerRepository.findOneBy({ workerId });
    return found;
  }

  // Edit Profile
  async editWorkerProfile(id, updateWorkerDto) {
    return await this.workerRepository.update(id, updateWorkerDto);
  }

  // Delete Profile
  async deleteWorker(id) {
    return await this.workerRepository.delete(id);
  }

  // Wokker Can create service
  createServie(id, createServiceDto) {
    createServiceDto.worker = id;
    return this.serviceRepository.save(createServiceDto);
  }

  // Woker can view her/his own service
  async viewService(id) {
    return await this.serviceRepository.findOneBy({ serviceId: id });
  }

  // Woker can view her/his own services
  async viewServices(id) {
    return await this.serviceRepository.findBy({ worker: id });
  }

  // Worker Can  delete service
  async deleteService(id) {
    return await this.serviceRepository.delete(id);
  }

  // Worker Can  update service
  async updateService(id, updateServiceDto) {
    return await this.serviceRepository.update(id, updateServiceDto);
  }

  // // Worker Can  view orders
  // async viewOrders(id) {
  //   return await this.orderRepository.find();
  // }

  // // Worker Can  view order details
  // async viewOrderDetails(id) {
  //   return await this.orderRepository.findOneBy({ orderId: id });
  // }

  // Worker Can  view order details
  async sendEmail(mydata) {
    return await this.mailerService.sendMail({
      to: mydata.to,
      subject: mydata.subject,
      text: mydata.text,
    });
  }
}
