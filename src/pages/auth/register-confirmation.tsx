import React, { useEffect,useState,FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../api/api';
import logo from '/RockMainLogo.png';
import Button from '../../components/common/AdminButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RegisterConfirmationDto {
    token: string;
    otp: string;
}

const registerConfirmation = async (data: RegisterConfirmationDto): Promise<{ status: boolean; message: string }> => {
    try {
        const response = await api.post('/auth/registerconfirmation', data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Confirmation failed');
    }
};

const RegisterConfirmation: React.FC = () => {
    const [otp, setOtp] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const token = localStorage.getItem('jwtToken'); // Assuming token is stored in localStorage after registration

    const mutation = useMutation({
        mutationFn: registerConfirmation,
        onSuccess: (data) => {
            if (data.status) {
                toast.success('Confirmation successful!');
                // Redirect to next page or dashboard
                setTimeout(() => {
                    window.location.href = '/'; // Redirect to next page after confirmation
                }, 2000);
            } else {
                setErrorMessage(data.message);
                toast.error(data.message || 'Confirmation failed');
            }
        },
        onError: (error: Error) => {
            setErrorMessage(error.message);
            toast.error('Confirmation failed');
        },
    });

    const handleResendOtp = async () => {
        try {
            // Call resend OTP API (Assuming token is needed)
            const response = await api.post('/auth/registerotpresend', { token });
            toast.success('OTP resent successfully');
        } catch (error: any) {
            toast.error('Failed to resend OTP');
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!otp) {
            setErrorMessage('OTP is required.');
            toast.error('OTP is required.');
            return;
        }

        if (!token) {
            setErrorMessage('Token is missing.');
            toast.error('Token is missing.');
            return;
        }

        mutation.mutate({ token, otp });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-opacity-90 rounded-lg shadow-lg overflow-hidden relative w-full flex flex-col justify-center items-center">
                <ToastContainer />
                <img src={logo} alt="Logo" className="mx-auto mb-4 h-24 w-auto" />
                <h1 className="text-4xl font-bold text-center text-white mb-8" style={{ color: 'rgba(69, 248, 130, 1)' }}>
                    Register Confirmation
                </h1>
                <form className="p-8 rounded-lg bg-gray-800 md:w-[50%]" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="p-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring focus:ring-green-100 w-full"
                            />
                        </div>
                    </div>
                    {errorMessage && <div className="text-red-500 text-center mt-2">{errorMessage}</div>}

                    <div className="flex justify-center mt-6">
                        <Button
                            image="green"
                            text={mutation.isPending ? 'Confirming...' : 'Confirm'}
                            onClick={handleSubmit}
                            isDisabled={mutation.isPending}
                        />
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <button className="text-green-500" onClick={handleResendOtp}>
                        Resend OTP
                    </button>
                </div>
            </div>
        </div>
    );
};


export default RegisterConfirmation;
