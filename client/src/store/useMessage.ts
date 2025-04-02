import { create } from 'zustand';
import { AxiosResponse, isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import axiosInstance from '../components/lib/axios';
import { getSocket } from '../socket/socket.client';
import { IMessage } from '../models/message';
import useAuthStore from './useAuth';

interface IMessageStore {
  messages: IMessage[]
  loading: boolean
  sendMessage: (receiverId: string, content: string) => void
  getConversation: (userId:string) => Promise<void>
  subscribeToMessages: () => void
  unsubscribeFromMessages: () => void
}
const useMessageStore = create<IMessageStore>((set) => ({
  messages: [],
  loading: false,
  async sendMessage(receiverId: string, content: string) {
    try {
      
      const { data: { payload } } = await axiosInstance.post<{ payload: IMessage }>('/messages/string', {
        receiverId,
        content
      });
      set((state) => ({
        messages: [...state.messages, {
          id: payload.id,
          sender: useAuthStore.getState().authUser?.id as string,
          receiver: receiverId,
          content: payload.content,
          createdAt: payload.createdAt
        }]
      }));
    } catch (error) {
      if(isAxiosError(error)) {
        toast.error(error.response?.data.message || 'something went wrong');
      } else {
        toast.error('something went wrong');
      }
    } 
  },
  async getConversation(userId:string) {
    try {
      const response:AxiosResponse<{ payload: IMessage[]}> = await axiosInstance.get(`/messages/conversation/${userId}`);
      set({messages: response.data.payload});
    } catch (error) {
      if(isAxiosError(error)) {
        toast.error(error.response?.data.message || 'something went wrong');
      } else {
        toast.error('something went wrong');
      }
    } finally {
      set({ loading: false});
    }
  },
  subscribeToMessages: () => {
    const socket = getSocket();
    socket.on('newMessage', ({ message }:{message: IMessage}) => {
      set((state) => ({ messages: [...state.messages, message]}));
    });
  },
  unsubscribeFromMessages: () => {
    const socket = getSocket();
    socket.off();
  }
}));

export default useMessageStore;
