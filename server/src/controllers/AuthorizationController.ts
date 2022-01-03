import { NextFunction, Response } from "express";
import { AuthRequest } from "../interfaces/IAuthRequest";
import { Action } from "../models/Action";

export class AuthorizationController {
  validatePermission = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { actionName } = req.body;
      const action = await Action.findOne({ where: { name: actionName } })
      if(!action) throw new Error("can't find requested action")
      const userActions = await req.user!.getActions()
      const isAuthorized = userActions.some(element => element.name == action.name)
      return res.status(200).send({ isAuthorized })
    } catch (error) {
      next(error)
    }
  }
}