import axios from 'axios';
export const baseApiUrl = import.meta.env.DEV ? 'http://localhost:5000/' : '/'; 
const axiosInstance = axios.create({
  baseURL: `${baseApiUrl}api`,
  withCredentials: true
});
export default axiosInstance;