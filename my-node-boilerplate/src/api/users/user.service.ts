import { IJoin, ISignup, SignUpReturnType, UserDto } from "./user.dto";

class UserService implements IJoin, ISignup {
  private readonly email : string;
  private readonly name: string;
  private readonly password: string;

  constructor({ email, name, password }: UserDto) {
    this.email = email;
    this.name = name;
    this.password = password;
  }
  
  public async createJsonWebToken(): Promise<SignUpReturnType> {
    
    return [true, undefined];
  };

  public validationEmail(): boolean{
    return false;
  };

  public validationName(): boolean {
    return true;
  };

  public validationPassword(): boolean {
    return true;
  };

};

export class UserServiceBuilder{
  private email: string;
  private password: string;
  private name: string;

  setEmail(email: string) : this {
    this.email = email;
    return this;
  };

  setPasswrod(password: string) : this {
    this.password = password;
    return this;
  };

  setName(name: string): this {
    this.name = name;
    return this;
  };

  create() {
    return new UserService({
      email: this.email,
      password: this.password,
      name : this.name
    });
  }
};