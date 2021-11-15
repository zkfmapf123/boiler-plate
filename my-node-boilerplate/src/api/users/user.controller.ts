import { Handler, Request, Response, Router } from "express";
import { BadRequestException } from "../../common/exceptions";
import { Controller } from "../../common/interfaces/controller";
import routerPath from "../../common/router.path";
import { UserDto } from "./user.dto";
import { UserServiceBuilder } from "./user.service";

export class UserController implements Controller{
  public path = routerPath.USERS;
  public router = Router();
  private userServiceBuilder : UserServiceBuilder

  constructor(
    userServiceBuilder: UserServiceBuilder = new UserServiceBuilder()
  ) {
    this.initialRoutes();
    this.userServiceBuilder = userServiceBuilder;
  };

  public initialRoutes(){
    const router = Router();
    router.post(routerPath.USERS_LOGIN, this.signUp);
    router.post(routerPath.USERS_JOIN, this.login);
    
    this.router.use(this.path, router);
  };

  // 회원가입
  public signUp = async (req: Request, res: Response) => {
    const { email, password, name } = req.body.data as UserDto;
    
    console.log(req.body.data);
    
    const userService = this.userServiceBuilder
      .setEmail(email)
      .setPasswrod(password)
      .create();
    
    if (!userService.validationEmail()) {
      throw new BadRequestException("이메일");
    };

    if (!userService.validationName()) {
      throw new BadRequestException("이름");
    };

    if (!userService.validationPassword()) {
      throw new BadRequestException("비밀번호")
    };

    const [token, tokenError] = await userService.createJsonWebToken();
    console.log(token);

    return res.status(200).json({
      token
    });
  };

  // 로그인
  public login = async (req: Request, res: Response) => {
    
    return res.status(200).json({

    });
  } 
}