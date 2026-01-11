import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SubjectCode } from 'src/enums/subject.enum';

export class GetScoreLevelStatsQueryDto {
  @ApiProperty({
    description: 'Mã môn học',
    example: 'toan',
  })
  @IsString({ message: 'Mã môn học phải là chuỗi' })
  @IsEnum(SubjectCode)
  @IsNotEmpty({ message: 'Mã môn học không được để trống' })
  subjectCode: string;
}
