import { NextFunction, Request, Response } from "express";

export default class MatchController {
  static async swipeRight(req:Request, res:Response, next:NextFunction){}
  static async swipeLeft(req:Request, res:Response, next:NextFunction){}
  static async getMatches(req:Request, res:Response, next:NextFunction){}
  static async userProfiles(req:Request, res:Response, next:NextFunction){}
};