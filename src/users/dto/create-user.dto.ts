import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { Constants } from 'src/utils/constants';

export class CreateStudentDto {
  @IsString()
  @IsMongoId()
  university: string;

  @IsString()
  @IsMongoId()
  collage: string;


  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNumber()
  @IsOptional()
  @ApiHideProperty()
  userId?: number;

  // @IsString()
  // @IsNotEmpty()
  // usernameAr?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password?: string;

  @IsString()
  @IsOptional()
  @Matches(Constants.PHONE_REGX, { message: 'phone is invalid' })
  phone: string;

  @IsString()
  @Matches(Constants.EMAIL_REGX, { message: 'email is invalid' })
  email: string;
}

export class CreateTeamMemberDto extends RegisterDto {
  @IsString()
  @Matches(Constants.PHONE_REGX, { message: 'phone is invalid' })
  whatsapp: string;

  @IsNumber()
  @IsOptional()
  @ApiHideProperty()
  userId?: number;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary' })
  photo: string;
}
