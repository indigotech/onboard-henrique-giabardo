import { useState } from "react";

const useEmailValidation = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(""); // Clear error on change
  };

  const validateEmailField = () => {
    if (!email) {
      setEmailError("E-mail é obrigatório.");
      return false;
    } else if (!validateEmail(email)) {
      setEmailError("Formato de e-mail inválido.");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  return {
    email,
    setEmail: handleEmailChange,
    emailError,
    validateEmailField,
  };
};

export default useEmailValidation;
