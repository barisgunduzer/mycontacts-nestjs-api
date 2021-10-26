import { Module } from '@nestjs/common';
import { connString, connectionName } from './constants/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(connString, {
      connectionName,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
