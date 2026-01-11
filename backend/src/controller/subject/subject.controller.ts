import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/dto/base.dto';
import { SubjectListDto } from 'src/dto/response/subject/subject.dto';
import { SubjectService } from 'src/services/subject/subject.service';

@ApiTags('Subjects')
@Controller('/api/subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get('/')
  @ApiOperation({
    summary: 'Lấy danh sách tất cả môn học',
    description: 'Lấy danh sách tất cả môn thi THPT 2024',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lấy danh sách môn học thành công',
    type: SubjectListDto,
  })
  async getAllSubjects(): Promise<BaseResponseDto<SubjectListDto>> {
    const data = await this.subjectService.getAllSubjects();
    return BaseResponseDto.success(data, 'Lấy danh sách môn học thành công');
  }
}
