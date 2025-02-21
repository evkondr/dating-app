import { NextFunction, Request, Response } from "express";
import { SendMessageDto } from "../models/message/message.dto";

export default class MessageController {
  static sendMessage(req:Request, res:Response, next:NextFunction) {
    try {
      const { content, receiverId }:SendMessageDto = req.body;
      
    } catch (error) {
      
    }
  }
  static getConversation(req:Request, res:Response, next:NextFunction) {

  }
} 