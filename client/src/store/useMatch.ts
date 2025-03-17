import { create } from 'zustand';
import { User } from '../models/user';
import { AxiosResponse, isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import axiosInstance from '../components/lib/axios';

interface IMatchesStore {
  matches: User[]
  profiles: User[]
  loadingMatches: boolean,
  loadingProfiles: boolean,
  getMatches: () => Promise<void>
  getProfiles: () => Promise<void>
}

const useMatchStore = create<IMatchesStore>((set) => ({
  matches: [],
  profiles: [],
  loadingMatches: false,
  loadingProfiles: false,
  getMatches: async () => {
    try {
      set({loadingMatches: true});
      const response:AxiosResponse<{payload: User[]}> = await axiosInstance.get('/matches');
      set({ matches: response.data.payload });
    } catch (error) {
      if(isAxiosError(error)) {
        toast.error(error.response?.data.message || 'something went wrong');
      } else {
        toast.error('something went wrong');
      }
    } finally {
      set({loadingMatches: false});
    }
  },
  getProfiles: async () => {
    try {
      set({loadingProfiles: true});
      const response:AxiosResponse<{payload: User[]}> = await axiosInstance.get('/matches/user-profiles');
      set({ profiles: response.data.payload});
    } catch (error) {
      if(isAxiosError(error)) {
        toast.error(error.response?.data.message || 'something went wrong');
      } else {
        toast.error('something went wrong');
      }
      set({ profiles: []});
    } finally {
      set({loadingProfiles: false});
    }
  },
})
);

export default useMatchStore;
