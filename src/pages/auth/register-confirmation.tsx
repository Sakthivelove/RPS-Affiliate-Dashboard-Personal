import React, { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../api/api';
import logo from '/RockMainLogo.png';
import Button from '../../components/common/AdminButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const registerConfirmation = async (): Promise<{ status: boolean; message: string }> => {
    try {
        const response = await api.post('/auth/registerconfirmation', {});
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Confirmation failed');
    }
};

const RegisterConfirmation: React.FC = () => {
    const mutation = useMutation({
        mutationFn: registerConfirmation,
        onSuccess: (data) => {
            if (data.status) {
                toast.success('Confirmation successful!');
                // Redirect to next page
                setTimeout(() => {
                    window.location.href = '/register-otp-resend';
                }, 2000);
            } else {
                toast.error(data.message || 'Confirmation failed');
            }
        },
        onError: (error: Error) => {
            toast.error('Confirmation failed');
        },
    });

    useEffect(() => {
        mutation.mutate();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-opacity-90 rounded-lg shadow-lg overflow-hidden relative w-full flex flex-col justify-center items-center">
                <ToastContainer />
                <img src={logo} alt="Logo" className="mx-auto mb-4 h-24 w-auto" />
                <h1 className="text-4xl font-bold text-center text-white mb-8" style={{ color: 'rgba(69, 248, 130, 1)' }}>
                    Register Confirmation
                </h1>
                <Button
                    image="green"
                    text={mutation.isPending ? 'Confirming...' : 'Confirm'}
                    onClick={() => mutation.mutate()}
                    isDisabled={mutation.isPending}
                />
            </div>
        </div>
    );
};

export default RegisterConfirmation;
