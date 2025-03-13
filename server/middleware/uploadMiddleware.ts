import multer from "multer";
import fileStorage from "../config/fileStorage";
import fileFilter from "../config/fileFilter";

const uploadMiddleware = multer({
  storage: fileStorage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Ограничение в 5MB
  fileFilter
});
export default uploadMiddleware;