import { NextFunction, Request, Response } from "express";
import ErrorApi from "../utils/errorApi";
import { standardResponse } from "../utils/constants";
import { UpdateUserDto } from "../models/user/dto";
import userService from "../services/userService";
import deleteFile from "../utils/deleteFile";
import path from "path";

export default class UserController {
  static async updateProfile(req:Request, res:Response, next:NextFunction){
    try {
      const updates = req.body as UpdateUserDto;
      const user = await userService.findUser({
        where: {
          id: req.user.id
        }
      });
      if(!user) {
        throw ErrorApi.NotFound(`User with id - ${req.user.id} not found`);
      };
      if(req.file?.path) {
        if(user.image){
          if(user.image.startsWith('data:image')){
            user.image = ''
          } else {
           //deleteFile(user.image);
          }
          
        }
        updates.image = path.join(user.id, req.file.filename);
      };
      const result = await userService.updateUser(user, updates);
      return res.status(200).json(standardResponse(true, 'User update successfully', result))
    } catch (error) {
      next(error);
    }
  }
}