import { Types } from 'mongoose'
import HttpException from '../exception/HttpException'

class PostNotFoundException extends HttpException {
  constructor(id: Types.ObjectId | string) {
    super(404, `Post with id ${id} not found`)
  }
}

export default PostNotFoundException
