import React, { useRef, useState } from "react";
import ReCAPTCHA from 'react-google-recaptcha';
import { Avatar, Button } from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PropTypes from "prop-types";
import EmailValidator from "../Auth/functions/validateEmail";
import { get, isEmpty } from "lodash-es";
import { Link } from 'react-router-dom';

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

  


export default function RestorePassword(props) {
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const [registrationError, setRegistrationError] = useState('');
    const [emailMatchError, setEmailMatchError] = useState(false);

    // State for form fields
  const [form, setForm] = useState({
    email: "",
    confirmEmail: "",
  });
  // State for registration success message
  const [recoverSuccess, setRecoverSuccess] = useState(false);

  const refs = useRef({});

    const handleRecaptchaResponse = (response) => {
        setRecaptchaToken(response);
    };

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const ok = await validate(refs, form);
    if (!ok) {
      return;
    }

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
                return res.text();
            })
            .then((data) => {
                if (data === "OK") {
                    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/recover-password`, {
                        method: "POST",
                        headers: {
                            Accept: "application/json, text/plain, */*",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            form,
                        }),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.message === "Password recovery email sent successfully") {
                                setRecoverSuccess(true);
                                console.log("Password recovery email sent successfully");
                            } else if (data.error && data.error === "Email not found") {
                                setRegistrationError("Email specified was not found in our database, please check that you have written your email correctly or create a new account.");
                            } else {
                                // Handle other errors
                                console.error("Restore password error:", data.error);
                                setRegistrationError("An error occurred while trying to restore your password. Please try again.");
                            }
                        })
            
                        .catch((err) => {
                            console.error("Error:", err);
                            alert("An error occurred during password restoration. Please try again.");
                        });
                };
            });
    }
    return (
        <Box sx={{ width: "50%", margin: "0 auto", marginTop: "50px" }}>
            {recoverSuccess && <div className="modal">
          <div className="modal-content">
            <h2>We have send you an email to restore your password</h2>
            <p>Access to your email address and click on the button to restore your password</p>
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
            <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Avatar style={{ backgroundColor: green[800], color: "white" }}>
                        <LockOutlined />
                    </Avatar>
                </div>
                <div style={{ textAlign: "center" }}>
                    <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Reset your password</h2>
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
                
                <div className="my-6"></div>
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
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <ReCAPTCHA sitekey="6LcsbEEpAAAAALs7fnhre9wxCewPKvxGcXiQFFl3" onChange={handleRecaptchaResponse} />
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: "16px" }}
                    >
                        Reset Password
                    </Button>
                </div>
            </form>
        </Box>
    );
}

RestorePassword.propTypes = {
    setAuthType: PropTypes.func,
  };