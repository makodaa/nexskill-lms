import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StudentAuthLayout from '../../layouts/StudentAuthLayout';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import { defaultLandingRouteByRole, mapStringToRole } from '../../types/roles';

const StudentLogin: React.FC = () => {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.email.trim() || !formData.password.trim()) {
            setError('Please enter both email and password.');
            return;
        }

        setIsSubmitting(true);

        try {
            const { data, error: signInError } = await signIn(formData.email, formData.password);

            if (signInError) {
                setError(signInError.message);
                setIsSubmitting(false);
                return;
            }

            // Directly fetch profile to get role and redirect
            if (data?.user) {
                const { data: profileData, error: profileError } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', data.user.id)
                    .single();

                if (profileError || !profileData) {
                    setError('Could not fetch user profile.');
                    setIsSubmitting(false);
                    return;
                }

                const role = mapStringToRole(profileData.role);

                // Verify user is a STUDENT
                if (role !== 'STUDENT') {
                    setError('This portal is for Students only. Please use the correct login portal.');
                    // Sign them out to prevent session issues
                    await supabase.auth.signOut();
                    setIsSubmitting(false);
                    return;
                }

                // Redirect to student dashboard
                navigate(defaultLandingRouteByRole['STUDENT']);
            }

        } catch (err) {
            const message = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(message);
            setIsSubmitting(false);
        }
    };

    return (
        <StudentAuthLayout maxWidth="small">
            <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Student Login</h1>
                    <p className="text-xl font-medium text-brand-primary mb-1">Student Access</p>
                    <p className="text-gray-500 dark:text-gray-400">Sign in to continue your learning journey</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5" noValidate>
                    {error && (
                        <div className="p-3 bg-red-100 border border-red-200 text-red-700 text-sm rounded-lg">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
                            <Link to="/forgot-password" className="text-sm text-brand-primary hover:underline font-medium">Forgot Password?</Link>
                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all pr-12"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-600 dark:text-gray-400">Remember me</label>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-brand-primary/30 transition-all transform hover:-translate-y-0.5"
                    >
                        {isSubmitting ? 'Signing In...' : 'Sign In as Student'}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-center space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account? <Link to="/signup" className="text-brand-primary hover:underline font-medium">Create Account</Link>
                    </p>
                    <div className="flex justify-center gap-4 text-xs text-gray-400">
                        <Link to="/coach/login" className="hover:text-gray-600 dark:hover:text-gray-200 transition-colors">Coach Login</Link>
                        <span>|</span>
                        <Link to="/admin/login" className="hover:text-gray-600 dark:hover:text-gray-200 transition-colors">Admin Login</Link>
                    </div>
                </div>
            </div>
        </StudentAuthLayout>
    );
};

export default StudentLogin;
