import express from 'express';
import dotenv from 'dotenv';

//Routes
import authRoute from './routes/authRoute';
import userRoute from './routes/userRoute';
import matchRoute from './routes/matchRoute';
import messageRoute from './routes/messageRoute';

dotenv.config();
const app = express();
const port = process.env.PORT  || 5000;

//Middleware
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/matches', matchRoute);
app.use('/api/messages', messageRoute);

app.listen(5000, () => console.log(`Server is running on port ${port}`));