export function responseHandler<T>(data: T, message?:string): { statusCode: number; message:string | undefined, data: T } {
  return { statusCode: 200, message, data };
}