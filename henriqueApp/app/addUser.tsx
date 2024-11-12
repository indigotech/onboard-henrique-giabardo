import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { H1 } from '../components/H1';
import { LabeledInput } from '../components/LabeledInput';
import { CustomButton } from '../components/CustomButton';
import { useAddUserForm } from '../hooks/useAddUserForm';

export default function AddUserScreen() {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    serverError,
  } = useAddUserForm();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <H1>Criar usuário</H1>
      
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
      
      <CustomButton
        label="Add User"
        backgroundColor="#6200ee"
        textColor="#ffffff"
        onPress={handleSubmit}
      />
    </ScrollView>
  );
}

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
