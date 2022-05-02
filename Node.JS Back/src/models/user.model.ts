import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
}

export class UserExport {
  email: string;
  username: string;
  token: string;

  constructor(u: User, token) {
    this.email = u.email
    this.username = u.username
    this.token = token
  }

}

export class User extends Model implements User {
  id!: number;
  email!: string;
  username!: string;
  password!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return User.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          field: 'id',
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: 'email',
        },
        username: {
          type: DataTypes.STRING(30),
          allowNull: false,
          field: 'username',
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: 'password',
        },
        lastConnection: {
          type: DataTypes.DATE,
          field: 'lastConnection'
        }
      },
      {
        sequelize,
        tableName: 'Users'
      },
    );
  }
}
