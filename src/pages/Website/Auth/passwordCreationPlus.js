
import React, { useState, useEffect } from "react";
import { Avatar, Button, IconButton, InputAdornment, TextField, Box } from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import PasswordValidator from "../Auth/functions/validatePassword";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function CreatePassword() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/create-password/check-token`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        if (response.ok) {
          setIsValidToken(true);
        } else {
          setIsValidToken(false);
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };

    checkToken();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault()
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/create-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        password,
      }),
    })
      .then(res => {
        if (res.ok) { // Check if the response status code is 200-299
          return res.json().then(data => {
            setPasswordUpdated(true);
            console.log("Password updated successfully");
          });
        } else {
          return res.json().then(data => {
            console.log("Error updating password:", data.message);
          });
        }
      })
      .catch(error => {
        // Handle fetch or JSON parsing errors
        console.error("Fetch error:", error);
      });
  }



  // Render the create password form
  return (
    <Box sx={{ width: "50%", margin: "0 auto", marginTop: "50px" }}>
      {!isValidToken && (
        <div className="modal">
          <div className="modal-content">
            <h2>Token has been already used. Please restore your password if you don't remember it.</h2>
            <div className="my-6"></div>
            <Link to="/recover-password">
              <span
                className="mx-6 text-white rounded bg-green-800 text-sm font-medium hover:bg-white hover:text-green-800
      hover:border-green focus:outline-none focus:ring active:bg-green-800 sm:w-auto px-5 py-2.5 duration-300 border border-transparent hover:border-green-800"
                aria-label="Recover password"
              >
                Forgot your password?
              </span>
            </Link>
          </div>
        </div>
      )}

      {passwordUpdated ? (
        <div className="modal">
          <div className="modal-content">
            <h2>Password Updated Successfully</h2>
            <p>You can now log in with your new password.</p>
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
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "60%" }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Avatar style={{ backgroundColor: green[800], color: "white" }}>
                  <LockOutlined />
                </Avatar>
              </div>
              <div style={{ textAlign: "center" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Set Your Password</h2>
              </div>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <div className="my-6"></div>
              <TextField
                label="Confirm Password"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                required
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <PasswordValidator password={password} password2={password2} />
              <div className="my-6"></div>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Set Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Box>
  );
}