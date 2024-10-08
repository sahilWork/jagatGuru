import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import { getUserData } from './utils/utils';
// import store from './store'; // Ensure you import your redux store correctly
// import { logout } from './actions/authActions'; // Import your logout action

// const PRODUCTION = false;
// const baseUrl = Config.DEVELOPMENT==='false'?Config.API_URL:Config.DEV_URL;
const baseUrl = 'https://c93c-2405-201-5005-6868-e9dc-3f25-3c23-4dce.ngrok-free.app/api';
console.log(baseUrl, '===>baseUrl');

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use(
  async config => {
    const userData = await getUserData();
    // Add the token to the Authorization header
    if (userData) {
      const parsedToken = userData?.token;
      config.headers['Authorization'] = `Bearer `+parsedToken;
      config.headers['ngrok-skip-browser-warning'] = 'skip-browser-warning';
    }
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => {
    // console.log('response===>', response?.data);
    return response;
  },
  error => {
    console.log('error.response.data.message RESPERROR===>', error?.response?.data);
    // console.log('error.response.data.message RESPERROR===>', error?.response?.data?.message);
    handleError(error);
    return error;
  },
);

const handleError = (error: any) => {
  console.log('handleError', error.response.data);
  if (error.response) {
    switch (error.response.status) {
      case 400:
        toast.error(
          error.response.data.message ||
          'Bad Request. Please check your input data.'
        );
        break;
      case 401:
        toast.error(
          error.response.data.message ||
          'Unauthorized user! Please Login Again.'
        );
        // store.dispatch(logout()); // Trigger logout action
        break;
      case 403:
        toast.error(
          error.response.data.message || 'Invalid Credentials.'
        );
        break;
      case 404:
        toast.error(
          error.response.data.message || 'Not found.'
        );
        break;
      case 410:
        toast.error(
          error.response.data.message ||
          'Resource No Longer Available.'
        );
        break;
      case 500:
        toast.error('Internal Server Error.');
        break;
      default:
        toast.error('Something Went Wrong.');
        break;
    }
  } else {
    toast.error('Network Request Failed! Try again later.');
    throw new Error('Network Request Failed! Try again later.');
  }
};

export default api;
