import { ApiProperty } from '@nestjs/swagger';

export class SubjectScoreDto {
  @ApiProperty({
    example: 'toan',
    description: 'Mã môn học',
  })
  subjectCode: string;

  @ApiProperty({
    example: 'Toán',
    description: 'Tên môn học',
  })
  subjectName: string;

  @ApiProperty({
    example: 8.75,
    description: 'Điểm số',
  })
  value: number;
}

export class StudentScoreDto {
  @ApiProperty({
    example: '01001234',
    description: 'Số báo danh',
  })
  registrationNumber: string;

  @ApiProperty({
    example: 'N1',
    nullable: true,
    description: 'Mã ngoại ngữ (N1-Tiếng Anh, N2-Tiếng Nga,...)',
  })
  languageCode: string | null;

  @ApiProperty({
    type: [SubjectScoreDto],
    description: 'Danh sách điểm các môn',
  })
  scores: SubjectScoreDto[];
}
