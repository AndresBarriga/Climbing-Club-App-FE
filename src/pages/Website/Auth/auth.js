import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../../../components/reusable/HeaderWebsite';

// This hook checks if the user is authenticated
export const useCheckAuthentication = () => {
  // State variable for storing the authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Effect hook for checking the authentication status
  useEffect(() => {
    // Send a request to the check-auth endpoint
    fetch('http://localhost:3001/check-auth', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then((response) => {
        // If the response status is 200, the user is authenticated
        if (response.status === 200) {
          setIsAuthenticated(true); 
        }
      })
      .catch((error) => {
        // Log any errors
        console.error(error);
      });
  }, []);

  // Message to display when the user is not authenticated
  const loginMessage = (
    <div className="modal-content">
      <AppHeader />
      <h2>Please Log in to see the page</h2>
      <p>This page is just for people who is signed in, please log in to continue.</p>
      <div className="my-6"></div>
      <Link to="/auth">
        <span
          className="mx-6 text-white rounded bg-green-800 text-sm font-medium hover:bg-white hover:text-green-800 hover:border-green focus:outline-none focus:ring active:bg-green-800 sm:w-auto px-5 py-2.5 duration-300 border border-transparent hover:border-green-800"
          aria-label="Sign in"
        >
          Log in
        </span>
      </Link>
    </div>
  );

  // Return the authentication status and the login message
  return { isAuthenticated, loginMessage };
};