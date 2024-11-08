import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

type UserFormInputs = {
  name: string;
  phone: string;
  birthDate: string;
  role: string;
};

export default function AddUserScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<UserFormInputs>();

  const onSubmit = (data: UserFormInputs) => {
    Alert.alert('User Added', JSON.stringify(data));
    // Call your API here to add the user
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add User</Text>

      <Controller
        control={control}
        name="name"
        rules={{ required: true, pattern: /^[a-zA-Z]+\s+[a-zA-Z]+$/ }}
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Full Name" value={value} onChangeText={onChange} />
        )}
      />
      {errors.name && <Text style={styles.errorText}>Name must be at least two words</Text>}

      <Controller
        control={control}
        name="phone"
        rules={{ required: true, pattern: /^\d{10,11}$/ }}
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Phone" keyboardType="numeric" value={value} onChangeText={onChange} />
        )}
      />
      {errors.phone && <Text style={styles.errorText}>Phone must be 10-11 digits</Text>}

      <Controller
        control={control}
        name="birthDate"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Birth Date (YYYY-MM-DD)" value={value} onChangeText={onChange} />
        )}
      />
      {errors.birthDate && <Text style={styles.errorText}>Birth date is required and must be in the past</Text>}

      <Controller
        control={control}
        name="role"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Role" value={value} onChangeText={onChange} />
        )}
      />
      {errors.role && <Text style={styles.errorText}>Role is required</Text>}

      <Button title="Add User" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    padding: 8,
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});
