import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import User from "../entities/user";
import AppDataSource from "../config/dbConnection";
import { UpdateUserDto, UserDto } from "../models/dto";
import { UserRelations, UserSearchParams } from "../models/user.model";
import { BlobOptions } from "buffer";

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
  async findUser(options:FindOneOptions<User>) {
    const result = await this.repository.findOne(options);
    return result;
  }
  async findManyUsers(options:FindManyOptions<User>) {
    const result = await this.repository.find(options);
    return result;
  }
  async updateUser(user:User, updates:UpdateUserDto) {
    this.repository.merge(user, updates);
    const result = await this.repository.save(user);
    return result;
  }
  async saveUser(user:User) {
    return await this.repository.save(user);
  }
};

export default new UserService();