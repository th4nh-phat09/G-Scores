import { ApiProperty } from '@nestjs/swagger';

export class SubjectDto {
  @ApiProperty({
    example: 'toan',
    description: 'Mã môn học',
  })
  code: string;

  @ApiProperty({
    example: 'Toán',
    description: 'Tên môn học',
  })
  name: string;
}

export class SubjectListDto {
  @ApiProperty({
    type: [SubjectDto],
    description: 'Danh sách môn học',
  })
  subjects: SubjectDto[];
}
