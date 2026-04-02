import { Head, useForm } from '@inertiajs/react';
import AnimatedBackground from '@/components/auth/AnimatedBackground';
import LoginHeader from '@/components/auth/LoginHeader';
import LoginForm from '@/components/auth/LoginForm';
import LoginFooter from '@/components/auth/LoginFooter';

export default function Login({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
    });

    // Submit login form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <>
            <Head title="Admin Login" />
            <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4 sm:px-6">
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
