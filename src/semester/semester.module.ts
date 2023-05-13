import { Module } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { SemesterController } from './semester.controller';
import { SemesterRepository } from './semester.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Semester, SemesterSchema } from './entities/semester.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Semester.name,
        schema: SemesterSchema,
      },
    ]),
  ],
  controllers: [SemesterController],
  providers: [SemesterService, SemesterRepository],
  exports: [SemesterService, SemesterRepository],
})
export class SemesterModule { }
