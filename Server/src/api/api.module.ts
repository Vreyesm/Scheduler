import { Module } from '@nestjs/common';
import { PingController } from './ping/ping.controller';

@Module({
  imports: [],
  controllers: [PingController],
  providers: [],
})
export class ApiModule {}
