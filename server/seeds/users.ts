import User from "../entities/user";
import bcrypt from "bcryptjs";
import { Gender } from "../models/user/user.model";
type SeedUser = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'dislikes' | 'matches' | 'sentMessages' | 'receivedMessages'>
export const seedUsers: SeedUser[] = [
  {
    name: "James",
    email: "james@mail.com",
    password: bcrypt.hashSync('Qwerty123', 10),
    age: 18,
    gender: Gender.male,
    genderPreference: Gender.female,
    bio: "",
    image: "",
  },
  {
    name: "Mary",
    email: "mary@mail.com",
    password: bcrypt.hashSync('Qwerty123', 10),
    age: 19,
    gender: Gender.female,
    genderPreference: Gender.male,
    bio: "I like animals",
    image: "",
  }
]