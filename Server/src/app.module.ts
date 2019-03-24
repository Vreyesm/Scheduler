import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { RouterModule, Routes } from 'nest-router';

const routes: Routes = [
  {
    path: '/api',
    module: ApiModule,
  },
];

@Module({
  imports: [
    ApiModule,
    RouterModule.forRoutes(routes),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
