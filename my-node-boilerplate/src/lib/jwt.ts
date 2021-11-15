import * as jwt from "jsonwebtoken";
import config from "../config";

export interface JwyPayloadType{
  email: string;
  privateId: number;
  nickname: string;
};

// jwt 만들 때 사용
export const sign = (payload : JwyPayloadType, options?: jwt.SignOptions) => {
  
};

// jwt 풀 때 사용
export const verify = (token: string, options?: jwt.SignOptions) => {
  return jwt.verify(token, config.jwtScreet, options) as JwyPayloadType;
}