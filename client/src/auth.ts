export const isLoggedIn = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/check', {
        credentials: 'include',
      });
      const data = await response.json();
      return data.isLoggedIn;
    } catch (error) {
      console.error('Error checking login status:', error);
      return false;
    }
  };
  