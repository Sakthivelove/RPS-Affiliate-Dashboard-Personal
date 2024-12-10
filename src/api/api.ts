import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Define the base URL for your API
const API_BASE_URL = 'https://sjg2fq9j93.execute-api.ap-southeast-2.amazonaws.com/dev';
// Create an axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for request/response handling
api.interceptors.request.use(
  (config) => {
    // Example: Adding a token to request headers if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Example: A generic function to handle API response data and error types
const handleResponse = <T>(response: AxiosResponse<T>): T => {
  return response.data;
};

const handleError = (error: AxiosError): string => {
  if (error.response) {
    // Server error
    return `Error: ${error.response.status} - ${error.response.statusText}`;
  } else if (error.request) {
    // Network error
    return 'Network error, please try again later.';
  } else {
    // Other error
    return `Error: ${error.message}`;
  }
};

export { api, handleResponse, handleError };
