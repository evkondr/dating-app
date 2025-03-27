import { create } from 'zustand';
import { User } from '../models/user';
import { AxiosResponse, isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import axiosInstance from '../components/lib/axios';
import { SwipePath } from '../models/match';
import { getSocket } from '../socket/socket.client';

interface IMatchesStore {
  matches: User[]
  profiles: User[]
  loadingMatches: boolean,
  loadingProfiles: boolean,
  getMatches: () => Promise<void>
  getProfiles: () => Promise<void>
  swipeFeedback: string | null
  swipe: (id: string, path: SwipePath) => void
  subscribeToNewMatches: () => void
  unsubscribeFromNewMatches: () => void
}

const useMatchStore = create<IMatchesStore>((set) => ({
  matches: [],
  profiles: [],
  loadingMatches: false,
  loadingProfiles: false,
  swipeFeedback: null,
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
  swipe: async (userId:string, path:SwipePath) => {
    try {
      if(path == 'right') {
        await axiosInstance.post(`/matches/swipe-right/${userId}`);
        set({swipeFeedback: 'liked'});
      } else {
        await axiosInstance.post(`/matches/swipe-left/${userId}`);
        set({swipeFeedback: 'passed'});
      }
    } catch (error) {
      if(isAxiosError(error)) {
        toast.error(error.response?.data.message || 'something went wrong');
      } else {
        toast.error('something went wrong');
      }
    } finally {
      setTimeout(() => set({swipeFeedback: null}), 1500);
    }
  },
  subscribeToNewMatches: () => {
    try {
      const socket = getSocket();
      socket.on('newMatch', (data:User) => {
        set((state) => ({
          matches: [...state.matches, data]
        }));
        toast.success('New match!');
      });
    } catch (error) {
      if(isAxiosError(error)) {
        toast.error(error.response?.data.message || 'something went wrong');
      } else {
        toast.error('something went wrong');
      }
    }
  },
  unsubscribeFromNewMatches: () => {
    try {
      const socket = getSocket();
      socket.off('newMatch');
    } catch (error) {
      if(isAxiosError(error)) {
        toast.error(error.response?.data.message || 'something went wrong');
      } else {
        toast.error('something went wrong');
      }
    }
  }
})
);

export default useMatchStore;
