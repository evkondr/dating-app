import { Repository } from "typeorm";
import User from "../entities/user";
import AppDataSource from "../config/dbConnection";
import { UserDto } from "../models/dto";

class UserService {
  private repository:Repository<User>;
  constructor(){
    this.repository = AppDataSource.getRepository(User);
  }
  async createUser(userDto:UserDto) {
    const user = await this.repository.create(userDto);
    const result = await this.repository.save(user);
    return result;
  }
};

export default new UserService();