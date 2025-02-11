import { Request, Response, NextFunction } from 'express';

export const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const error = {
    statusCode: 500,
    message: 'Error interno del servidor'
  }

  if(err) {
    if(err.name && err.name === 'ValidationError') {
      error.statusCode = 400;
      error.message = err.message;

    } else {
      error.statusCode = err.statusCode || 500;
      error.message = err.message || 'Error interno del servidor';
    }
  }

  const errorDetails = JSON.stringify(error, null, 2);
  console.error(`\x1b[31m Error: ${errorDetails}\x1b[0m`); // Loguea el error para depuración.
  res.status(error.statusCode).json(error);
};
