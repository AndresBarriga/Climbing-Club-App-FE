import React from "react";

export default function EmailValidator({ email }) {
  const validateEmail = () => {
    // Reset password error message
    let emailError = "";


    if (!/^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/i.test(email)) {
        emailError = 'Invalid email address'
    }

    return emailError;
  };

  const emailError = validateEmail();

  return <p style={{ color: "red" }}>{emailError}</p>;
}