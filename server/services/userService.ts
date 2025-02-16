import { Repository } from "typeorm";
import User from "../entities/user";
import AppDataSource from "../config/dbConnection";
import { UpdateUserDto, UserDto } from "../models/dto";
import { UserSearchParams } from "../models/user.model";

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
  async findUser(searchParam: UserSearchParams) {
    const result = await this.repository.findOneBy(searchParam);
    return result;
  }
  async updateUser(user:User, updates:UpdateUserDto) {
    this.repository.merge(user, updates);
    const result = await this.repository.save(user);
    return result;
  }
};

export default new UserService();