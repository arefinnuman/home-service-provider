import { Worker } from 'src/entity/worker.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './../enum/category.enum';

@Entity()
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  serviceId: number;

  @Column()
  serviceName: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  serviceType: Category;

  @Column({ nullable: true })
  serviceImage: string;

  // @ManyToOne(() => Seller, (seller) => seller.products)
  // @JoinColumn({ name: 'FK_SellerId' })
  // seller: Seller;

  @ManyToOne(() => Worker, (worker) => worker.services)
  @JoinColumn({ name: 'FK_workerId' })
  worker: Worker;
}
