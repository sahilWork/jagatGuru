import { useEffect, useState } from 'react';
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,
} from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
// import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import AddAgent from './pages/AddAgent';
import { ToastContainer } from 'react-toastify';
import CrmAgent from './pages/CrmAgent';
import Agent from './pages/Agent';
// import BooksUser from './pages/BooksUser';
import SuperAdmin from './pages/SuperAdmin';
import EditAgent from './pages/EditAgent';
import { getUserData } from './utils/utils';
import { AgentDataType } from './utils/types';
import Dashboard from './pages/Dashboard/Index';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Authentication state
  const [userData, setUserData] = useState<AgentDataType>();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Check sessionStorage for authentication status on app load
  useEffect(() => {
    const authStatus = sessionStorage.getItem('isAuthenticated');
    const user = getUserData();
    setUserData(user);
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // This function handles login and sets session storage
  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('isAuthenticated', 'true'); // Store in sessionStorage
    navigate('/'); // Navigate to home or dashboard after login
  };

  // This function handles logout and clears session storage
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAuthenticated'); // Clear sessionStorage
    sessionStorage.removeItem('user'); // Clear sessionStorage
    navigate('/auth/signin'); // Navigate to login page after logout
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          {/* Redirect to /auth/signin if not authenticated */}
          {!isAuthenticated ? (
            <>
              <Route path="*" element={<Navigate to="/auth/signin" />} />
              <Route
                path="/auth/signin"
                element={
                  <>
                    <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <SignIn onLogin={handleLogin} /> {/* Pass login handler */}
                  </>
                }
              />
            </>
          ) : (
            <>
              <Route
                path="/*"
                element={
                  <DefaultLayout onLogout={handleLogout}>
                    {' '}
                    {/* Pass logout handler to layout */}
                    <Routes>
                      <Route
                        index
                        element={
                          <>
                            <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                            <Dashboard/>
                            {/* <ECommerce /> */}
                          </>
                        }
                      />
                      <Route
                        path="calendar"
                        element={
                          <>
                            <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                            <Calendar />
                          </>
                        }
                      />
                      <Route
                        path="profile"
                        element={
                          <>
                            <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                            <Profile />
                          </>
                        }
                      />
                      <Route
                        path="forms/form-elements"
                        element={
                          <>
                            <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                            <FormElements />
                          </>
                        }
                      />
                      <Route
                        path="forms/form-layout"
                        element={
                          <>
                            <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                            <FormLayout />
                          </>
                        }
                      />
                      <Route
                        path="tables"
                        element={
                          <>
                            <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                            <Tables />
                          </>
                        }
                      />
                      <Route
                        path="settings"
                        element={
                          <>
                            <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                            <Settings />
                          </>
                        }
                      />
                      <Route
                        path="chart"
                        element={
                          <>
                            <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                            <Chart />
                          </>
                        }
                      />
                      <Route
                        path="ui/alerts"
                        element={
                          <>
                            <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                            <Alerts />
                          </>
                        }
                      />
                      <Route
                        path="ui/buttons"
                        element={
                          <>
                            <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                            <Buttons />
                          </>
                        }
                      />
                      {userData &&
                        (userData.role === 'Super Admin' ||
                          userData.role === 'CRM Agent') && (
                          <Route
                            path="/add-user"
                            element={
                              <>
                                <PageTitle title="Add User | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                                <AddAgent />
                              </>
                            }
                          />
                        )}
                      {userData &&
                        (userData.role === 'Super Admin' ||
                          userData.role === 'CRM Agent') && (
                          <Route
                            path="/crm-agent"
                            element={
                              <>
                                <PageTitle title="crm-agent" />
                                <CrmAgent />
                              </>
                            }
                          />
                        )}
                      <Route
                        path="/agent"
                        element={
                          <>
                            <PageTitle title="Agent" />
                            <Agent />
                          </>
                        }
                      />
                      {/* <Route
                        path="/books-user"
                        element={
                          <>
                            <PageTitle title="Books-user" />
                            <BooksUser />
                          </>
                        }
                      /> */}
                      {userData && userData.role === 'Super Admin' && (
                        <Route
                          path="/Super-Admin"
                          element={
                            <>
                              <PageTitle title="Super Admin" />
                              <SuperAdmin />
                            </>
                          }
                        />
                      )}
                      <Route
                        path="/crm-agent/editUser/:id" // Dynamic route with agent ID
                        element={
                          <>
                            <PageTitle title="Edit Agent | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                            <EditAgent />
                          </>
                        }
                      />
                      <Route
                        path="/agent/editUser/:id" // Dynamic route with agent ID
                        element={
                          <>
                            <PageTitle title="Edit Agent | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                            <EditAgent />
                          </>
                        }
                      />
                      <Route
                        path="/Super-Admin/editUser/:id" // Dynamic route with agent ID
                        element={
                          <>
                            <PageTitle title="Edit Agent | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                            <EditAgent />
                          </>
                        }
                      />
                    </Routes>
                  </DefaultLayout>
                }
              />
            </>
          )}
        </Routes>
      )}
      <ToastContainer />
    </>
  );
}

export default App;
