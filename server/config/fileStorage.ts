import { Request } from "express";
import multer from "multer";
import path from 'path';
import fs from 'fs';

const fileStorage = multer.diskStorage({
  destination: (
    req:Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    const userId = req.user.id;
    const userFolder = path.join(__dirname, '../', 'uploads', userId);
    if(!fs.existsSync(userFolder)){
      fs.mkdirSync(userFolder, { recursive: true })
    };
    cb(null, userFolder);
  },
  filename: (
    req:Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
});
export default fileStorage;