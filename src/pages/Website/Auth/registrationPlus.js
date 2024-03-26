import React, { useRef, useState } from "react";
import ReCAPTCHA from 'react-google-recaptcha';
import { get, isEmpty } from "lodash-es";
import { Avatar, Button, IconButton, InputAdornment } from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { indigo, green } from "@mui/material/colors";
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import PropTypes from "prop-types";
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'
import PasswordValidator from "../Auth/functions/validatePassword";
import EmailValidator from "../Auth/functions/validateEmail";

// Function to validate form fields
async function validate(refs, form) {
  for (const [attribute, ref] of Object.entries(refs.current)) {
    var errors;
    if (ref.validate) {
      errors = await ref.validate(get(form, attribute));
    }
    if (!isEmpty(errors)) {
      console.log(errors);
      return false;
    }
  }
  return true;
}


export default function RegistrationPlus(props) {

  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [registrationError, setRegistrationError] = useState('');



  // State for form fields
  const [form, setForm] = useState({
    email: "",
    confirmEmail: "",
    firstName: "",
    lastName: "",
  });

  // State for registration success message
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const [emailMatchError, setEmailMatchError] = useState(false);

  const handleRecaptchaResponse = (response) => {
    // Store the reCAPTCHA response token
    setRecaptchaToken(response);
  };


  // Refs for form fields
  const refs = useRef({});

  // Function to update form state

  const updateForm = (attribute, value) => {
    const prevForm = { ...form }; // Store the previous form state

    setForm((prevForm) => ({
      ...prevForm,
      [attribute]: attribute === "email" || attribute === "confirmEmail" ? value.toLowerCase() : value, // email and confirmEmail will be stored in lowercases
    }));

    // Call the validator here
    if (attribute === "email") {
      EmailValidator(value);
    }

    // Add check for confirmEmail
    if (attribute === "confirmEmail" && prevForm.email !== value) {
      setEmailMatchError(true);
    } else {
      setEmailMatchError(false);
    }
  };

  // State for checkbox
  const [checked, setChecked] = React.useState(false);
  const handleChangeBox = (event) => {
    setChecked(event.target.checked);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the checkbox is checked
    if (!checked) {
      console.log("You must agree to the terms and conditions.");
      return;
    }

    // Validate form fields
    const ok = await validate(refs, form);
    if (!ok) {
      return;
    }
    // Send a request to the back-end server to verify the reCAPTCHA token
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/verify-recaptcha`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",

      },
      body: JSON.stringify({
        recaptchaToken: recaptchaToken,
        secretKey: "6LcsbEEpAAAAAN-fB9_pQz3zn-zQRgd4m-jcAhaL"
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to verify reCAPTCHA response");
        }
        // Parse the response as text instead of JSON
        return res.text();
      })
      .then((data) => {
        if (data === "OK") {
          // Send registration request to the server
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/register-plus`, {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              form,
            }),
          })
            .then((res) => {
              if (res.status === 401) {
                return res.json().then((data) => {
                  console.log(data); // Log the error message
                });
              } else {
                return res.json(); // Parse JSON response
              }
            })

            .then((data) => {
              if (data.message === "User registered successfully") {
                setRegistrationSuccess(true);
                console.log("User registered successfully");
              } else if (data.error === "Email already registered") {
                // Handle the error when the email is already registered
                console.error("Registration error:", data.error);
                setRegistrationError("Sorry but this account is already registered, try using a different email address or recover your password");
              } else {
                console.error("Registration error:", data.error);
              }
            })
            .catch((err) => {
              console.error("Error:", err);
              alert("An error occurred during registration. Please try again.");
            });
        };
      });
  }


  // Render the registration form
  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <Box sx={{ width: "50%", margin: "0 auto", marginTop: "50px" }}>
        {registrationSuccess && <div className="modal">
          <div className="modal-content">
            <h2>Congratulations, {form.firstName}!</h2>
            <p>You're now a member of our community. We've sent you a welcome email. Click the link to verify your email address.</p>
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
        </div>}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "60%" }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Avatar style={{ backgroundColor: green[800], color: "white" }}>
                  <LockOutlined />
                </Avatar>
              </div>
              <div style={{ textAlign: "center" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Create your account</h2>
              </div>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                value={form.email}
                onChange={(e) => updateForm("email", e.target.value)}
              />
               {registrationError && <p style={{ color: 'red' }}>{registrationError}</p>}

              <div className="my-6">

                <TextField
                  label="Confirm Email"
                  variant="outlined"
                  fullWidth
                  required
                  value={form.confirmEmail}
                  onChange={(e) => updateForm("confirmEmail", e.target.value)}
                />
                {emailMatchError && <p style={{ color: 'red' }}>Emails do not match!</p>}
                <div className="my-6"></div>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={form.firstName}
                  onChange={(e) => updateForm("firstName", e.target.value)}
                />
                <div className="my-6"></div>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={form.lastName}
                  onChange={(e) => updateForm("lastName", e.target.value)}
                />
                <div className="my-6"></div>

                <div className="my-6"></div>
                <FormControlLabel required control={<Checkbox
                  checked={checked}
                  onChange={handleChangeBox}
                  inputProps={{ 'aria-label': 'controlled' }}

                />} label='By clicking "Register," you agree to our Terms and Conditions. Your privacy and data security are important to us.' />
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "8px" }}>
                <ReCAPTCHA sitekey="6LcsbEEpAAAAALs7fnhre9wxCewPKvxGcXiQFFl3" onChange={handleRecaptchaResponse} />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "16px" }}
                >
                  Register
                </Button>
              </div>
            </form>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
              <Button
                onClick={() => console.log("Forgot Password")}
                style={{
                  textTransform: "initial",
                  color: indigo[500],
                }}
              >
                Forgot Password?
              </Button>
            </div>

          </div>
        </div>
      </Box>
    </LocalizationProvider>
  );
}


RegistrationPlus.propTypes = {
  setAuthType: PropTypes.func,
};