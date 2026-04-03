import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import AnimatedBackground from '@/components/auth/AnimatedBackground';
import LoginFooter from '@/components/auth/LoginFooter';
import LoginForm from '@/components/auth/LoginForm';
import LoginHeader from '@/components/auth/LoginHeader';


export default function Login({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
    });

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, []);

    // Submit login form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <>
            <Head title="Admin Login" />
            <div className="h-screen overflow-hidden bg-[#0a0a0a] text-white flex items-center justify-center px-4 sm:px-6">
                {/* Animated background gradient */}
                <AnimatedBackground />

                {/* Login Container */}
                <div className="relative z-10 w-full max-w-md">
                    {/* Logo / Title Section */}
                    <LoginHeader />

                    {/* Form Card */}
                    <LoginForm
                        status={status}
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSubmit={handleSubmit}
                    />

                    {/* Bottom decoration */}
                    <LoginFooter />
                </div>
            </div>
        </>
    );
}
