import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function UserDetails() {
  const { name } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{name}</Text>
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
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
