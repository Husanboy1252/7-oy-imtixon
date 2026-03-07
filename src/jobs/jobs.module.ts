import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job } from './entities/job.entity';
import { City } from './entities/city.entity';   // Qo'shildi
import { Region } from './entities/region.entity'; // Qo'shildi


@Module({
  imports: [TypeOrmModule.forFeature([Job, City, Region])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
