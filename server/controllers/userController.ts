import { NextFunction, Request, Response } from "express";
import ErrorApi from "../utils/errorApi";
import { standardResponse } from "../utils/constants";
import { UpdateUserDto } from "../models/user/dto";
import userService from "../services/userService";
import deleteFile from "../utils/deleteFile";

export default class UserController {
  static async updateProfile(req:Request, res:Response, next:NextFunction){
    try {
      const userId = req.params.userId;
      const updates = req.body as UpdateUserDto;
      const user = await userService.findUser({
        where: {
          id:userId
        }
      });
      if(!user) {
        throw ErrorApi.NotFound(`User with id - ${userId} not found`);
      };
      if(req.file?.path) {
        if(user.image){
          deleteFile(user.image);
        }
        updates.image = req.file?.path;
      };
      const result = await userService.updateUser(user, updates);
      return res.status(200).json(standardResponse(true, 'User update successfully', result))
    } catch (error) {
      next(error);
    }
  }
}