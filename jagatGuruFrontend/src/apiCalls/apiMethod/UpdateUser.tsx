import { toast } from "react-toastify";
import api from "../../axios.interceptor";
import { AgentDataType } from "../../utils/types";

export const updateUser = async (data: AgentDataType) => {
  const apiEndpoint = `/editUser`;
  
  try {
    if (data) {
      console.log(data, '======= Update Data');
      const response = await api.post(apiEndpoint, data); // Use PUT method for updating
      
      console.log('response.data', response.data);
      
      if (response?.data?.success) {
        toast.success(response.data.data);
        return response.data;
      } else {
        throw new Error(response?.data?.message);
      }
    }
  } catch (error) {
    console.log('error', error);
    toast.error('Error updating user');
  }
};
