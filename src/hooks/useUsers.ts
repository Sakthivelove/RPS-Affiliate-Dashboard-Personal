import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchUsers, UsersResponse } from '../services/user/userService';

// UseQueryResult from TanStack Query has a generic type for data
export const useUsers = (page: number = 1, limit: number = 10): UseQueryResult<UsersResponse, Error> => {
  return useQuery<UsersResponse, Error>({
    queryKey: ['users', page, limit], // Set the query key based on page and limit
    queryFn: () => fetchUsers(page, limit), // Pass the page and limit to the fetch function
  });
};
