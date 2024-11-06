import { useState } from "react";

const usePasswordValidation = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password: string) => {
    const hasMinimumLength = password.length >= 7;
    const hasDigit = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    return hasMinimumLength && hasDigit && hasLetter;
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError(""); // Clear error on change
  };

  const validatePasswordField = () => {
    if (!password) {
      setPasswordError("Senha é obrigatória.");
      return false;
    } else if (!validatePassword(password)) {
      setPasswordError("A senha deve ter pelo menos 7 caracteres, uma letra e um dígito.");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  return {
    password,
    setPassword: handlePasswordChange,
    passwordError,
    validatePasswordField,
  };
};

export default usePasswordValidation;
