import IUser from '../user/user.interface'
import { Express } from "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
      user?: IUser
      filter?:boolean
  }
}
