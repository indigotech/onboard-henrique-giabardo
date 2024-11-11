import React, { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useFetchUsers } from '../hooks/useFetchUsers';
import { Pagination } from '../components/Pagination';
import { FAB } from '@rneui/themed';

export default function UsersListScreen() {
  const { users, loading, error, page, totalPages, setPage, fetchUsers } = useFetchUsers();

  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [fetchUsers])
  );

  const handleNavigateToAddUser = () => {
    router.push('/addUser');
  };

export default function UserListScreen() {
  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registered Users</Text>
      <FlatList
        data={fakeStaticUsers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  userItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
});
