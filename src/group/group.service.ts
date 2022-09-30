import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { CreateGroupDto } from './dto/create-group.dto';
import { FilterQueryOptionsGroup } from './dto/filter.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupRepository } from './group.repository';
import { GroupDocument } from './models/group.model';

@Injectable()
export class GroupService {
  constructor(private readonly GroupRepository: GroupRepository) {}
  async create(createGroupDto: CreateGroupDto) {
    return await this.GroupRepository.create(createGroupDto);
  }

  async findAll(
    queryFiltersAndOptions: FilterQueryOptionsGroup,
  ): Promise<PaginateResult<GroupDocument> | GroupDocument[]> {
    const groups = await this.GroupRepository.findAllWithPaginationOption(
      queryFiltersAndOptions,
      ['name', 'university'],
      { populate: ['students.student', 'university'] },
    );
    return groups;
  }

  async findOne(_id: string) {
    const isExisted = await this.GroupRepository.findOne(
      { _id },
      {
        populate: [
          { path: 'university', select: 'nameAr nameEn' },
          { path: 'students.student' },
        ],
      },
    );
    if (!isExisted) throw new NotFoundException();
    return isExisted;
  }

  async update(_id: string, updateGroupDto: UpdateGroupDto) {
    await this.findOne(_id);
    return await this.GroupRepository.updateOne({ _id }, updateGroupDto);
  }

  async remove(_id: string) {
    await this.findOne(_id);
    return await this.GroupRepository.deleteOne({ _id });
  }

  async removeStudent(_id: string) {
    await this.GroupRepository.pullStudent(_id);
  }
}
