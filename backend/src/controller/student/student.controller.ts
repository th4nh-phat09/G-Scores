import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/dto/base.dto';
import { GetStudentScoreParamDto } from 'src/dto/request/student/student.dto';
import { StudentScoreDto } from 'src/dto/response/student/student.dto';
import { StudentService } from 'src/services/student/student.service';

@ApiTags('Students')
@Controller('/api/students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('/')
  getMe() {
    return BaseResponseDto.success({ status: 'ok' }, 'Student endpoint works!');
  }

  @Get('/:registrationNumber/score')
  @ApiOperation({
    summary: 'Xem điểm thi của học sinh theo số báo danh',
    description:
      'Tra cứu điểm thi THPT 2024 theo số báo danh (7 hoặc 8 chữ số)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lấy điểm học sinh thành công',
    type: StudentScoreDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy học sinh với số báo danh này',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Số báo danh không hợp lệ',
  })
  async findStudentScore(
    @Param() params: GetStudentScoreParamDto,
  ): Promise<BaseResponseDto<StudentScoreDto>> {
    const data = await this.studentService.findStudentScore(
      params.registrationNumber,
    );

    return BaseResponseDto.success(data, 'Lấy điểm học sinh thành công');
  }
}
