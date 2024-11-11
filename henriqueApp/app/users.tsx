import React, { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
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

  const renderItem = ({ item }: { item: { id: string; name: string; email: string } }) => (
    <TouchableOpacity 
      style={styles.userItem} 
      onPress={() => router.push({ pathname: '/userDetails', params: { name: item.name } })}
    >
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text>No users found</Text>}
          />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
      <FAB title="Add" color="#6200ee" style={styles.fab} onPress={handleNavigateToAddUser} />
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
  errorText: {
    color: 'red',
    textAlign: 'center',
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
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
