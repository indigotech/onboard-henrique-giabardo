import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface LabeledInputProps extends TextInputProps {
  label: string;
  errorMessage?: string;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({ label, errorMessage, ...textInputProps }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, errorMessage ? styles.labelError : null]}>{label}</Text>
      <TextInput
        style={[styles.input, errorMessage ? styles.inputError : null]}
        {...textInputProps}
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    fontWeight: '400',
    color: '#777777',
    marginBottom: 12,
  },
  labelError: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#777777',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'red',
    marginTop: 8,
  },
});
