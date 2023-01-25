import { NextFunction, Request, Response } from 'express'
import HttpException from '../exception/HttpException'
import endpoints from '../utils/endpoints'

function errorMiddleware(
  error: HttpException,
  _: Request,
  response: Response,
  __: NextFunction
) {
  const status = error.status || 500
  const message = error.message || 'Something went wrong'
  const stack = error.stack
  response.status(status).json({
    status,
    message,
    ...(endpoints.NODE_ENV !== 'production' && { stack })
  })
}

export default errorMiddleware
