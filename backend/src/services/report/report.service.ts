import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

import {
  ScoreLevelStatsDto,
  SubjectScoreLevelStatsDto,
  SubjectScoreDetailDto,
  Top10GroupADto,
  Top10GroupAStudentDto,
} from 'src/dto/response/report/report.dto';
import { DashboardStatsDto } from 'src/dto/response/report/dashboard.dto';
import { ScoreLevel } from 'src/enums/score.enum';
import { SubjectCode } from 'src/enums/subject.enum';

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

  async getTop10GroupA() {
    // 1. Lấy subject IDs
    const subjects = await this.prisma.subject.findMany({
      where: {
        code: {
          in: [SubjectCode.HOA_HOC, SubjectCode.TOAN, SubjectCode.VAT_LI],
        },
      },
      select: { id: true, code: true, name: true },
    });

    if (subjects.length !== 3) {
      throw new NotFoundException('Thiếu môn Toán, Lý hoặc Hóa');
    }

    const subjectMap = new Map(subjects.map((s) => [s.code, s.id]));

    const toanId = subjectMap.get(SubjectCode.TOAN)!;
    const lyId = subjectMap.get(SubjectCode.VAT_LI)!;
    const hoaId = subjectMap.get(SubjectCode.HOA_HOC)!;

    // 2. RAW SQL lấy top 10
    const topStudents = await this.prisma.$queryRaw<
      {
        studentId: number;
        registrationNumber: string;
        totalScore: number;
      }[]
    >`
    SELECT
      s.id AS "studentId",
      s."registrationNumber",
      SUM(sc.value) AS "totalScore"
    FROM "Student" s
    JOIN "Score" sc ON sc."studentId" = s.id
    WHERE sc."subjectId" IN (${toanId}, ${lyId}, ${hoaId})
    GROUP BY s.id, s."registrationNumber"
    HAVING COUNT(DISTINCT sc."subjectId") = 3
    ORDER BY "totalScore" DESC
    LIMIT 10;
  `;

    // 3. Lấy chi tiết điểm 3 môn cho 10 thằng này
    const studentIds = topStudents.map((s) => s.studentId);

    const scores = await this.prisma.score.findMany({
      where: {
        studentId: { in: studentIds },
        subjectId: { in: [toanId, lyId, hoaId] },
      },
      select: {
        studentId: true,
        value: true,
        subject: {
          select: { code: true, name: true },
        },
      },
    });

    // 4. Gom điểm theo student
    const scoreMap = new Map<number, any[]>();
    for (const sc of scores) {
      if (!scoreMap.has(sc.studentId)) scoreMap.set(sc.studentId, []);
      scoreMap.get(sc.studentId)!.push({
        subjectCode: sc.subject.code,
        subjectName: sc.subject.name,
        score: sc.value,
      });
    }

    // 5. Build response
    const students = topStudents.map((s, idx) => ({
      rank: idx + 1,
      registrationNumber: s.registrationNumber,
      totalScore: Number(s.totalScore),
      scores: scoreMap.get(s.studentId) ?? [],
    }));

    return {
      students,
      total: students.length,
    };
  }

  //Lấy thống kê tổng quan cho dashboard
  //Sử dụng count() với index để tối ưu performance
  async getDashboardStats(): Promise<DashboardStatsDto> {
    const [totalStudents, totalSubjects] = await Promise.all([
      // Đếm tổng số học sinh
      this.prisma.student.count(),

      // Đếm tổng số môn
      this.prisma.subject.count(),
    ]);

    return {
      totalStudents,
      totalSubjects,
    };
  }
}
