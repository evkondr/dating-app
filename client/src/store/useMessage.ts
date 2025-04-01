import { create } from 'zustand';
import { User } from '../models/user';
import { AxiosResponse, isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import axiosInstance from '../components/lib/axios';
import { getSocket } from '../socket/socket.client';
import { IMessage } from '../models/message';

interface IMessageStore {
  messages: IMessage[]
  loading: boolean
  sendMessage: () => void
  getConversation: (userId:string) => Promise<void>
  subscribeToMessages: () => void
  unsubscribeFromMessages: () => void
}
const useMessageStore = create<IMessageStore>((set) => ({
  messages: [],
  loading: false,
  async sendMessage() {
    try {
      set({ loading: true });
      const response = await axiosInstance.post('/messages/string');

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
