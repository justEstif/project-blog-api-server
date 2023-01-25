import { RequestHandler } from 'express'
// import NotOwnerException from '../exception/NotOwnerException'
import passport from 'passport'
import WrongAuthenticationTokenException from '../exception/WrongAuthenticationTokenMissingException'

// Only owner is allowed on this route
const ownerMiddleware: RequestHandler = (request, response, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      next(new WrongAuthenticationTokenException())
    } else {
      if (user.owner) {
        next()
      } else {
        response.status(400).json({
          message: 'Not owner: Route not allowed'
        })
      }
    }
  })(request, response)
}

export default ownerMiddleware

