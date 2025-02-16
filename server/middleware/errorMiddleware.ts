import { NextFunction, Request, Response } from "express";
import ErrorApi from "../utils/errorApi";
import { standardResponse } from "../utils/constants";

const errorMiddleware = (err:unknown, req:Request, res:Response, next:NextFunction) => {
  if(err instanceof ErrorApi) {
    return res.status(err.status).json(standardResponse(false, err.message));
  }
  if(err instanceof Error) {
    return res.status(500).json(standardResponse(false, err.message));
  }
  return res.status(500).json(standardResponse(false, 'Server error'));
};

export default errorMiddleware;