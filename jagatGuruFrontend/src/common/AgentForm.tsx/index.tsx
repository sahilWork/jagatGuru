import { useState, useEffect } from 'react';
import { AgentDataType, createUserProps, role } from '../../utils/types';
import { getUserData } from '../../utils/utils';
import { FaRegEye } from 'react-icons/fa6';
import { FaRegEyeSlash } from 'react-icons/fa6';
import apiCall from '../../apiCalls';
import { useNavigate } from 'react-router-dom';

interface AgentFormProps {
  agentData?: AgentDataType; // This prop will be used to edit existing agent data
  // onSubmit: (formData: AgentDataType | createUserProps) => void;
}

const AgentForm: React.FC<AgentFormProps> = ({ agentData }) => {
  const [formData, setFormData] = useState<AgentDataType>({
    id: '',
    name: '',
    phone: '',
    pincode: '',
    email: '',
    password: '',
    role: 'Agent' as role,
  });
  console.log(formData, 'formData');

  const [roleSelected, setRoleSelected] = useState<role>('Agent');
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [userData, setUserData] = useState<AgentDataType>();
  const [showPassword, setShowPassword] = useState<boolean>(false); // Toggle password visibility
  const navigate = useNavigate();

  // Populate the form if agentData is provided (for edit mode)
  useEffect(() => {
    if (agentData && Array.isArray(agentData) && agentData.length > 0) {
      setFormData(agentData[0]);
      setRoleSelected(agentData[0].role as role);
      setConfirmPassword(agentData[0].password);
    } else if (agentData && !Array.isArray(agentData)) {
      setFormData(agentData);
      setRoleSelected(agentData.role as role);
      setConfirmPassword(agentData?.password || '');
    }
    userDetails();
  }, [agentData]);

  // Fetch user data
  const userDetails = async () => {
    const user = await getUserData();
    setUserData(user);
  };

    // Reset form to initial state
    const resetForm = () => {
      setFormData({
        id: '',
        name: '',
        phone: '',
        pincode: '',
        email: '',
        password: '',
        role: 'Agent',
      });
      setConfirmPassword('');
      setRoleSelected('Agent');
    };

  // Handle form submit
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.password !== confirmPassword) {
      setShowPasswordError(true);
      return;
    }
    setShowPasswordError(false);
    try {
      if(agentData){

        const response = await apiCall.updateUser(formData as AgentDataType); // Update the agent data
        console.log(response, 'response');
        if(response){
          navigate(-1)
        }
    }else{
      const response = await apiCall.addUser(formData as createUserProps);
      console.log(response, 'response');
      if(response){
        resetForm()
      }
    }

      // Handle successful submission or reset the form
    } catch (error) {
      console.error('Error adding/updating user:', error);
    }
    // onSubmit(formData);
  };


  // Handle input changes and detect form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShowPasswordError(false);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle role change
  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedRole = e.target.value as role;

    setFormData({
      ...formData,
      role: selectedRole,
      pincode: selectedRole === 'CRM Agent' ? '' : formData.pincode,
    });
    setRoleSelected(selectedRole);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Conditionally render the form based on user role
  if (userData) {
    return (
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg dark:bg-boxdark">
        <h2 className="mb-6 text-center text-2xl font-semibold text-black dark:text-white">
          {agentData ? 'Edit Agent' : 'Add Agent'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black dark:text-white dark:focus:border-primary"
              required
            />
          </div>
          {!agentData&&
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Role
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="CRM Agent"
                onChange={handleRoleChange}
                checked={formData.role === 'CRM Agent'}
              />{' '}
              CRM Agent
            </label>
            <label className="ml-4">
              <input
                type="radio"
                name="role"
                value="Agent"
                onChange={handleRoleChange}
                checked={formData.role === 'Agent'}
              />{' '}
              Agent
            </label>
          </div>
          }

          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black dark:text-white dark:focus:border-primary"
              required
              disabled={agentData && userData.role !== 'Super Admin'} // Only disable if in edit mode and user role isn't Super Admin
            />
          </div>
          {userData.role === 'Super Admin' && (
            <div className="mb-4 relative">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black dark:text-white dark:focus:border-primary"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-14 text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}{' '}
              </button>
            </div>
          )}
          {userData.role === 'Super Admin' && (
            <div className="mb-4 relative">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => {
                  setShowPasswordError(false);
                  setConfirmPassword(e.target.value);
                }}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black dark:text-white dark:focus:border-primary"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-14 text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
              {showPasswordError && (
                <p className="text-red-500 mt-1">Passwords do not match!</p>
              )}
            </div>
          )}
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black dark:text-white dark:focus:border-primary"
              required
            />
          </div>
          {roleSelected === 'Agent' && (
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                placeholder="Enter pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black dark:text-white dark:focus:border-primary"
                required
              />
            </div>
          )}
          {agentData ? (
            <button
              type="submit"
              // disabled={!isFormValid} // Disable the button based on form validity
              className={`mt-4 w-full rounded-lg py-4 text-white ${'bg-primary hover:bg-primary-dark'} transition-all duration-200 ease-in-out`}
            >
              Update Agent
            </button>
          ) : (
            <button
              type="submit"
              //   disabled={!isFormValid} // Disable the button based on form validity
              className={`mt-4 w-full rounded-lg py-4 text-white ${'bg-primary hover:bg-primary-dark'} transition-all duration-200 ease-in-out`}
            >
              Add Agent
            </button>
          )}
        </form>
      </div>
    );
  }

  return <div>Loading...</div>; // Return loading state if userData is not available
};

export default AgentForm;
