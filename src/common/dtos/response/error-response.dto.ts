export class ErrorResponseDto {
    errorCode: string;
    message: string;
    timestamp: string;
  
    constructor(message: string, errorCode: string) {
      this.message = message;
      this.errorCode = errorCode;
      this.timestamp = new Date().toISOString();
    }
  }
  