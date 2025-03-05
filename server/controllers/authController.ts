import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../entities/user";
import { standardResponse } from "../utils/constants";
import userService from "../services/userService";
import setCookies from "../utils/setCookies";
import ErrorApi from "../utils/errorApi";

export class AuthController {
  // SIGNUP
  static async signup(req:Request<User>, res:Response){
    try {
      const { name, email, age, password, gender, genderPreference } = req.body;
      if(!name || !email || !age || !gender || !password || !genderPreference) {
        return res.status(400).json(standardResponse(false, 'All fields are required'));
      }
      const isAlreadyExists = await userService.findUser({
        where: {
          email
        }
      });
      if(isAlreadyExists) {
        return res.status(400).json(standardResponse(false, 'User with this email already exists'));
      }
      if(age < 18) { 
        return res.status(400).json(standardResponse(false, 'You must at lest 18 years old'));
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await userService.createUser({
        name, email, age, password: hashedPassword, gender, genderPreference
      });
      setCookies({id: user.id}, res);
      return res.status(201).json(standardResponse(true, 'success', user))
    } catch(error){
      if(error instanceof Error) {
        return res.status(500).json(standardResponse(false, error.message))
      } else {
        return res.status(500).json(standardResponse(false, 'Server error'))
      }
    }
  }
  // LOGIN
  static async login(req:Request<User>, res:Response){
    try {
      const { email, password } = req.body;
      const user = await userService.findUser({where:{
        email
      }});
      if(user){
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
          return res.status(400).json(standardResponse(false, 'Wrong credentials'));
        };
        setCookies({id: user.id}, res);
        return res.status(200).json(standardResponse(true, 'success', user));
      };
      return res.status(400).json(standardResponse(false, 'Wrong credentials'));
    } catch (error) {
      if(error instanceof Error) {
        return res.status(500).json(standardResponse(false, error.message))
      } else {
        return res.status(500).json(standardResponse(false, 'Server error'))
      }
    }
  }
  // LOGOUT
  static async logout(req:Request, res:Response){
    res.clearCookie('jwt');
    return res.status(200).json(standardResponse(true, 'logged out successfully'));
  }
  // CHECK AUTH
  static async checkAuth(req:Request, res:Response, next:NextFunction){
    try {
      if(!req.user) {
        throw ErrorApi.Unauthorized();
      }
      return res.status(200).json(standardResponse(true, 'successfully', req.user));
    } catch (error) {
      next(error);
    }
  }
}