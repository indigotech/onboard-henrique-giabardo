import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useFetchUserDetails } from '../hooks/useFetchUserDetails';

export default function UserDetails() {
  const { id } = useLocalSearchParams();
  const { userDetails, loading, error, fetchUserDetails } = useFetchUserDetails();

  useEffect(() => {
    if (id) {
      fetchUserDetails(id as string);
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading user details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!userDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User details not available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.userDetail}>Name: {userDetails.name}</Text>
      <Text style={styles.userDetail}>Email: {userDetails.email}</Text>
      <Text style={styles.userDetail}>Birth Date: {userDetails.birthDate}</Text>
      <Text style={styles.userDetail}>Phone: {userDetails.phone}</Text>
      <Text style={styles.userDetail}>Role: {userDetails.role}</Text>
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
    fontSize: 18,
    marginVertical: 4,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});
