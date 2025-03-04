import { create } from 'zustand';
import axiosInstance from '../components/lib/axios';
import { SignupData } from '../models/auth';

interface IAuthStore {
  authUser: null | string,
  checkingAuth: boolean,
  loading: boolean,
  checkAuth: () => Promise<void>,
  signup: (data:SignupData) => Promise<void>,
}

const useAuthStore = create<IAuthStore>((set) => ({
  authUser: null,
  checkingAuth: true,
  loading: false,
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get('/auth/me');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  },
  signup: async (data:SignupData) => {}
}));

export default useAuthStore;