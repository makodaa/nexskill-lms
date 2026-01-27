import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StudentAuthLayout from '../../layouts/StudentAuthLayout';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const { getDefaultRoute } = useUser();
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
      const { error: signInError } = await signIn(formData.email, formData.password);

      if (signInError) {
        setError(signInError.message);
        setIsSubmitting(false);
        return;
      }

      // Wait for profile and get route (getDefaultRoute now handles retry)
      const route = await getDefaultRoute();
      navigate(route);

    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    console.log(`Logging in with ${provider}`);
    setError(`Social login with ${provider} is not yet configured.`);
  };

  return (
    <StudentAuthLayout maxWidth="small">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-xl font-medium text-brand-primary mb-1">Student & Coach Portal</p>
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
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
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
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
          {/* Social Login Buttons - Restored */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="py-3 px-4 bg-[#F5F7FF] dark:bg-slate-700 rounded-full font-medium text-sm text-text-secondary dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
            >
              <span className="sr-only">Google</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('Microsoft')}
              className="py-3 px-4 bg-[#F5F7FF] dark:bg-slate-700 rounded-full font-medium text-sm text-text-secondary dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
            >
              <span className="sr-only">Microsoft</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#f25022" d="M1 1h10v10H1z" />
                <path fill="#00a4ef" d="M13 1h10v10H13z" />
                <path fill="#7fba00" d="M1 13h10v10H1z" />
                <path fill="#ffb900" d="M13 13h10v10H13z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('Apple')}
              className="py-3 px-4 bg-[#F5F7FF] dark:bg-slate-700 rounded-full font-medium text-sm text-text-secondary dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
            >
              <span className="sr-only">Apple</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
            </button>
          </div>

          <div className="text-center space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account? <Link to="/signup" className="text-brand-primary hover:underline font-medium">Create Account</Link>
            </p>
            <Link to="/admin/login" className="block text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
              Admin Login
            </Link>
          </div>
        </div>

      </div>
    </StudentAuthLayout>
  );
};

export default Login;
