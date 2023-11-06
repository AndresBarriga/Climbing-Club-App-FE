import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/reusable/LogoutButton';

export default function Private() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/check-auth', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setIsAuthenticated(true); 
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },  []);
  
  if (!isAuthenticated) {
    return (
        
        <div className="modal-content">
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
  }

  return (
    <div>
      <h2>Private Route</h2>
      <LogoutButton />
    </div>
  );
}