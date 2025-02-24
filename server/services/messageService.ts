import { FindManyOptions, Repository } from "typeorm";
import Message from "../entities/message";
import { NextFunction, Request, Response } from "express";
import AppDataSource from "../config/dbConnection";
import { MessageDto } from "../models/message/message.dto";

class MessageService {
  private repository: Repository<Message>
  constructor() {
    this.repository = AppDataSource.getRepository(Message);
  }
  async createMessage(msg:MessageDto) {
    const message = await this.repository.create(msg);
    return await this.repository.save(message);
  }
  async findManyMessages(options:FindManyOptions<Message>) {
    const result = await this.repository.find(options);
    return result;
  }
}
export default new MessageService();