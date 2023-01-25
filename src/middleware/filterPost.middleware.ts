import { RequestHandler } from 'express'
import passport from 'passport'

const filterPostMiddleware: RequestHandler = (request, response, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      request.body.filter = true
      next()
    } else {
      if (user.owner) {
        request.body.filter = false
        request.body.filter = true
        next()
      } else {
        request.body.filter = true
        next()
      }
    }
  })(request, response)
}

export default filterPostMiddleware
