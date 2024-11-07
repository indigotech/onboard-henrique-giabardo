import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  return (
    <View style={styles.pagination}>
      <TouchableOpacity
        style={[styles.pageButton, page === 1 && styles.disabledButton]}
        onPress={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        <Text style={styles.pageButtonText}>Previous</Text>
      </TouchableOpacity>

      <Text style={styles.pageNumber}>
        Page {page} of {totalPages}
      </Text>

      <TouchableOpacity
        style={[styles.pageButton, page === totalPages && styles.disabledButton]}
        onPress={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        <Text style={styles.pageButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  pageButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  pageButtonText: {
    color: '#fff',
  },
  pageNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});