

function LogoutButton() {
    const handleClick = () => {
        fetch('${process.env.REACT_APP_BACKEND_URL}/logout', {
          method: 'GET',
          credentials: 'include',
        })
        .then((response) => {
          if (response.ok) {
            // Remove the token from localStora
            localStorage.removeItem('token');
            // Redirect to the login page or home page
            window.location.href = "/";
          } else {
            console.error('Logout failed');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      };
    return  <button onClick={handleClick}
								className="block w-full rounded bg-white text-sm mr-20 font-medium text-green-700 hover:bg-green-800 hover:text-white focus:outline-none focus:ring active:bg-white sm:w-auto px-5 py-2.5 duration-300 "
								aria-label="Log In"
							>
								Log Out
							</button>;
  }

  export default LogoutButton;



  