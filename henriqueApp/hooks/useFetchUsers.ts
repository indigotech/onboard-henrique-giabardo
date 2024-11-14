import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  name: string;
  email: string;
};

type UseFetchUsersResult = {
  users: User[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;

};

const API_URL = 'https://template-onboarding-node-sjz6wnaoia-uc.a.run.app/users';

export function useFetchUsers(): UseFetchUsersResult {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 20;


  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          setError('Authorization token not found');
          setLoading(false);
          return;
        }

        const offset = usersPerPage * (page - 1);

        const requestUrl = `${API_URL}?offset=${offset}&limit=${usersPerPage}`;

        const response = await fetch(requestUrl, {

          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
        });

        const result = await response.json();

        if (response.ok) {
          setUsers(result.data?.nodes ?? []);
          
          const totalUsers = result.data?.count ?? 0;
          setTotalPages(Math.ceil(totalUsers / usersPerPage));

        } else {
          setError(result.errors?.[0]?.message ?? 'Failed to fetch users');
        }
      } catch (error) {
        setError("Connection error. Try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

  }, [page]);

  return { users, loading, error, page, totalPages, setPage };

}
