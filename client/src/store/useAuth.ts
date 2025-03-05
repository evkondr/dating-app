import { create } from 'zustand';
import axiosInstance from '../components/lib/axios';
import { SignupData } from '../models/auth';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { User } from '../models/user';

interface IAuthStore {
  authUser: null | User,
  checkingAuth: boolean,
  loading: boolean,
  checkAuth: () => Promise<void>,
  signup: (data:SignupData) => Promise<void>,
}

const useAuthStore = create<IAuthStore>((set) => ({
  authUser: null,
  checkingAuth: false,
  loading: false,
  checkAuth: async () => {
    try {
      set({checkingAuth: true});
      const response = await axiosInstance.get('/auth/check');
      set({authUser: response.data.payload});
    } catch (error) {
      if(isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error('something went wrong');
      }
    } finally {
      set({checkingAuth: false});
    }
  },
  signup: async (data:SignupData) => {
    try {
      const response = await axiosInstance.post('/auth/signup', data);
      set({authUser: response.data.payload});
    } catch (error) {
      if(isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error('something went wrong');
      }
    }
  }
}));

export default useAuthStore;