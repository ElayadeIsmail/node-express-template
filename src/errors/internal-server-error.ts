import { CustomError } from './custom-error';

export class InternalServerError extends CustomError {
  statusCode = 500;

  constructor(public message = 'Internal Server Error') {
    super(message);

    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
