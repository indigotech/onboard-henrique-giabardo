import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { LabeledInput } from "../components/LabeledInput";
import {useLogin} from "../hooks/useLogin";

export default function LoginScreen() {
  const {
    email,
    setEmail,
    emailError,
    password,
    setPassword,
    passwordError,
    isLoading,
    serverError,
    handleSubmit,
  } = useLogin(); 

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
