import { Module } from '@nestjs/common';
import { SubjectController } from 'src/controller/subject/subject.controller';
import { SubjectService } from 'src/services/subject/subject.service';
import { PrismaService } from 'src/services/database/prisma.service';

@Module({
  controllers: [SubjectController],
  providers: [SubjectService, PrismaService],
  exports: [SubjectService],
})
export class SubjectModule {}
