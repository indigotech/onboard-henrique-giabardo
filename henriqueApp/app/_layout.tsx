import React, { useState }  from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { LabeledInput } from "..//components/LabeledInput";
import useEmailValidation from "../hooks/useEmailValidation";
import usePasswordValidation from "../hooks/usePasswordValidation";

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

  const handleSubmit = () => {
    const isEmailValid = validateEmailField();
    const isPasswordValid = validatePasswordField();

    if (isEmailValid && isPasswordValid) {
      Alert.alert("Login bem-sucedido!");
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
      <Button title="Entrar" onPress={handleSubmit} />
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
