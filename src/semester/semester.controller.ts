import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';
import { FilterQueryOptionsSemester } from './dto/filter.dto';
import { SemesterDocument } from './entities/semester.entity';
import { PaginateResult } from 'mongoose';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Semester')
@Controller('semester')
export class SemesterController {
  constructor(private readonly semesterService: SemesterService) { }

  @Public()
  @Post()
  create(@Body() createSemesterDto: CreateSemesterDto) {
    return this.semesterService.create(createSemesterDto);
  }

  @Public()
  @Get()
  async findAll(
    @Query() queryFiltersAndOptions: FilterQueryOptionsSemester,
  ): Promise<PaginateResult<SemesterDocument> | SemesterDocument[]> {
    return await this.semesterService.findAll(queryFiltersAndOptions);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.semesterService.findOne(id);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSemesterDto: UpdateSemesterDto) {
    return this.semesterService.update(id, updateSemesterDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.semesterService.remove(id);
  }



}
