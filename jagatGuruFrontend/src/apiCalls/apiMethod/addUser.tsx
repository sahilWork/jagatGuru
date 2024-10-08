import { toast } from "react-toastify";
import api from "../../axios.interceptor";
import { createUserProps } from "../../utils/types";

export const addUser = async(data:createUserProps) =>{
    const apiEndpoint = '/addUser';
    try {
    
      if (data) {
        console.log(data,'=======');
        const response = await api.post(apiEndpoint, data);
        console.log('response.data', response.data);
        if (response?.data?.success) {
          toast.success(
            response.data.message);
          return response.data;
        } else {
          throw new Error(response?.data?.message);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
}