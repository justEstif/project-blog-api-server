import { RequestHandler } from 'express'
import { isValidObjectId } from 'mongoose'
import InValidIdException from '../exception/InValidIdException'

const checkPostIdMiddleware: RequestHandler = (request, _, next) => {
  const id = request.params.id
  if (!isValidObjectId(id)) {
    next(new InValidIdException(id))
  } else {
    next()
  }
}
export default checkPostIdMiddleware
