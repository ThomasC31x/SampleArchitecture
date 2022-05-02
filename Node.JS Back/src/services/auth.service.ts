import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import DB, { repositories } from '../models/database';
import { HttpException } from '../objects/class';
import { User, UserExport } from '../models/user.model';
import { isEmpty } from './utils';
import nodemailer from 'nodemailer';
import { mailConfig } from '../config/mail.config';

class AuthService {
  public userDB = repositories.User;

  public async signup(userData: any): Promise<UserExport> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: any = await this.userDB.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: any = await this.userDB.create({ ...userData, password: hashedPassword });

    const token = this.createToken(createUserData?.dataValues)
    const newUser = new UserExport(createUserData?.dataValues, token)
    
    return newUser;
  }

  public async login(userData: any): Promise<UserExport> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: any = await this.userDB.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const token = this.createToken(findUser);
    const userRetrieved = new UserExport(findUser?.dataValues, token)

    return userRetrieved;
  }

  public createToken(user: User, expiresIn?: string) {
    const dataStoredInToken = { id: user.id };
    const secretKey = process.env.TOKEN_SECRET

    return jwt.sign(dataStoredInToken, secretKey, { expiresIn: expiresIn || '24h' });
  }

  /**
   * @method getTokenPassword
   * @param {User} user
   * @returns {null}
   * @description Set new token password to an user that forget his password
   */
  public async getTokenPassword(email: string) {
    // Retrieve email from DB
    // IF EXIST :
    // Send email with jwt contenant : email + timestamp d'1h
    // IF NOT EXIST :
    // trhow error
    const findUser = await this.userDB.findOne({ where: { email } }) as User;
    if (!findUser) throw new HttpException(409, `You're email ${email} not found`);

    return this.createToken(findUser, '120s')
  }

  /**
   * @method resetPassword
   * @param {User} user
   * @returns {null}
   * @description Reset password user after he clicked on link from his email
   */
  public async resetPassword(jwtData: string) {
    // jwt decode le token 
    // SI OK => Retrieve l'email en DB 
    // SI OK => Send le nouveau mot de passe randomisé + stockage en DB
    const jwtDecode = jwt.decode(jwtData)
    const userId = jwtDecode?.id
    const findUser = await this.userDB.findOne({ where: { id: userId } }) as User;
    if (!findUser) throw new HttpException(409, `User ID not found`);

    const newPassword = (Math.random() + 1).toString(36).substring(5)
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    await this.userDB.update({ password: newPasswordHash }, { where: { id : findUser.id } })

    return newPassword
  }

  public async sendMail(to: string, token: string) {

    let transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: true,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.pass,
      },
    });
  
    // send mail with defined transport object
    await transporter.sendMail({
      from: mailConfig.sender, // sender address
      to,
      subject: "subject", // Subject line
      html: `email`, // html body
    });
  
  }

}

export default AuthService;
