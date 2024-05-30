export interface IFormatExceptionMessage {
  message: string;
  code_error?: number;
}

export interface IException {
  notFoundException(data: IFormatExceptionMessage): void;
  badRequestException(data: IFormatExceptionMessage): void;
  internalServerErrorException(data?: IFormatExceptionMessage): void;
  forbiddenException(data?: IFormatExceptionMessage): void;
  UnauthorizedException(data?: IFormatExceptionMessage): void;
}
