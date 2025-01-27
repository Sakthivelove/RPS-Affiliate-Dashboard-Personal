import React, { useState, FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { FaEye, FaEyeSlash, FaUser, FaLock } from 'react-icons/fa';
import Button from '../../components/common/AdminButton';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import logo from '/RockMainLogo.png'; // Logo Image
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

interface LoginDto {
  telegramId: string;
  password: string;
}

interface LoginResponse {
  status: boolean;
  auth2: boolean;
  response: string;
  message: string;
  AuthId: number;
}

const loginUser = async (data: LoginDto): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

const AffiliateLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [telegramId, setTelegramId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useAuth(); // Access setUser from context

  const mutation = useMutation<LoginResponse, Error, LoginDto>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login Success Data: ", data);  // Check if data is received and correct

      if (data.status) {
        const user = {
          id: data.AuthId,
          token: data.response,
        };
        setUser(user); // Set user data in context
        localStorage.setItem('token', data.response);

        // Show success toast
        toast.success('Login successful! Redirecting...');

        // Delay the redirect to allow snackbar to be shown
        setTimeout(() => {
          // Navigate based on 2FA
          if (data.auth2) {
            navigate('/verify-2fa');
          } else {
            // navigate('/dashboard');
            navigate("/tournament-list")
          }
        }, 3000); // Delay for 1 second to let Snackbar appear
      } else {
        setErrorMessage(data.message);
        toast.error(data.message || 'Login failed. Please try again.', {
          position: 'top-right',
        });
      }
    },

    onError: (error: Error) => {
      console.error('Login failed:', error.message);
      setErrorMessage('Login failed. Please check your credentials.');

      // Show error toast
      toast.error('Login failed. Please check your credentials.', {
        position: 'top-right',
      });
    },
  });

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Clear any existing error messages when starting a new attempt
    setErrorMessage(null);

    // Validate input fields
    if (!telegramId || !password) {
      setErrorMessage('Both fields are required.');
      toast.error('Both fields are required.', {
        position: 'top-center',
      });
      return;
    }

    // Initiate login mutation
    mutation.mutate({ telegramId, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="bg-opacity-90 rounded-lg shadow-lg overflow-hidden relative w-full flex flex-col justify-center items-center">
        <ToastContainer />
        {/* Logo */}
        <img src={logo} alt="Rock Main Logo" className="mx-auto mb-4 h-24 w-auto" />

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-white mb-8" style={{ color: 'rgba(69, 248, 130, 1)' }}>
          Affiliate Login
        </h1>

        <div
          className="p-[0.07rem] rounded-lg md:w-[30%]"
          style={{ background: 'linear-gradient(90deg, #45F882 0%, #FFBE18 100%)' }}
        >
          <form className="p-8 rounded-lg" style={{ backgroundColor: 'rgba(26, 29, 38, 1)' }} onSubmit={handleLoginSubmit}>
            <div className="flex flex-col gap-3">
              {/* Telegram ID input */}
              <div className="relative">
                <FaUser color="green" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                <input
                  type="text"
                  placeholder="Telegram ID"
                  value={telegramId}
                  onChange={(e) => {
                    setTelegramId(e.target.value);
                    setErrorMessage(null); // Clear error on input change
                  }}
                  className="p-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring focus:ring-green-100 w-full"
                  style={{
                    backgroundColor: 'rgba(14, 27, 34, 1)',
                    color: 'white',
                    border: 'none',
                  }}
                />
              </div>

              {/* Password input with eye icon */}
              <div className="relative flex items-center">
                <FaLock color="green" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage(null); // Clear error on input change
                  }}
                  className="p-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring focus:ring-green-100 w-full"
                  style={{
                    backgroundColor: 'rgba(14, 27, 34, 1)',
                    color: 'white',
                    border: 'none',
                  }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: 'none', border: 'none' }}
                >
                  {showPassword ? <FaEyeSlash color="white" /> : <FaEye color="white" />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end mt-1">
              <button
                type="button"
                className="text-md text-[#45f882] px-2"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </button>
            </div>

            {/* Error message */}
            {errorMessage && (
              <div className="text-red-500 text-center mt-2">{errorMessage}</div>
            )}

            {/* Login Button */}
            <div className="flex justify-center mt-6">
              <Button
                image="green"
                text={mutation.isPending ? 'Logging in...' : 'Login'}
                onClick={handleLoginSubmit}
                isDisabled={mutation.isPending}
              />
            </div>

          </form>
        </div>
        {/* Registration Prompt */}
        <div className="mt-4 text-center text-white">
          <p>
            Don't have an account?{' '}
            <button
              type="button"
              className="text-[#45f882] font-semibold"
              onClick={() => navigate('/register')}
            >
              Sign up here.
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AffiliateLogin;
