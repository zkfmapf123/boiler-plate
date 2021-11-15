import { Handler, NextFunction, Request, Response } from "express";
import { UnauthorizationException } from "../common/exceptions";
import { verify } from "../lib/jwt";

export const verifyJsonWebToken = (): Handler => (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.header("authorization");

  // token 존재 시
  if (bearerToken) {
    try {
      // const token = bearerToken.replace(/^Bearer /, '');
      // const decodedToken = verify(token);

      // console.log(decodedToken);
      next();
    } catch (e) {
      next(new UnauthorizationException());
    }
  } else {
    next();
  };
};