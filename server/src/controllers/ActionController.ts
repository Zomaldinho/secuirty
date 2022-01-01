import { NextFunction, Response } from "express";
import { AuthRequest } from "../interfaces/IAuthRequest";
import { Action } from "../models/Action";
import { User } from "../models/User";

export class ActionController {
  addAction = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { actionName } = req.body
      await Action.create({ name: actionName })
      return res.status(200).send({ message: 'action is created' })
    } catch (error) {
      next(error)
    }
  }

  addUserAction = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { actionName, userId } = req.body
      const action = await Action.findOne({ where: { name: actionName } })
      const user = await User.findOne({ where: { id: userId } })
      if(!action || !user) throw new Error('please provide correct data')
      await user.addAction(action)
      return res.status(200).send({ message: 'user action is created' })
    } catch (error) {
      next(error)
    }
  }
}