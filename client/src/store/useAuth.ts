import { create } from 'zustand';
import axiosInstance from '../components/lib/axios';

interface IAuthStore {
  authUser: null | string,
  checkingAuth: boolean,
  checkAuth: () => Promise<void>
}

const useAuthStore = create<IAuthStore>((set) => ({
  authUser: null,
  checkingAuth: true,
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get('/auth/me');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
}));

export default useAuthStore;