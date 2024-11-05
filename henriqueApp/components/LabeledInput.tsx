import React from "react";
import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";

interface LabeledInputProps extends TextInputProps {
  label: string;
}

const LabeledInput: React.FC<LabeledInputProps> = ({ label, ...inputProps }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...inputProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
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
  },
});

export default LabeledInput;
