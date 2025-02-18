import { NextFunction, Request, Response } from "express";
import userService from "../services/userService";
import { standardResponse } from "../utils/constants";
import { And, In, Not } from "typeorm";
import ErrorApi from "../utils/errorApi";

export default class MatchController {
  static async swipeRight(req:Request, res:Response, next:NextFunction){}
  static async swipeLeft(req:Request, res:Response, next:NextFunction){}
  static async getMatches(req:Request, res:Response, next:NextFunction){
    try {
      const currentUserId = req.user.id;
      const user = await userService.findUser({
        where:{
          id: currentUserId,
        },
        relations: {
          matches: true
        }
      })
      return res.status(200).json(standardResponse(true, 'Matches received', user?.matches))
    } catch (error) {
      next(error);
    }
  }
  static async userProfiles(req:Request, res:Response, next:NextFunction){
    try {
      const currentUser = await userService.findUser({
        where: {
          id: req.user.id
        },
        relations: {
          likes: true,
          dislikes: true,
          matches: true
        }
      });
      if(!currentUser){
        throw ErrorApi.NotFound('User not found')
      }
      // Profiles to display
      const profiles = await userService.findManyUsers({
        where:{
          // Eliminate who already liked, disliked, exists in matches
          id:And(
            Not(In(currentUser.likes)),
            Not(In(currentUser.dislikes)),
            Not(In(currentUser.matches))
          ),
          gender: currentUser.genderPreference,
          genderPreference: currentUser.gender
        }
      });
      return res.status(200).json(standardResponse(true, 'Profiles received', profiles));
    } catch (error) {
      next(error);
    }
  }
};