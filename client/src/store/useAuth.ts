import { create } from 'zustand';
import axiosInstance from '../components/lib/axios';
import { LoginData, SignupData } from '../models/auth';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { User } from '../models/user';

interface IAuthStore {
  authUser: null | User,
  checkingAuth: boolean,
  loading: boolean,
  checkAuth: () => Promise<void>,
  signup: (data:SignupData) => Promise<void>,
  login: (data:LoginData) => Promise<void>,
  logout: () => Promise<void>,
}

const useAuthStore = create<IAuthStore>((set) => ({
  authUser: null,
  checkingAuth: true,
  loading: false,
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get('/auth/check');
      set({authUser: response.data.payload, checkingAuth: false});
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
      set({loading: true});
      const response = await axiosInstance.post<{payload:User}>('/auth/signup', data);
      set({
        authUser: response.data.payload,
        loading: false
      });
    } catch (error) {
      if(isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error('something went wrong');
      }
    } finally {
      set({loading: false});
    }
  },
  login: async (data:LoginData) => {
    try {
      set({loading: true});
      const response = await axiosInstance.post('/auth/login', data);
      toast.success('Glad to see you again');
      set({
        authUser: response.data.payload,
        loading: false
      });
    } catch (error) {
      if(isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error('something went wrong');
      }
    } finally {
      set({loading: false});
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({authUser: null});
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