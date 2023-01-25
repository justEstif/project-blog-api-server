import HttpException from '../exception/HttpException'

class UserAlreadyExistsException extends HttpException {
  constructor(field: string, value: string) {
    super(400, `User with ${field} ${value} already exists`)
  }
}

export default UserAlreadyExistsException
