import React, { useState, FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { FaUser, FaLock } from 'react-icons/fa';
import Button from '../../components/common/AdminButton';
import { api } from '../../api/api';
import logo from '/RockMainLogo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getContainerClass } from '../../utils';
import { useSidebar } from '../../context/SidebarContext';

interface RegisterDto {
    telegramId: string;
    password: string;
}

interface RegisterResponse {
    status: boolean;
    message: string;
    response: string;  // JWT token (add this field for handling the response)
    telegramId: string;
}

const registerUser = async (data: RegisterDto): Promise<RegisterResponse> => {
    try {
        const response = await api.post<RegisterResponse>('/auth/register', data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Registration failed');
    }
};

const Register: React.FC = () => {
    const [telegramId, setTelegramId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const mutation = useMutation<RegisterResponse, Error, RegisterDto>({
        mutationFn: registerUser,
        onSuccess: (data) => {
            if (data.status) {
                toast.success('Registration successful!');
                // Store the JWT token if needed
                localStorage.setItem('jwtToken', data.response);

                // Navigate to confirmation page
                setTimeout(() => {
                    window.location.href = '/register-confirmation';
                }, 2000);
            } else {
                setErrorMessage(data.message);
                toast.error(data.message || 'Registration failed. Please try again.');
                // Clear error message after 5 seconds
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            }
        },
        onError: (error: Error) => {
            setErrorMessage(error.message);
            toast.error('Registration failed. Please try again.');
            // Clear error message after 5 seconds
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        },
    });

    const handleRegisterSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!telegramId || !password) {
            setErrorMessage('Both fields are required.');
            toast.error('Both fields are required.');
            // Clear error message after 5 seconds
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            return;
        }

        mutation.mutate({ telegramId, password });
    };

    return (
        <div className={`min-h-screen flex items-center justify-center`}>
            <div className="bg-opacity-90 rounded-lg shadow-lg overflow-hidden relative w-full flex flex-col justify-center items-center">
                <ToastContainer />
                <img src={logo} alt="Logo" className="mx-auto mb-4 h-24 w-auto" />
                <h1 className="text-4xl font-bold text-center text-white mb-8" style={{ color: 'rgba(69, 248, 130, 1)' }}>
                    Register
                </h1>
                <form className="p-8 rounded-lg bg-gray-800 md:w-[50%]" onSubmit={handleRegisterSubmit}>
                    <div className="flex flex-col gap-3">
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                            <input
                                type="text"
                                placeholder="Telegram ID"
                                value={telegramId}
                                onChange={(e) => setTelegramId(e.target.value)}
                                className="p-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring focus:ring-green-100 w-full"
                            />
                        </div>
                        <div className="relative flex items-center">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring focus:ring-green-100 w-full"
                            />
                        </div>
                    </div>
                    {errorMessage && <div className="text-red-500 text-center mt-2">{errorMessage}</div>}
                    <div className="flex justify-center mt-6">
                        <Button
                            image="green"
                            text={mutation.isPending ? 'Registering...' : 'Register'}
                            onClick={handleRegisterSubmit}
                            isDisabled={mutation.isPending}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
