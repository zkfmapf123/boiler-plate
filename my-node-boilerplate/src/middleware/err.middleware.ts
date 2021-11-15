import { NextFunction } from "connect";
import { ErrorRequestHandler, Request, Response } from "express";
import { HttpException } from "../common/exceptions";

export const errMiddleware : ErrorRequestHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message;

  res.status(status).send({
    status,
    message
  });

  next();
}