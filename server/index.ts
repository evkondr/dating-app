import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { createServer } from "http";

//Routes
import authRoute from './routes/authRoute';
import userRoute from './routes/userRoute';
import matchRoute from './routes/matchRoute';
import messageRoute from './routes/messageRoute';
import AppDataSource from './config/dbConnection';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middleware/errorMiddleware';
import User from './entities/user';
import path from 'path';
import { initSocket } from './socket/socket.server';

dotenv.config();
const app = express();
const port = process.env.PORT  || 5000;
const httpServer = createServer(app);
initSocket(httpServer);
//Middleware
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods:  'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
}));
app.use('/', express.static(path.join(__dirname, 'uploads')))

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/matches', matchRoute);
app.use('/api/messages', messageRoute);
//error middleware
app.use(errorMiddleware);
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  // return index html for none exist route
  app.use('*', (req:Request, res:Response) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'))
  })
}
console.log(process.env.NODE_ENV)
httpServer.listen(5000, () => {
  console.log(`Server is running on port ${port}`);
  AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
  }).catch((err) => {
    console.error("Error during Data Source initialization", err);
  })
});
declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}