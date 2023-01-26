import {
  Request,
  Response,
  NextFunction,
  Router,
  RequestHandler,
} from "express";
import validationMiddleware from "../middleware/validation.middleware";
import CreateUserDto from "../user/user.dto"; // dtos
import LogInDto from "./logIn.dto";
import IController from "../interface/controller.interface"; // interfaces
import AuthenticationService from "./authentication.service";
import asyncHandler from "express-async-handler";
import passport from "passport";
import HttpException from "../exception/HttpException";
import WrongCredentialsException from "../exception/WrongCredentialsException";

class AuthenticationController implements IController {
  public path = "/";
  public path_register = `${this.path}/register`;
  public path_login = `${this.path}/login`;
  public path_logout = `${this.path}/logout`;
  public router = Router();
  public authenticationService = new AuthenticationService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      this.path_register,
      validationMiddleware(CreateUserDto),
      this.registration
    );
    this.router.post(
      this.path_login,
      validationMiddleware(LogInDto),
      this.loggingIn
    );
    this.router.get(this.path_logout, this.loggingOut);
  }

  // @desc Register a user
  // @route POST /register
  // @access public
  private registration = asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      const userData: CreateUserDto = request.body;
      try {
        const { user, token } = await this.authenticationService.register(
          userData
        );
        request.login(user, { session: false }, (err) => {
          if (err) {
            next(new HttpException(400, "Error while logging in"));
          } else {
            response.json({ user, token });
          }
        });
      } catch (error) {
        next(error);
      }
    }
  );

  // @desc Login a user
  // @route POST /login
  // @access public
  private loggingIn: RequestHandler = (request, response, next) => {
    passport.authenticate("local", { session: false }, (err, user) => {
      if (err || !user) {
        next(new WrongCredentialsException());
      } else {
        request.login(user, { session: false }, (err) => {
          if (err) {
            next(new WrongCredentialsException());
          } else {
            const token = this.authenticationService.createToken(user);
            user.password = undefined; // clearing user pw from response
            response.json({ user, token });
          }
        });
      }
    })(request, response);
  };

  // @desc Logout a user
  // @route GET /logout
  // @access public
  private loggingOut: RequestHandler = (request, response, next) => {
    request.logout(function(err) {
      if (err) {
        next(new HttpException(400, "Error while logging out"));
      } else {
        response.status(200).json({
          message: "Logout successful",
        });
      }
    });
  };
}

export default AuthenticationController;
