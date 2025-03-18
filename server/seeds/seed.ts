import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import User from "../entities/user";
import Message from "../entities/message";
import { seedUsers } from "./users";
dotenv.config();

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Message],
    logging: false,
    synchronize: true
});
AppDataSource.initialize().then(async () => {
  console.log("Data Source has been initialized!");
  const userRepo = AppDataSource.getRepository(User);
  const messageRepo = AppDataSource.getRepository(Message);
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.query(`TRUNCATE TABLE "user" CASCADE;`);
  console.log("Database has been cleared!");
  await userRepo.save(seedUsers);
  console.log("Initial data has been seeded!");
  AppDataSource.destroy();
}).catch((e) => {
  console.error("Error during Data Source initialization:", e);
});