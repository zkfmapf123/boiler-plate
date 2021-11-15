export class HttpException extends Error{
  public status: number;
  public message: string;

  constructor({ status, message }) {
    super();
    this.status = status;
    this.message = message;
  }
};
