import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status }: { status?: string }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
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
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
                </div>

                {/* Login Container */}
                <div className="relative z-10 w-full max-w-md">
                    {/* Logo / Title Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-2">AISSENTIAL</h1>
                        <p className="text-white/40 text-sm">Admin Dashboard</p>
                        <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                        {status && (
                            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
                                {status}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/45 mb-3">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="admin@aissential.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/25 focus:bg-white/[0.07] transition-all duration-200"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-400 text-xs mt-2">{errors.email}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/45 mb-3">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/25 focus:bg-white/[0.07] transition-all duration-200 pr-12"
                                        required
                                    />
                                    {/* Toggle password visibility */}
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                                    >
                                        {showPassword ? '×' : '•'}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-400 text-xs mt-2">{errors.password}</p>
                                )}
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium text-sm transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20"
                            >
                                {processing ? 'Logging in...' : 'Login'}
                            </button>
                        </form>

                        {/* Footer info */}
                        <div className="mt-6 pt-6 border-t border-white/10 text-center text-white/40 text-xs">
                            <p>© 2026 AISSENTIAL · Internship Admin</p>
                        </div>
                    </div>

                    {/* Bottom decoration */}
                    <div className="mt-8 text-center text-white/25 text-xs">
                        <p>Secure Admin Portal</p>
                    </div>
                </div>
            </div>
        </>
    );
}
