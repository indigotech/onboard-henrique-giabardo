import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import LabeledInput from "..//components/LabeledInput";


export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo(a) à Taqtile!</Text>
      <LabeledInput label="E-mail" keyboardType="email-address" />
      <LabeledInput label="Senha" secureTextEntry />
      <Button title="Entrar" onPress={() => {}} />
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
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});
