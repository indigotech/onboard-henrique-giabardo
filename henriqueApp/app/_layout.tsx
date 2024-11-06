import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { LabeledInput } from "../components/LabeledInput";
import useEmailValidation from "../hooks/useEmailValidation";
import usePasswordValidation from "../hooks/usePasswordValidation";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://template-onboarding-node-sjz6wnaoia-uc.a.run.app/authenticate';

export default function LoginScreen() {
  const {
    email,
    setEmail,
    emailError,
    validateEmailField
  } = useEmailValidation();

  const {
    password,
    setPassword,
    passwordError,
    validatePasswordField
  } = usePasswordValidation();

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
          await AsyncStorage.setItem('authToken', data.token);          
        } else {
          setServerError(data.message || "Erro desconhecido.");
        }
      } catch (error) {
        console.error("Login failed:", error);
        setServerError("Erro de conexão. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo(a) à Taqtile!</Text>
      <LabeledInput
        label="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <LabeledInput
        label="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      {serverError ? <Text style={styles.errorText}>{serverError}</Text> : null}

      <Button title={isLoading ? "Carregando..." : "Entrar"} onPress={handleSubmit} disabled={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});
