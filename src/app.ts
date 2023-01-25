import express, { Application, json, urlencoded } from 'express'
import helmet from 'helmet'
import compression from 'compression'
import { connect } from 'mongoose'
import cookieParser from 'cookie-parser'
import endpoints from './utils/endpoints'
import IController from './interface/controller.interface'
import errorMiddleware from './middleware/error.middleware'
import passportController from './authentication/passport.controller'
import passport from 'passport'

class App {
  public app: Application
  public port: number

  constructor(controllers: IController[]) {
    this.app = express()
    this.port = endpoints.PORT
    this.connectToDB()
    this.initializeMiddlewares()
    this.initializeControllers(controllers)
    this.initializeErrorHandling() // initialize last
  }

  private initializeMiddlewares() {
    this.app.use(json()) // body parser
    this.app.use(urlencoded({ extended: false }))
    this.app.use(compression()) // compress
    this.app.use(helmet()) // helmet
    this.app.use(cookieParser()) // cookies
    passportController() // setup passport
    this.app.use(passport.initialize());
  }

  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller) => {
      this.app.use(controller.router)
    })
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }

  private async connectToDB() {
    try {
      await connect(
        `mongodb+srv://${endpoints.MONGO_USER}:${endpoints.MONGO_PASSWORD}@${endpoints.MONGO_PATH}`
      )
      console.log(`MongoDB Connected`)
    } catch (err) {
      console.log(`MongoDB error: ${err}`)
      process.exit(1)
    }
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(
        `⚡️[server]: Server is running at https://localhost:${this.port}`
      )
    })
  }
}

export default App
