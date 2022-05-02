import { Router } from 'express';
import authController from '../controllers/auth.controller';
import { Routes } from '../objects/interfaces';
import authMiddleware from '../middleware/auth.middleware';

class AuthRoute implements Routes {
  public path = '/user/';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, authController.signUp);
    this.router.post(`${this.path}login`, authController.logIn);
    this.router.post(`${this.path}forgot-password`, authController.forgotPassword);
    this.router.get(`${this.path}reset-password`, authController.resetPassword);
  }
}

export default AuthRoute;
