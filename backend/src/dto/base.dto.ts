import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto<T = any> {
  @ApiProperty({
    example: 200,
    description: 'HTTP status code',
  })
  code: number;

  @ApiProperty({
    example: 'Success',
    description: 'Message mô tả kết quả',
  })
  message: string;

  @ApiProperty({
    description: 'Dữ liệu trả về',
    required: false,
  })
  data?: T;

  constructor(code: number, message: string, data?: T) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static success<T>(data?: T, message: string = 'Success'): BaseResponseDto<T> {
    return new BaseResponseDto(200, message, data);
  }

  static error(
    code: number,
    message: string,
    data?: any,
  ): BaseResponseDto<any> {
    return new BaseResponseDto(code, message, data);
  }
}
