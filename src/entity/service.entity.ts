import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './../enum/category.enum';

@Entity()
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serviceName: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  serviceType: Category;

  @Column()
  serviceImage: string;
}
