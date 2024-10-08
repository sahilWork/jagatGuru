export const getUserData = () => {
    const storedUser = sessionStorage.getItem('user');
    
    if (storedUser) {
      // Parse the string back into an object
      return JSON.parse(storedUser);
    }
    
    return null; // Return null if no user data is found
  };
  