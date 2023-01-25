import HttpException from './HttpException'

class NotOwnerException extends HttpException {
  constructor() {
    super(401, "Logged in user doesn't have authority for this request")
  }
}

export default NotOwnerException
