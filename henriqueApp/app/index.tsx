import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LabeledInput } from '../components/LabeledInput';
import { useLogin } from '../hooks/useLogin';
import { H1 } from '../components/H1';
import { CustomButton } from '../components/CustomButton';

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
      <H1>Bem-vindo(a) à Taqtile!</H1>
      <LabeledInput
        label="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        errorMessage={emailError}
      />
      
      <LabeledInput
        label="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        errorMessage={passwordError}
      />

      {serverError ? <Text style={styles.errorText}>{serverError}</Text> : null}

      <CustomButton
        label={isLoading ? "Carregando..." : "Entrar"}
        backgroundColor="#6200ee"
        textColor="#ffffff"
        onPress={handleSubmit}
        loading={isLoading}
      />
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