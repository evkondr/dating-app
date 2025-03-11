import { create } from 'zustand';
import axiosInstance from '../components/lib/axios';
import { isAxiosError } from 'axios';
import { UpdateUserDto } from '../models/user';
import toast from 'react-hot-toast';
interface IProfileStore {
  loading: boolean
  updateProfile: (data:UpdateUserDto) => Promise<void>
}  
const useProfileStore = create<IProfileStore>((set) => ({
  loading: false,
  async updateProfile(data:UpdateUserDto) {
    try {
      set({ loading: true});
      await axiosInstance.put('/users/update', data);
      toast.error('Successfully updated');
    } catch (error) {
      if(isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error('something went wrong');
      }
    } finally {
      set({ loading: false});
    }
  },
}) 
);

export default useProfileStore;