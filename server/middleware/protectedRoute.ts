import { NextFunction, Request, Response } from "express";
import ErrorApi from "../utils/errorApi";
import jwt from "jsonwebtoken";
import userService from "../services/userService";

const protectedRoute = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const token = req.cookies['jwt'];
    if(!token) {
      throw ErrorApi.Unauthorized()
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {id:string};
    if(!decoded){
      throw ErrorApi.Unauthorized()
    }
    const user = await userService.findUser({where: {
      id: decoded.id
    }})
    if(!user) {
      throw ErrorApi.Unauthorized()
    }
    req.user = user;
    next()
  } catch (error) {
    next(error)
  }
}
export default protectedRoute;