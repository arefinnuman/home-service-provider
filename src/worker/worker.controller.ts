import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Session,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateServiceDto } from 'src/dto/create-service.dto';
import { SessionGuard } from 'src/guards/seasion.gurad';
import { CreateWokerDto } from './../dto/create-worker.dto';
import { SignInDto } from './../dto/sign-in.dto';
import { UpdateServiceDto } from './../dto/update-service.dto';
import { UpdateWorkerDto } from './../dto/update-worker.dto';
import { saveUploadedFile } from './../SaveUploader/saveUploadedFile';
import { WorkerService } from './worker.service';

@Controller('/worker')
export class WorkerController {
  constructor(private workerService: WorkerService) {}

  // Create Worker
  @Post('/create')
  async createWorker(@Body() createWorkerdto: CreateWokerDto) {
    return await this.workerService.createWorker(createWorkerdto);
  }

  // Login Worker
  @Post('/sign-in')
  async loginWorker(@Session() session, @Body() signInDto: SignInDto) {
    const found = await this.workerService.loginWorker(signInDto);
    if (found) {
      session.userName = signInDto.userName;
      console.log(session.userName);
      return { message: 'You are logged in' };
    } else {
      return { message: 'Invalid Credentials' };
    }
  }

  // Sign-out
  @Get('/sign-out')
  signout(@Session() session) {
    if (session.destroy()) {
      return { message: 'You are logged out' };
    } else {
      throw new UnauthorizedException('Invalid Actions');
    }
  }

  // Get One Worker
  @Get('/:id')
  async getOneWorker(@Param('id', ParseIntPipe) id: number) {
    return await this.workerService.getOneWorker(id);
  }

  // Edit Profile
  @Put('/edit-profile/:id')
  @UseInterceptors(FileInterceptor('photo', saveUploadedFile))
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) workerUpdateDto: UpdateWorkerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      workerUpdateDto.photo = null;
      return this.workerService.editWorkerProfile(id, workerUpdateDto);
    } else {
      console.log(file);
      workerUpdateDto.photo = file.filename;
      return this.workerService.editWorkerProfile(id, workerUpdateDto);
    }
  }

  // Delete Worker
  @Delete('/delete/:id')
  async deleteWorker(@Param('id', ParseIntPipe) id: number) {
    return await this.workerService.deleteWorker(id);
  }

  // Wokker Can create service
  @Post('/create-service/:id')
  @UseInterceptors(FileInterceptor('serviceImage', saveUploadedFile))
  createServie(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) createServiceDto: CreateServiceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      createServiceDto.serviceImage = null;
      return this.workerService.createServie(id, createServiceDto);
    } else {
      createServiceDto.serviceImage = file.filename;
      return this.workerService.createServie(id, createServiceDto);
    }
  }

  // Woker can view her/his own service
  @Get('/view-service/:id')
  async viewService(@Param('id', ParseIntPipe) id: number) {
    return await this.workerService.viewService(id);
  }
  // Woker can view her/his own services
  @Get('/view-services/:id')
  @UseGuards(new SessionGuard())
  async viewServices(@Param('id', ParseIntPipe) id: number) {
    return await this.workerService.viewServices(id);
  }
  // Worker Can  delete service
  @Delete('/delete-service/:id')
  async deleteService(@Param('id', ParseIntPipe) id: number) {
    return await this.workerService.deleteService(id);
  }
  // Worker Can  update service
  @Put('/update-service/:id')
  @UseInterceptors(FileInterceptor('serviceImage', saveUploadedFile))
  updateService(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateServiceDto: UpdateServiceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      updateServiceDto.serviceImage = null;
      return this.workerService.updateService(id, updateServiceDto);
    } else {
      updateServiceDto.serviceImage = file.filename;
      return this.workerService.updateService(id, updateServiceDto);
    }
  }
  // Worker Can  view orders
  // @Get('/view-orders/:id')
  // async viewOrders(@Param('id', ParseIntPipe) id: number) {
  //   return this.workerService.viewOrders(id);
  // }
  // Worker Can  view order details
  // @Get('/view-order-details/:id')
  // async viewOrderDetails(@Param('id', ParseIntPipe) id: number) {
  //   return await this.workerService.viewOrderDetails(id);
  // }

  @Post('/sendemail')
  sendEmail(@Body() mydata) {
    return this.workerService.sendEmail(mydata);
  }
}
