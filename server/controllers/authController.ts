import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../entities/user";
import { standardResponse } from "../utils/constats";
import userService from "../services/userService";
import { signToken } from "../utils/token";

export class AuthController {
  static async signup(req:Request<User>, res:Response){
    try {
      const { name, email, age, password, gender, genderPreference } = req.body;
      if(!name || !email || !age || !gender || !password || !genderPreference) {
        return res.status(400).json(standardResponse(false, 'All fields are required'));
      }
      const isAlreadyExists = await userService.findUser(email);
      if(isAlreadyExists) {
        return res.status(400).json(standardResponse(false, 'User with this email already exists'));
      }
      if(age < 18) { 
        return res.status(500).json(standardResponse(false, 'You must at lest 18 years old'));
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await userService.createUser({
        name, email, age, password: hashedPassword, gender, genderPreference
      });

      const token = signToken(user.id);
      res.cookie('jwt', token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV == "production"
      });
      return res.status(201).json({
        success: true,
        user
      })
    } catch(error){
      if(error instanceof Error) {
        return res.status(500).json(standardResponse(false, error.message))
      } else {
        return res.status(500).json(standardResponse(false, 'Server error'))
      }
    }
  }
  static async login(req:Request, res:Response){
    try {
      
    } catch (error) {
      
    }
  }
  static async logout(req:Request, res:Response){}
}