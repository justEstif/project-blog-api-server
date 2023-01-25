import HttpException from '../exception/HttpException'

class UserAlreadyLoggedInException extends HttpException {
  constructor() {
    super(404, `User already logged in. Logged out, before attempting request`)
  }
}

export default UserAlreadyLoggedInException

