import User from "../../entities/user"

export class SendMessageDto {
  content: string
  receiverId: string
}
export class MessageDto {
  sender: User
  receiver: User
  content: string
}