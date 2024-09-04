import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode: 400;
  constructor(public message = 'Bad Request') {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
