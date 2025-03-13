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
      const formData = new FormData();
      (Object.keys(data) as Array<keyof UpdateUserDto>).forEach((key) => {
        formData.append(key, String(data[key]));
      });
      if(data.image){
        formData.append('image', data.image);
      }
      await axiosInstance.put('/users/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Successfully updated');
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
}) 
);

export default useProfileStore;