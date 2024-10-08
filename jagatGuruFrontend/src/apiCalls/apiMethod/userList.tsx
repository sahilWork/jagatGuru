import api from '../../axios.interceptor';
import { role } from '../../utils/types';

export const getuserList = async (route: role) => {
    console.log(route,'route');
    
  const apiEndpoint = `/getUser/${route}`;
  try {
    if (route) {
      const response = await api.get(apiEndpoint);
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
