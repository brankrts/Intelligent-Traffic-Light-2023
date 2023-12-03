import { HttpException, HttpStatus } from "@nestjs/common";

export class AlreadyExistException extends HttpException {
  constructor(message: string) {
    super(`${message} already exist!`, HttpStatus.ACCEPTED);
  }
}
