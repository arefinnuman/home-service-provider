import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 4444,
  username: 'postgres',
  password: 'postgres',
  database: 'homeserviceprovider',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
