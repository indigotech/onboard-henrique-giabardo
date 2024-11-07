import { useState } from "react";
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEmailValidation} from "./useEmailValidation";
import {usePasswordValidation} from "./usePasswordValidation";

const API_URL = 'https://template-onboarding-node-sjz6wnaoia-uc.a.run.app/authenticate';

export function useLogin() {
  const { email, setEmail, emailError, validateEmailField } = useEmailValidation();
  const { password, setPassword, passwordError, validatePasswordField } = usePasswordValidation();

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const isEmailValid = validateEmailField();
    const isPasswordValid = validatePasswordField();

    if (isEmailValid && isPasswordValid) {
      setIsLoading(true);

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          await AsyncStorage.setItem('authToken', data.data.token);
          router.navigate('/users');
        } else {
          setServerError(data.errors?.[0]?.message ?? "Erro desconhecido.");
        }
      } catch (error) {
        console.error("Login failed:", error);
        setServerError("Erro de conexão. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    email,
    setEmail,
    emailError,
    password,
    setPassword,
    passwordError,
    isLoading,
    serverError,
    handleSubmit,
  };
}
