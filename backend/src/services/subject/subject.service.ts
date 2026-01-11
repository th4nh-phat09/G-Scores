import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { SubjectListDto } from 'src/dto/response/subject/subject.dto';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  /**
   * Lấy danh sách tất cả môn học
   */
  async getAllSubjects(): Promise<SubjectListDto> {
    const subjects = await this.prisma.subject.findMany({
      select: {
        code: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return {
      subjects,
    };
  }
}
