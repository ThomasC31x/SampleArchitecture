import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from '../objects/class';
import { repositories } from '../models/database';
import { User } from '../models/user.model';
import * as Sequelize from 'sequelize';

const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  const Users = repositories.User

  try {
    const Authorization = req.header('Authorization').split('Bearer ')[1] || null;

    if (Authorization) {
      const secretKey = process.env.TOKEN_SECRET as string;
      const verificationResponse = jwt.verify(Authorization, secretKey);
      const userId = verificationResponse.id;
      const findUser = await Users.findByPk(userId);

      if (findUser) {
        req.user = findUser;
        updateLastConnection(Users, findUser)
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

const updateLastConnection = (Users: typeof User, findUser: User) => {
  Users.update({lastConnection: Sequelize.NOW}, {where: {id: findUser.id}})
}

export default authMiddleware;
