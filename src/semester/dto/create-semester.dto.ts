import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { IsNonPrimitiveArray } from 'src/utils/custumValidationDecorator';

export class CreateSemesterDto {
    @IsString()
    @IsNotEmpty()
    nameAr: string;

    @IsString()
    @IsNotEmpty()
    nameEn: string;

    @IsBoolean()
    @IsOptional()
    @ApiHideProperty()
    enable: boolean;

}