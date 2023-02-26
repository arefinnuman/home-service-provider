import { IsNotEmpty } from 'class-validator';

export class CreateWokerDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phoneNumber: number;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  //   @IsNotEmpty()
  //   workerService: Category;
}
