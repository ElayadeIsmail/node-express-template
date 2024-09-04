import { ZodIssue } from 'zod';
import { CustomError } from './custom-error';

export class ValidationError extends CustomError {
  statusCode = 400;

  constructor(public zodIssues: ZodIssue[]) {
    super('Invalid Request Data');

    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeErrors() {
    return this.zodIssues.map((_issue) => ({
      message: _issue.message,
      field: _issue.path.join('.'),
    }));
  }
}
