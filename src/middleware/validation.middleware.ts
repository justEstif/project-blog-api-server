import 'reflect-metadata' // required for class-transformer
import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { RequestHandler } from 'express'
import HttpException from '../exception/HttpException'

// checks that the request has all the required fields
function validationMiddleware(type: any): RequestHandler {
  return (req, _, next) => {
    validate(plainToInstance(type, req.body)).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors
            .map((error: ValidationError) =>
              error.constraints ? Object.values(error.constraints) : ''
            )
            .join(', ')
          next(new HttpException(400, message))
        } else {
          next()
        }
      }
    )
  }
}
export default validationMiddleware
