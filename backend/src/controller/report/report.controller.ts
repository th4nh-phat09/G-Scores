import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/dto/base.dto';
import { GetScoreLevelStatsQueryDto } from 'src/dto/request/report/report.dto';
import {
  SubjectScoreLevelStatsDto,
  Top10GroupADto,
} from 'src/dto/response/report/report.dto';
import { DashboardStatsDto } from 'src/dto/response/report/dashboard.dto';
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

  @Get('/top-10-group-a')
  @ApiOperation({
    summary: 'Lấy top 10 học sinh có tổng điểm khối A cao nhất',
    description:
      'Top 10 học sinh có tổng điểm cao nhất trong khối A (Toán + Lý + Hóa). ' +
      'Chỉ tính học sinh có đủ điểm cả 3 môn.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lấy danh sách thành công',
    type: Top10GroupADto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm đủ 3 môn Toán, Lý, Hóa trong hệ thống',
  })
  async getTop10GroupA(): Promise<BaseResponseDto<Top10GroupADto>> {
    const data = await this.reportService.getTop10GroupA();
    return BaseResponseDto.success(data, 'Lấy top 10 khối A thành công');
  }

  @Get('/dashboard-stats')
  @ApiOperation({
    summary: 'Lấy thống kê tổng quan cho dashboard',
    description:
      'Lấy tổng số thí sinh, số môn thi và điểm trung bình toàn hệ thống',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lấy thống kê thành công',
    type: DashboardStatsDto,
  })
  async getDashboardStats(): Promise<BaseResponseDto<DashboardStatsDto>> {
    const data = await this.reportService.getDashboardStats();
    return BaseResponseDto.success(data, 'Lấy thống kê dashboard thành công');
  }
}
