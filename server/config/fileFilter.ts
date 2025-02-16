import { Request } from "express";
import { FileFilterCallback } from "multer";

const fileFilter = (req:Request, file: Express.Multer.File, cb:FileFilterCallback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Недопустимый тип файла'));
  }
};
export default fileFilter;