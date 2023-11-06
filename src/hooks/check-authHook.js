import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const useAuth = () => {
 const [isAuthenticated, setIsAuthenticated] = useState(false);

 useEffect(() => {
   fetch('http://localhost:3001/check-auth', {
     method: 'GET',
     credentials: 'include',
   })
     .then((response) => {
       if (response.status === 200) {
         setIsAuthenticated(true); 
       }
     })
     .catch((error) => {
       console.error(error);
     });
 }, []);

 

 return isAuthenticated;
}