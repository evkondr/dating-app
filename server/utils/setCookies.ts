import { Response } from "express";
import { TokenPayload } from "../models/user/user.model";
import { signToken } from "./token";

const setCookies = (payload:TokenPayload, res:Response) => {
  const token = signToken(payload);
  res.cookie('jwt', token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV == "production"
  });
};
export default setCookies;