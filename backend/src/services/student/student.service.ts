import { Injectable, NotFoundException } from '@nestjs/common';
import {
  StudentScoreDto,
  SubjectScoreDto,
} from 'src/dto/response/student/student.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}
  async findStudentScore(registrationNumber: string): Promise<StudentScoreDto> {
    // Chuẩn hóa SBD (7 → 8 số)
    const normalizedSBD =
      registrationNumber.length === 7
        ? '0' + registrationNumber
        : registrationNumber;

    const student = await this.prisma.student.findUnique({
      where: { registrationNumber: normalizedSBD },
      select: {
        registrationNumber: true,
        languageCode: {
          select: { code: true },
        },
        scores: {
          select: {
            value: true,
            subject: {
              select: {
                code: true,
                name: true,
              },
            },
          },
          orderBy: {
            subjectId: 'asc',
          },
        },
      },
    });

    if (!student) {
      throw new NotFoundException(
        `Không tìm thấy học sinh có số báo danh ${registrationNumber}`,
      );
    }

    return {
      registrationNumber: student.registrationNumber,
      languageCode: student.languageCode?.code ?? null,
      scores: student.scores.map(
        (s): SubjectScoreDto => ({
          subjectCode: s.subject.code,
          subjectName: s.subject.name,
          value: s.value,
        }),
      ),
    };
  }
}
