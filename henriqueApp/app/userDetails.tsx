import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function UserDetails() {
  const { id, name, email } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.userDetail}>ID: {id}</Text>
      <Text style={styles.userDetail}>Name: {name}</Text>
      <Text style={styles.userDetail}>Email: {email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  userDetail: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});
