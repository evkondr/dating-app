import { User } from './user';

export interface IMessage {
  id: string
  sender: User
  receiver: User
  content: string
  createdAt: Date;
} 