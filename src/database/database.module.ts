import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: 'localhost',
        port: parseInt(
          configService.get<string>('MYSQL_PORT', process.env.MYSQL_PORT),
        ),
        username: configService.get<string>(
          'MYSQL_USER',
          process.env.MYSQL_USER,
        ),
        password: configService.get<string>(
          'MYSQL_PASSWORD',
          process.env.MYSQL_PASSWORD,
        ),
        database: configService.get<string>(
          'MYSQL_DATABASE',
          process.env.MYSQL_DATABASE,
        ),
        autoLoadModels: true,
        synchronize: true, // Set to false in production
        logging: console.log, // Set to false in production to disable SQL logging
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
