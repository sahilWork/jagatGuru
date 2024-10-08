import api from '../../axios.interceptor';

export const getUserById = async (userId: string) => {
    console.log(userId,'userId');
    
  const apiEndpoint = `/getUserById/${userId}`;
  try {
    if (userId) {
      const response = await api.get(apiEndpoint);
    //   console.log('response.data.data', response.data.data);
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
