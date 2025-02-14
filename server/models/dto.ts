import { Gender } from "./user.model"

export class UserDto {
  name: string
  email: string
  age: number
  password:string 
  gender: Gender
  genderPreference: Gender
}