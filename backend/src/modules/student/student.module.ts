import { Module } from '@nestjs/common';
import { StudentController } from 'src/controller/student/student.controller';
import { PrismaService } from 'src/services/database/prisma.service';
import { StudentService } from 'src/services/student/student.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService, PrismaService],
  exports: [StudentService],
})
export class StudentModule {}
