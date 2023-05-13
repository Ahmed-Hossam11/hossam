import { IntersectionType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsBoolean,
    IsEnum,
    IsMongoId,
    IsOptional,
    IsString,
} from 'class-validator';
import { escapeRegExp } from 'lodash';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';

export class FilterQuerySemester {
    @IsOptional()
    @Transform(({ obj }) => {
        return new RegExp(escapeRegExp(obj.nameAr), 'i');
    })
    nameAr?: string;

    @IsOptional()
    @Transform(({ obj }) => {
        return new RegExp(escapeRegExp(obj.nameAr), 'i');
    })
    nameEn?: string;

    @IsOptional()
    @IsBoolean()
    @Transform(({ obj }) => {
        return JSON.parse(obj.enable);
    })
    enable?: boolean;
}

export class FilterQueryOptionsSemester extends IntersectionType(
    FilterQuerySemester,
    PaginationParams,
) { }
