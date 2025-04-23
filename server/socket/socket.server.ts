import { NextFunction } from "express";
import { IncomingMessage, Server as HttpServer, ServerResponse } from "http";
import { DefaultEventsMap, Server, Socket } from "socket.io";
let io:Server;
const onlineUsers = new Map();

export const initSocket = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true
    }
  });
  
  io.use((socket:Socket, next) => {
    const userId = socket.handshake.auth.userId;
    socket.data.userId = userId;
    next();
  });

  io.on('connection', (socket:Socket) => {
    onlineUsers.set(socket.data.userId, socket.id);
    socket.on('disconnected', () => {
      onlineUsers.delete(socket.data.userId);
    });
  });
};

export const getIO = () => {
  if(!io) {
    throw new Error('Socket.io not initialized')
  };
  return io;
}
export const getOnlineUsers = () => onlineUsers;