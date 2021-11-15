import { HttpException } from "./HttpException";

export class UnauthorizationException extends HttpException{
  constructor(message = "허가되지 않은 유저입니다") {
    super({status : 401, message : message})
  };
};