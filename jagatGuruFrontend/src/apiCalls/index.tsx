import { addUser } from './apiMethod/addUser';
import { getUserById } from './apiMethod/getUserById';
import { loginUser } from './apiMethod/loginUser';
import { updateUser } from './apiMethod/UpdateUser';
import { getuserList } from './apiMethod/userList';


const apiCall = {
  loginUser,
  addUser,
  getuserList,
  updateUser,
  getUserById
};

export default apiCall;
