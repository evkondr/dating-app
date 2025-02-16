import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

//Routes
import authRoute from './routes/authRoute';
import userRoute from './routes/userRoute';
import matchRoute from './routes/matchRoute';
import messageRoute from './routes/messageRoute';
import AppDataSource from './config/dbConnection';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middleware/errorMiddleware';
import User from './entities/user';

dotenv.config();
const app = express();
const port = process.env.PORT  || 5000;

//Middleware
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/matches', matchRoute);
app.use('/api/messages', messageRoute);
//error middleware
app.use(errorMiddleware);
app.listen(5000, () => {
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