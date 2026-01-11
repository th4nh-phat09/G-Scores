import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/dto/base.dto';
import { GetScoreLevelStatsQueryDto } from 'src/dto/request/report/report.dto';
import { SubjectScoreLevelStatsDto } from 'src/dto/response/report/report.dto';
import { ReportService } from 'src/services/report/report.service';

@ApiTags('Reports')
@Controller('/api/reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('/score-levels')
  @ApiOperation({
    summary: 'Thống kê số lượng học sinh theo 4 mức điểm theo môn',
    description:
      'Thống kê số học sinh đạt điểm ở 4 mức: Giỏi (≥8), Khá (6-8), Trung bình (4-6), Yếu (<4)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lấy thống kê thành công',
    type: SubjectScoreLevelStatsDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy môn học',
  })
  async getScoreLevelStats(
    @Query() query: GetScoreLevelStatsQueryDto,
  ): Promise<BaseResponseDto<SubjectScoreLevelStatsDto>> {
    const data = await this.reportService.getScoreLevelStatsBySubject(
      query.subjectCode,
    );
    return BaseResponseDto.success(
      data,
      `Lấy thống kê môn ${data.subjectName} thành công`,
    );
  }
}
