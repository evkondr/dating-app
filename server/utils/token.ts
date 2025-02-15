import jwt from 'jsonwebtoken';
import { TokenPayload } from '../models/user.model';

export const signToken = <T>(payload:TokenPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: '1d'})
} 