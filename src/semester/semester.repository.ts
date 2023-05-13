import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { Semester, SemesterDocument } from './entities/semester.entity';

@Injectable()
export class SemesterRepository extends BaseAbstractRepository<Semester> {
    constructor(
        @InjectModel(Semester.name) private semesterModel: Model<SemesterDocument>,
    ) {
        super(semesterModel);
    }
    async pullStudent(_id: string) {
        await this.semesterModel.updateMany(
            {},
            {
                $pull: {
                    students: {
                        student: {
                            $eq: _id,
                        },
                    },
                } as any,
            },
        );
    }
}
