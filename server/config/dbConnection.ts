import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import User from "../entities/user";
import Message from "../entities/message";
dotenv.config();

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Message],
    synchronize: true
});
export default AppDataSource;