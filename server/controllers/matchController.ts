import { NextFunction, Request, Response } from "express";
import userService from "../services/userService";
import { standardResponse } from "../utils/constants";

export default class MatchController {
  static async swipeRight(req:Request, res:Response, next:NextFunction){}
  static async swipeLeft(req:Request, res:Response, next:NextFunction){}
  static async getMatches(req:Request, res:Response, next:NextFunction){
    try {
      const currentUserId = req.user.id;
      const user = await userService.findUser({id: currentUserId}, {matches: true})
      return res.status(200).json(standardResponse(true, 'Matches received', user?.matches))
    } catch (error) {
      next(error);
    }
  }
  static async userProfiles(req:Request, res:Response, next:NextFunction){}
};