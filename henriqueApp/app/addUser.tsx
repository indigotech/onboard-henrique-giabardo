import React, { useState } from 'react';
import { Button, StyleSheet, ScrollView, Alert, Text } from 'react-native';
import { LabeledInput } from '../components/LabeledInput';
import { router } from 'expo-router';
import * as yup from 'yup';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = yup.object({
  name: yup
    .string()
    .matches(/^\w+\s+\w+/, 'Name must be complete (at least 2 words)')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: yup
    .string()
    .matches(/^\d{10,11}$/, 'Phone must be 10-11 digits')
    .required('Phone is required'),
  birthDate: yup
    .string()
    .matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, 'Birth date must be in the format YYYY-MM-DD with a valid month and day')
    .test(
      'is-valid-date',
      'Birth date must be a valid date in the format YYYY-MM-DD',
      (value) => dayjs(value, 'YYYY-MM-DD', true).isValid()
    )
    .test(
      'is-in-range',
      'Birth date must be between January 1, 1900, and today',
      (value) => {
        const date = dayjs(value);
        return date.isValid() && date.isAfter(dayjs('1900-01-01')) && date.isBefore(dayjs());
      }
    )
    .required('Birth date is required'),
  password: yup
    .string()
    .min(7, 'Password must be at least 7 characters')
    .matches(/[A-Za-z]/, 'Password must contain at least one letter')
    .matches(/\d/, 'Password must contain at least one digit')
    .required('Password is required'),
  role: yup
    .string()
    .oneOf(['admin', 'user'], 'Invalid role')
    .required('Role is required'),
});

const AddUserScreen: React.FC = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const addUser = async (values: typeof initialValues) => {
    try {
      setServerError(null);
      const authToken = await AsyncStorage.getItem('authToken');
      if (!authToken) {
        Alert.alert('Error', 'Authorization token not found');
        return;
      }

      const response = await fetch('https://template-onboarding-node-sjz6wnaoia-uc.a.run.app/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${authToken}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        router.navigate('/users');
      } else {
        const errorData = await response.json();
        setServerError(errorData.errors?.[0]?.message ?? 'Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      setServerError('An unexpected error occurred');
    }
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      birthDate: '',
      password: '',
      role: '',
    },
    validationSchema,
    onSubmit: addUser,
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {serverError && <Text style={styles.errorText}>{serverError}</Text>}
      <LabeledInput
        label="Name"
        value={values.name}
        onChangeText={handleChange('name')}
        onBlur={handleBlur('name')}
        errorMessage={touched.name && errors.name ? errors.name : undefined}
      />
      <LabeledInput
        label="Email"
        value={values.email}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        keyboardType="email-address"
        errorMessage={touched.email && errors.email ? errors.email : undefined}
      />
      <LabeledInput
        label="Phone"
        value={values.phone}
        onChangeText={handleChange('phone')}
        onBlur={handleBlur('phone')}
        keyboardType="phone-pad"
        placeholder="0123456789"
        errorMessage={touched.phone && errors.phone ? errors.phone : undefined}
      />
      <LabeledInput
        label="Birth Date"
        value={values.birthDate}
        onChangeText={handleChange('birthDate')}
        onBlur={handleBlur('birthDate')}
        placeholder="YYYY-MM-DD"
        errorMessage={touched.birthDate && errors.birthDate ? errors.birthDate : undefined}
      />
      <LabeledInput
        label="Password"
        value={values.password}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        secureTextEntry
        errorMessage={touched.password && errors.password ? errors.password : undefined}
      />
      <LabeledInput
        label="Role"
        value={values.role}
        onChangeText={handleChange('role')}
        onBlur={handleBlur('role')}
        errorMessage={touched.role && errors.role ? errors.role : undefined}
      />
      <Button title="Add User" onPress={() => handleSubmit()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AddUserScreen;
