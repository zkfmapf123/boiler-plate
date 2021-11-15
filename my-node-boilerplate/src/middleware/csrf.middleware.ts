import { Handler, Request, Response } from "express";
import Token from "csrf";

export const CSRF_TOKEN_HEADER = "x-csrf-token";

const ignorePath = ['/api'];
const tokens = new Token();

export const csrf = (): Handler => (req: Request, res: Response, next: Function) => {
  next();
}
