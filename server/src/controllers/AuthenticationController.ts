import { Response, Request, NextFunction } from "express";
import bcrypt from 'bcryptjs' 
import { User } from "../models/User";
import { ITokenHelper } from "../interfaces/ITokenHelper";

export class AuthenticationController {
  tokenHelper: ITokenHelper
  constructor(tokenHelper: ITokenHelper){
    this.tokenHelper = tokenHelper
  }
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, password, email } = req.body;
      const hashedPass = await bcrypt.hash(password, 12);
      await User.create({ email, name, password: hashedPass });
      res.status(200).send({ message: 'user is registered. please login' })
    } catch (error) {
      next(error)
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, email } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error('wrong credentials');
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) throw new Error('wrong credentials');
      const accessToken = await this.tokenHelper.signToken(user.id, 'access');
      const refreshToken = await this.tokenHelper.signToken(user.id, 'refresh');
      return res.status(200).send({ accessToken, refreshToken });
    } catch (error) {
      next(error)
    }
  }

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body
      const userId = await this.tokenHelper.verifyToken(refreshToken, 'refresh')
      const accessToken = await this.tokenHelper.signToken(+userId, 'access')
      const refToken = await this.tokenHelper.signToken(+userId, 'refresh')
      res.status(200).send({ accessToken: accessToken, refreshToken: refToken })
    } catch (error) {
      next(error)
    }
  }

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body
      const userId = await this.tokenHelper.verifyToken(refreshToken, 'refresh')
      await this.tokenHelper.removeToken(userId)
      res.status(200).send({ message: 'user is logged out' })
    } catch (error) {
      next(error)
    }
  }
}