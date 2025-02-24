import { NextFunction, Request, Response } from "express";
import { SendMessageDto } from "../models/message/message.dto";
import messageService from "../services/messageService";
import userService from "../services/userService";
import ErrorApi from "../utils/errorApi";
import { standardResponse } from "../utils/constants";
import { Equal, Or } from "typeorm";

export default class MessageController {
  static async sendMessage(req:Request, res:Response, next:NextFunction) {
    try {
      const { content, receiverId }:SendMessageDto = req.body;
      const receiver = await userService.findUser({
        where: {
          id: receiverId
        }
      });
      if(!receiver) {
        throw ErrorApi.NotFound('User not found')
      }
      const result = await messageService.createMessage({
        sender: req.user,
        receiver,
        content
      })
      res.status(201).json(standardResponse(true, 'Message created', result));
    } catch (error) {
      next(error);
    }
  }
  static async getConversation(req:Request, res:Response, next:NextFunction) {
    try {
      const { userId } = req.params;
      const receiver = await userService.findUser({ where: { id: userId }});
      if(!receiver) {
        throw ErrorApi.NotFound('User not found')
      };
      // TODO: refactor
      const result = await messageService.findManyMessages({
        where: {
          sender: Or(Equal(receiver), Equal(req.user)),
          receiver: Or(Equal(receiver), Equal(req.user))
        },
        order: {
          createdAt: 'ASC'
        }
      });
      res.status(201).json(standardResponse(true, 'Successfully', result));
    } catch (error) {
      next(error);
    }
  }
} 