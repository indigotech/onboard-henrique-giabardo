import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserDetails {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  phone: string;
  role: string;
}

interface UseFetchUserDetailsResult {
  userDetails: UserDetails | null;
  loading: boolean;
  error: string | null;
  fetchUserDetails: (id: string) => void;
}

const API_URL = 'https://template-onboarding-node-sjz6wnaoia-uc.a.run.app/users';

export function useFetchUserDetails(): UseFetchUserDetailsResult {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserDetails = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    setUserDetails(null);

    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        setError('Authorization token not found');
        setLoading(false);
        return;
      }

      const requestUrl = `${API_URL}/${id}`;
      const response = await fetch(requestUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
      const result = await response.json();

      if (response.ok) {
        setUserDetails(result.data);
      } else {
        const errorData = await response.json();
        setError(result.errors?.[0]?.message ?? 'Failed to fetch user details');
      }
    } catch (err) {
      setError('Connection error. Try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { userDetails, loading, error, fetchUserDetails };
}
