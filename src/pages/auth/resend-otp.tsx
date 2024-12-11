import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../api/api';
import logo from '/RockMainLogo.png';
import Button from '../../components/common/AdminButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const resendOtp = async (): Promise<{ status: boolean; message: string }> => {
    try {
        const response = await api.post('/auth/registerotpresend', {});
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'OTP resend failed');
    }
};

const RegisterOtpResend: React.FC = () => {
    const [isResending, setIsResending] = useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: resendOtp,
        onSuccess: (data) => {
            if (data.status) {
                toast.success('OTP sent successfully!');
            } else {
                toast.error(data.message || 'OTP resend failed');
            }
        },
        onError: (error: Error) => {
            toast.error('OTP resend failed');
        },
    });

    const handleResendClick = () => {
        setIsResending(true);
        mutation.mutate();
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-opacity-90 rounded-lg shadow-lg overflow-hidden relative w-full flex flex-col justify-center items-center">
                <ToastContainer />
                <img src={logo} alt="Logo" className="mx-auto mb-4 h-24 w-auto" />
                <h1 className="text-4xl font-bold text-center text-white mb-8" style={{ color: 'rgba(69, 248, 130, 1)' }}>
                    Resend OTP
                </h1>
                <Button
                    image="green"
                    text={mutation.isPending ? 'Sending OTP...' : 'Resend OTP'}
                    onClick={handleResendClick}
                    isDisabled={isResending || mutation.isPending}
                />
            </div>
        </div>
    );
};

export default RegisterOtpResend;
