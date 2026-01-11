import { Module } from '@nestjs/common';
import { ReportController } from 'src/controller/report/report.controller';
import { PrismaService } from 'src/services/database/prisma.service';
import { ReportService } from 'src/services/report/report.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService, PrismaService],
  exports: [ReportService],
})
export class ReportModule {}
