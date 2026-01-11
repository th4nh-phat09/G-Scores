import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import {
  ScoreLevelStatsDto,
  SubjectScoreLevelStatsDto,
} from 'src/dto/response/report/report.dto';
import { ScoreLevel } from 'src/enums/score.enum';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  async getScoreLevelStatsBySubject(
    subjectCode: string,
  ): Promise<SubjectScoreLevelStatsDto> {
    // 1. Lấy môn học
    const subject = await this.prisma.subject.findUnique({
      where: { code: subjectCode },
      select: {
        id: true,
        code: true,
        name: true,
      },
    });

    if (!subject) {
      throw new NotFoundException(
        `Không tìm thấy môn học với mã: ${subjectCode}`,
      );
    }

    // 2. Count theo từng mức điểm (chạy song song)
    const [excellent, good, average, below] = await Promise.all([
      // >= 8
      this.prisma.score.count({
        where: {
          subjectId: subject.id,
          value: { gte: 8 },
        },
      }),

      // 6 <= điểm < 8
      this.prisma.score.count({
        where: {
          subjectId: subject.id,
          value: { gte: 6, lt: 8 },
        },
      }),

      // 4 <= điểm < 6
      this.prisma.score.count({
        where: {
          subjectId: subject.id,
          value: { gte: 4, lt: 6 },
        },
      }),

      // < 4
      this.prisma.score.count({
        where: {
          subjectId: subject.id,
          value: { lt: 4 },
        },
      }),
    ]);

    const totalStudents = excellent + good + average + below;

    // 3. Build response levels
    const levels: ScoreLevelStatsDto[] = [
      {
        level: ScoreLevel.EXCELLENT,
        description: 'Giỏi (≥8 điểm)',
        count: excellent,
        percentage:
          totalStudents > 0
            ? Math.round((excellent / totalStudents) * 10000) / 100
            : 0,
      },
      {
        level: ScoreLevel.GOOD,
        description: 'Khá (6–8 điểm)',
        count: good,
        percentage:
          totalStudents > 0
            ? Math.round((good / totalStudents) * 10000) / 100
            : 0,
      },
      {
        level: ScoreLevel.AVERAGE,
        description: 'Trung bình (4–6 điểm)',
        count: average,
        percentage:
          totalStudents > 0
            ? Math.round((average / totalStudents) * 10000) / 100
            : 0,
      },
      {
        level: ScoreLevel.BELOW_AVERAGE,
        description: 'Yếu (<4 điểm)',
        count: below,
        percentage:
          totalStudents > 0
            ? Math.round((below / totalStudents) * 10000) / 100
            : 0,
      },
    ];

    // 4. Return DTO
    return {
      subjectCode: subject.code,
      subjectName: subject.name,
      totalStudents,
      levels,
    };
  }
}
