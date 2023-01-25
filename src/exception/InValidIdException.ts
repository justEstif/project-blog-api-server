import HttpException from '../exception/HttpException'

class InValidIdException extends HttpException {
  constructor(id: string) {
    super(404, `Id ${id} is not valid`)
  }
}

export default InValidIdException
