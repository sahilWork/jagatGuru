import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignInImage from '../../components/svgIcons/SigninImage';
import { loginUserProps } from '../../utils/types';
import apiCall from '../../apiCalls';
import Logo from '../../common/logo';

interface SignInProps {
  onLogin: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // To show error message

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Create the userData object
      const userData: loginUserProps = { email, password };

      // Make the API call using loginUser
      const response = await apiCall.loginUser(userData);

      if (response) {
        // Store response data in sessionStorage
        sessionStorage.setItem('user', JSON.stringify(response));
        onLogin(); // Call the onLogin function to handle successful login
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.log('Login error', error);
      setErrorMessage('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <>
      <div className="rounded-sm border min-h-screen border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <Logo
                  style={{
                    backgroundColor: '#000',
                    opacity: 0.2,
                    // Add other style properties here
                  }}
                />
              </Link>
              <p className="2xl:px-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                suspendisse.
              </p>
              <span className="mt-10 inline-block">
                <SignInImage />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to Jagat Guru Admin
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="6+ Characters, 1 Capital letter"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      required
                    />
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-red-500 mb-4">{errorMessage}</p>
                )}

                <div className="mb-5">
                  <input
                    type="submit"
                    value="Sign In"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
