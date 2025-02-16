import { NextFunction, Request, Response } from "express";
import ErrorApi from "../utils/errorApi";
import { standardResponse } from "../utils/constants";

export default class UserController {
  static updateProfile(req:Request, res:Response, next:NextFunction){
    try {
      const fileName = req.file?.path;
      if(!fileName) {
        throw ErrorApi.BadRequest('File is not attached')
      }
      return res.status(200).json(standardResponse(true, fileName))
    } catch (error) {
      next(error);
    }
  }
}