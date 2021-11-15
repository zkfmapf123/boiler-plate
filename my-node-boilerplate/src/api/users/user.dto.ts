export type UserDto = {
  email: string;
  name: string;
  password: string;
};

export interface ISignup{
  createJsonWebToken(): Promise<SignUpReturnType>;
};

export interface IJoin{
  validationEmail(): boolean;
  validationName(): boolean;
  validationPassword(): boolean;
};





















/** Return Type */
export type SignUpReturnType = [boolean | undefined, Error | undefined];