import React from "react";

export default function PasswordValidator({ password, password2 }) {
  const validatePassword = () => {
    // Reset password error message
    let passwordError = "";

    if (password.length < 8) {
      passwordError = "Password must be at least 8 characters long";
    } else if (!/[!@#$%^&*.,]/.test(password)) {
      passwordError = "Password must contain at least 1 symbol";
    } else if (!/[A-Z]/.test(password)) {
      passwordError = "Password must contain at least 1 uppercase letter";
    } else if (!/[a-z]/.test(password)) {
      passwordError = "Password must contain at least 1 lowercase letter";
    } else if (!/\d/.test(password)) {
      passwordError = "Password must contain at least 1 number";
    } else if (password !== password2) {
      passwordError = "Passwords do not match";
    } 

    return passwordError;
  };

  const passwordError = validatePassword();

  return <p style={{ color: "red" }}>{passwordError}</p>;
}