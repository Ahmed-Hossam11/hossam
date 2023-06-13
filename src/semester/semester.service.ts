import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';
import { SemesterRepository } from './semester.repository';
import { FilterQueryOptionsSemester } from './dto/filter.dto';
import { SemesterDocument } from './entities/semester.entity';
import { PaginateResult } from 'mongoose';

@Injectable()
export class SemesterService {


  constructor(
    private readonly semesterRepository: SemesterRepository,

  ) { }
  async create(createSemesterDto: CreateSemesterDto) {
    return await this.semesterRepository.create(createSemesterDto as any);
  }
  async findAll(
    queryFiltersAndOptions: FilterQueryOptionsSemester,
  ): Promise<PaginateResult<SemesterDocument> | SemesterDocument[]> {
    const collage = await this.semesterRepository.findAllWithPaginationOption(
      queryFiltersAndOptions,
      ['nameAr', 'nameEn', 'enable']
    );
    return collage;
  }

  async findOne(_id: string) {
    const isExisted = await this.semesterRepository.findOne(
      { _id }
    );
    if (!isExisted || isExisted.enable == false) throw new NotFoundException();
    return isExisted;
  }

  async update(_id: string, updateSemesterDto: UpdateSemesterDto) {
    await this.findOne(_id);
    return await this.semesterRepository.updateOne({ _id }, updateSemesterDto);
  }

  async remove(_id: string) {
    await this.findOne(_id);
    return await this.semesterRepository.updateOne({ _id }, { enable: false });
  }
}
