import jwt from 'jsonwebtoken';
export const signToken = (payload:string) => {
  return jwt.sign({id:payload}, process.env.JWT_SECRET as string, {expiresIn: '1d'})
} 