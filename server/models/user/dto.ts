import Message from "../../entities/message"
import { Gender } from "./user.model"

export class UserDto {
  name: string
  email: string
  age: number
  password:string 
  gender: Gender
  genderPreference: Gender
}
export class UpdateUserDto extends UserDto {
  image: string
  bio: string
}