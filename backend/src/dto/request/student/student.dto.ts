import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class GetStudentScoreParamDto {
  @ApiProperty({
    description: 'Số báo danh (7 hoặc 8 chữ số)',
    example: '01001234',
    minLength: 7,
    maxLength: 8,
  })
  @IsString({ message: 'Số báo danh phải là chuỗi' })
  @IsNotEmpty({ message: 'Số báo danh không được để trống' })
  @Matches(/^\d{7,8}$/, {
    message: 'Số báo danh phải có 7 hoặc 8 chữ số',
  })
  registrationNumber: string;
}
