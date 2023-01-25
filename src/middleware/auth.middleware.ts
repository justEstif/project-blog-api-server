import { RequestHandler } from 'express'
import passport from 'passport'
import WrongAuthenticationTokenException from '../exception/WrongAuthenticationTokenMissingException'

const authMiddleware: RequestHandler = (request, response, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      next(new WrongAuthenticationTokenException())
    } else {
      request.user = user // access the user in this route
      next()
    }
  })(request, response)
}

export default authMiddleware
