import React, { useRef, useState } from "react";
import { get, isEmpty} from "lodash-es";
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

// Registration component
export default function Registration(props) {
  
  // State for form fields
  const [form, setForm] = useState({
    email: "",
    password: "",
    password2: "",
    firstName: "",
    lastName: "",
  });

  // State for registration success message
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Refs for form fields
  const refs = useRef({});
  
  // Function to update form state
  const updateForm = (attribute, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [attribute]: attribute === "email" ? value.toLowerCase() : value, // email will be stored in lowercases
    }));
    console.log("Form State:", form);
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

    // Send registration request to the server
    fetch(`${process.env.REACT_APP_BACKEND_URL}/registration`, {
      method: "POST",
      headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      body: JSON.stringify({
         form,
        }),
      })
      .then(res => {
          if (res.status === 401) {
              return res.json().then(data => {
                  console.log(data); // Log the error message
              });
          } else {
              return res.json(); // Parse JSON response
          }
      })
      .then(data => {
        if (data.message === "User registered successfully") {
            setRegistrationSuccess(true);
            console.log("User registered successfully");
        } else {
            console.log("Error");
        }
      })
      .catch(err => console.error("Error:", err));
  };

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
          <EmailValidator email={form.email} />
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
                    onClick={togglePasswordVisibility}
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
          <div className="my-6"></div>
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type={showPassword ? "text" : "password"}
            required
            value={form.password2}
            onChange={(e) => updateForm("password2", e.target.value)}
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
              style: {
                paddingRight: 0,
              },
            }}
          />
          <PasswordValidator password={form.password} password2={form.password2} />
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

          <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
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

Registration.propTypes = {
  setAuthType: PropTypes.func,
};