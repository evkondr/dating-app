import { Repository } from "typeorm";
import Message from "../entities/message";

export default class MessageService {
  private repository: Repository<Message>
} 