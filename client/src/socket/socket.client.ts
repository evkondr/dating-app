import io, { Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.DEV ? 'http://localhost:5000/' : '/'; 

let socket:Socket | null = null;

export const initSocket = (userId:string) => {
  if(socket) {
    socket.disconnect();
  }
  socket = io(SOCKET_URL, {
    auth: { userId }
  });
};

export const getSocket = () => {
  if(!socket) {
    throw new Error('Socket not init');
  }
  return socket;
};

export const disconnectSocket = () => {
  if(socket) {
    socket.disconnect();
    socket = null;
  }
};