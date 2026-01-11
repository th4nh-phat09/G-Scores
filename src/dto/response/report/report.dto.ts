import { ApiProperty } from '@nestjs/swagger';

import { ScoreLevel } from 'src/enums/score.enum';
export class ScoreLevelStatsDto {
  @ApiProperty({
    example: 'EXCELLENT',
    enum: ScoreLevel,
    description: 'Mức điểm',
  })
  level: ScoreLevel;

  @ApiProperty({
    example: 'Giỏi (≥8 điểm)',
    description: 'Mô tả mức điểm',
  })
  description: string;

  @ApiProperty({
    example: 1250,
    description: 'Số lượng học sinh đạt mức điểm này',
  })
  count: number;

  @ApiProperty({
    example: 15.5,
    description: 'Phần trăm học sinh đạt mức điểm này',
  })
  percentage: number;
}

export class SubjectScoreLevelStatsDto {
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
    example: 8000,
    description: 'Tổng số học sinh có điểm môn này',
  })
  totalStudents: number;

  @ApiProperty({
    type: [ScoreLevelStatsDto],
    description: 'Thống kê theo từng level',
  })
  levels: ScoreLevelStatsDto[];
}
