import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CollageService } from './collage.service';
import { CreateCollageDto } from './dto/create-collage.dto';
import { UpdateCollageDto } from './dto/update-collage.dto';
import { FilterQueryOptionsCollage } from './dto/filter.dto';
import { CollageDocument } from './entities/collage.entity';
import { PaginateResult } from 'mongoose';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
@ApiTags('Collage')
@ApiBearerAuth()
@Controller('collage')

export class CollageController {
  constructor(private readonly collageService: CollageService) { }
  @Public()
  @Post()
  create(@Body() createCollageDto: CreateCollageDto) {
    return this.collageService.create(createCollageDto);
  }

  @Public()
  @Get()
  async findAll(
    @Query() queryFiltersAndOptions: FilterQueryOptionsCollage,
  ): Promise<PaginateResult<CollageDocument> | CollageDocument[]> {
    return await this.collageService.findAll(queryFiltersAndOptions);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collageService.findOne(id);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollageDto: UpdateCollageDto) {
    return this.collageService.update(id, updateCollageDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collageService.remove(id);
  }
}
