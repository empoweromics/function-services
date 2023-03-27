import { Response } from "express";
import { HttpStatus } from "../config/httpCodes";

export class HttpError extends Error {
  status: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.status = statusCode;
  }
}

export class UnauthorizedError extends HttpError {
  status = HttpStatus.UNAUTHORIZED;

  constructor(message: string, res: Response) {
    super(message);
    res.setHeader("www-authenticate", "Bearer");
    res.sendStatus(this.status);
  }
}

export class UserError extends Error {
  constructor(
    public message: string,
    public cause: string,
    public location: string
  ) {
    super(message);
    this.message = message;
    this.cause = cause;
    this.location = location;
  }
}
