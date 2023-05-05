import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollageDto } from './dto/create-collage.dto';
import { UpdateCollageDto } from './dto/update-collage.dto';
import { CollageRepository } from './collage.repository';
import { FilterQueryOptionsCollage } from './dto/filter.dto';
import { CollageDocument } from './entities/collage.entity';
import { PaginateResult } from 'mongoose';

@Injectable()
export class CollageService {
  constructor(
    private readonly collageRepository: CollageRepository,

  ) { }
  async create(createCollageDto: CreateCollageDto) {
    return await this.collageRepository.create(createCollageDto as any);
  }
  async findAll(
    queryFiltersAndOptions: FilterQueryOptionsCollage,
  ): Promise<PaginateResult<CollageDocument> | CollageDocument[]> {
    const collage = await this.collageRepository.findAllWithPaginationOption(
      queryFiltersAndOptions,
      ['nameAr', 'nameEn', 'enable', 'university'],
      { populate: ['university'] },
    );
    return collage;
  }





  async findOne(_id: string) {
    const isExisted = await this.collageRepository.findOne(
      { _id },
      {
        populate: [
          { path: 'university', select: 'nameAr nameEn' },
        ],
      },
    );
    if (!isExisted || isExisted.enable == false) throw new NotFoundException();
    return isExisted;
  }

  async update(_id: string, updateCollageDto: UpdateCollageDto) {
    await this.findOne(_id);
    return await this.collageRepository.updateOne({ _id }, updateCollageDto);
  }

  async remove(_id: string) {
    await this.findOne(_id);
    return await this.collageRepository.updateOne({ _id }, { enable: false });

    // return await this.collageRepository.deleteOne({ _id });
  }



}
