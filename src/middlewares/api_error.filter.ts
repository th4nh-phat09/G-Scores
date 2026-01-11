// api-error.ts
import { HttpException } from '@nestjs/common';

export class ApiError extends HttpException {
  code: number;

  constructor(status: number, code: number, message: string) {
    // payload gửi vào HttpException.getResponse()
    super({ message, code }, status);
    this.code = code;
  }
}
