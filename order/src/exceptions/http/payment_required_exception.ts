import {
  HttpException,
  HttpExceptionOptions,
  HttpStatus,
} from '@nestjs/common';

export class PaymentRequiredException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    descriptionOrOptions: string | HttpExceptionOptions = 'Payment Required',
  ) {
    const { description = 'Payment Required', httpExceptionOptions } =
      HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);
    super(
      HttpException.createBody(objectOrError, description, HttpStatus.GONE),
      HttpStatus.GONE,
      httpExceptionOptions,
    );
  }
}
