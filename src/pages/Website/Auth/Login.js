import React, { useRef, useState } from "react";
import { get, isEmpty, set } from "lodash-es";
import { Avatar, Button, IconButton, InputAdornment } from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { indigo, green } from "@mui/material/colors";
import TextField from '@mui/material/TextField';
import PropTypes from "prop-types";
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';


// Function to validate form fields
async function validate(refs, form) {
  for (const [attribute, ref] of Object.entries(refs.current)) {
    var errors;
    // If a validate function is provided, use it to validate the form field
    if (ref.validate) {
      errors = await ref.validate(get(form, attribute));
    }
    // If there are any errors, log them and return false
    if (!isEmpty(errors)) {
      console.log(errors);
      return false;
    }
  }
  // If there are no errors, return true
  return true;
}



export default function Login(props) {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  console.log(googleClientId)

  // State for form fields and other variables
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState();
  const [redirectToPrivate, setRedirectToPrivate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Refs for form fields
  const refs = useRef({});

  const handleGoogleSignIn = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
    
  };

  // Function to update form state
  const updateForm = (attribute, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [attribute]: attribute === "email" ? value.toLowerCase() : value,
    }));
    console.log("Form State:", form);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const ok = await validate(refs, form);
    if (!ok) {
      return;
    }

    // Send login request to the server
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
      method: "POST",
      headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      body: JSON.stringify({
         form
        }),
      })
      .then(res => res.json())
      .then(data => {
          // If the user is authorized, redirect them to the dashboard or initial preferences page
          if (data.message === "Authorized") {
              localStorage.setItem('token', data.token);
              if (data.initial_preferences) {
                window.location.href = "/dashboard";
              } else {
                console.log("user is redirected")
                window.location.href = "/initial-preferences";
              }
              setRedirectToPrivate(true);
          } else {
            // If the user is not authorized, show an error message
            setErrorMessage("Sorry, we couldn't find an account with this email and password.");
          }
      })
      .catch(err => console.error("Error:", err));
  };
  
  // Render the login form
  return (
    <div>

      {redirectToPrivate ? (
        <Navigate to="/initial-preferences" />
      ) : (
        <Box sx={{ width: "50%", margin: "0 auto", marginTop: "50px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "60%" }}>
              <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Avatar style={{ backgroundColor: green[800], color: "white" }}>
                    <LockOutlined />
                  </Avatar>
                </div>
                <div style={{ textAlign: "center" }}>
                  <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Log In</h2>
                </div>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                />
                <div className="my-6">
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={(e) => updateForm("password", e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      style: {
                        paddingRight: 0,
                      },
                    }}
                  />
                </div> {errorMessage && (
                <div style={{ color: "red", textAlign: "center" }}>{errorMessage}</div>
              )}
                <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Log In
                  </Button>
                </div>
              </form>
              <div  style={{ display: "flex", justifyContent: "center", marginTop: "14px" }}>
     <GoogleButton onClick={handleGoogleSignIn} />
   </div>



              <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
              <Link to="/recover-password">
                <Button
                  style={{
                    textTransform: "initial",
                    color: indigo[500],
                  }}
                >
                  Forgot Password?
                </Button>
                </Link>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link to="/registration">
                  <Button
                    style={{
                      textTransform: "initial",
                      color: indigo[500],
                    }}
                  >
                    Don't have an account?
                  </Button>
                </Link>
              
              </div>
            </div>
          </div>
        </Box>
      )}
    </div>
  );
                  }
  

Login.propTypes = {
  setAuthType: PropTypes.func,
};