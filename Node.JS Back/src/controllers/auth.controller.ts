import { NextFunction, Request, Response } from 'express';
// import { CreateUserDto } from '@dtos/users.dto';
import { User, UserExport } from '../models/user.model';
// import { RequestWithUser } from '@interfaces/auth.interface';
import AuthService from '../services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: any = req.body;
      const signUpUserData: UserExport = await this.authService.signup(userData);

      res.status(201).json({ ...signUpUserData });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: any = req.body;
      const findUser: UserExport = await this.authService.login(userData);

      res.status(200).json({ ...findUser });
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userEmail: any = req.body.email;
      const jwt = await this.authService.getTokenPassword(userEmail);
      this.authService.sendMail(userEmail, jwt)

      res.status(200).end();
    } catch (error) {
      next(error);
    }
  };

  public resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jwt: any = req.query.token;
      const newPassword = await this.authService.resetPassword(jwt);

      res.setHeader('Content-type','text/html')
      res.write(`<h1>Your new password is : ${newPassword}</h1>`);
      res.end();
    } catch (error) {
      next(error);
    }
  };
}

const authController = new AuthController();
export default authController;

// TODO : ADD ATTRIBUTE LASTCONNEXION