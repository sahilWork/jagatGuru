import api from '../../../src/axios.interceptor'
import { loginUserProps } from '../../utils/types';

export const loginUser = async (userData:loginUserProps) => {
    const apiEndpoint = '/login';
    try {
    
      if (userData) {
        const response = await api.post(apiEndpoint, userData);
        console.log('response.data', response.data);
        if (response?.data?.success) {
          return response.data.data;
        } else {
          throw new Error(response?.data?.message);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };