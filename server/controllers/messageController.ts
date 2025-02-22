import { NextFunction, Request, Response } from "express";
import { SendMessageDto } from "../models/message/message.dto";
import messageService from "../services/messageService";
import userService from "../services/userService";
import ErrorApi from "../utils/errorApi";
import { standardResponse } from "../utils/constants";

export default class MessageController {
  static async sendMessage(req:Request, res:Response, next:NextFunction) {
    try {
      const { content, receiverId }:SendMessageDto = req.body;
      const sender = await userService.findUser({
        where: {
          id: req.user.id
        }
      });
      const receiver = await userService.findUser({
        where: {
          id: receiverId
        }
      });
      if(!receiver || !sender) {
        throw ErrorApi.NotFound('User not found')
      }
      const result = await messageService.createMessage({
        sender,
        receiver,
        content
      })
      res.status(201).json(standardResponse(true, 'Message created', result));
    } catch (error) {
      next(error);
    }
  }
  static getConversation(req:Request, res:Response, next:NextFunction) {

  }
} 