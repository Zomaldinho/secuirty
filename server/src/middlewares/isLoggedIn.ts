import { NextFunction, Request, Response } from "express";
import { TokenHelper } from "../helpers/TokenHelper";
import { AuthRequest } from "../interfaces/IAuthRequest";
import { User } from "../models/User";

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string = "";
    if (req.headers && req.headers.Authorization) {
      token = (req.headers.Authorization as string).split(" ")[1];
    } else {
      return res.status(401).send({ message: 'not authenticated' })
    }
    const userId = await new TokenHelper().verifyToken(token, 'access')
    const user = await User.findOne({ where: { id: +userId } })
    if(!user) return res.status(404).send('user is not found');
    (req as AuthRequest).user = user
    next()
  } catch (error) {
    return res.status(400).send('something went wrong. please try again');
  }
}