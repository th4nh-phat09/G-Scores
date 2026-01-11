import { ApiProperty } from '@nestjs/swagger';

export class DashboardStatsDto {
  @ApiProperty({
    example: 8000,
    description: 'Tổng số thí sinh',
  })
  totalStudents: number;

  @ApiProperty({
    example: 9,
    description: 'Số môn thi',
  })
  totalSubjects: number;
}
