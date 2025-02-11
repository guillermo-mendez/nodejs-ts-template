export class errorHandler {
  private statusCode: number;
  private message: string;
  private methodName: string;
  private errorStack: any;

  constructor() {
    this.statusCode = 500;
    this.message = "Error interno del servidor";
    this.methodName = "";
    this.errorStack = null;
  }

  badRequest(message: string): errorHandler {
    this.statusCode = 400;
    this.message = message;
    this.errorStack = message
    return this;
  }

  conflict(message: string): errorHandler {
    this.statusCode = 409;
    this.message = message;
    this.errorStack = message
    return this;
  }

  unauthorized(message: string): errorHandler {
    this.statusCode = 401;
    this.message = message;
    this.errorStack = message
    return this;
  }

  notFound(message: string): errorHandler {
    this.statusCode = 404;
    this.message = message;
    this.errorStack = message
    return this;
  }

  internalServerError(message: string): errorHandler {
    this.statusCode = 500;
    this.message = message;
    this.errorStack = message
    return this;
  }

  method(methodName: string) {
    this.methodName = methodName;
    return this;
  }

  error(error: any, message?: string) {
    this.statusCode = error.statusCode || 400;
    this.message = message ? message : error.message || "Bad Request";
    this.errorStack = error
    return this;
  }

  debug(params?:any): errorHandler {
    const error = new Error();
    if (error) {
      console.error('Error: ',{
        statusCode: this.statusCode,
        params: params || null,
        method: this.methodName,
        message: this.message,
        error: this.errorStack
      });

      console.error(error)
    }

    return this;
  }

  build() {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}