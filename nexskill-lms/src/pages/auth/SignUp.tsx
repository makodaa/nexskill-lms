import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StudentAuthLayout from '../../layouts/StudentAuthLayout';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';

type AccountType = 'STUDENT' | 'COACH';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { getDefaultRoute } = useUser();
  const [accountType, setAccountType] = useState<AccountType>('STUDENT');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const { error } = await signUp(
          formData.email,
          formData.password,
          formData.firstName,
          formData.lastName,
          formData.username,
          accountType
        );

        if (error) {
          setSubmitError(error.message);
          return;
        }

        // Navigate to the appropriate dashboard based on role (determined by user profile)
        // Note: For email verification enabled flows, you might want to navigate to a verification page instead
        navigate(getDefaultRoute());
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An unexpected error occurred during signup';
        setSubmitError(message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSocialSignUp = (provider: string) => {
    // Dummy social signup - navigate based on account type
    console.log(`Signing up with ${provider} as ${accountType}`);
    setSubmitError(`Social signup with ${provider} is not yet configured.`);
  };

  return (
    <StudentAuthLayout maxWidth="small">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary dark:text-white mb-2">Create your account</h1>
          <p className="text-text-secondary dark:text-slate-400 text-sm">Start your learning journey today</p>
        </div>

        {/* Account Type Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-primary dark:text-white mb-3 text-center">
            I want to join as a
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setAccountType('STUDENT')}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                accountType === 'STUDENT'
                  ? 'border-brand-primary bg-brand-primary-soft dark:bg-blue-900/30 shadow-md'
                  : 'border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-brand-primary-light dark:hover:border-blue-500'
              }`}
            >
              <div className="text-3xl">🎓</div>
              <span className={`font-semibold ${
                accountType === 'STUDENT' 
                  ? 'text-brand-primary dark:text-blue-400' 
                  : 'text-text-primary dark:text-white'
              }`}>
                Student
              </span>
              <span className="text-xs text-text-secondary dark:text-slate-400 text-center">
                Learn new skills & grow
              </span>
            </button>
            <button
              type="button"
              onClick={() => setAccountType('COACH')}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                accountType === 'COACH'
                  ? 'border-brand-primary bg-brand-primary-soft dark:bg-blue-900/30 shadow-md'
                  : 'border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-brand-primary-light dark:hover:border-blue-500'
              }`}
            >
              <div className="text-3xl">👨‍🏫</div>
              <span className={`font-semibold ${
                accountType === 'COACH' 
                  ? 'text-brand-primary dark:text-blue-400' 
                  : 'text-text-primary dark:text-white'
              }`}>
                Coach
              </span>
              <span className="text-xs text-text-secondary dark:text-slate-400 text-center">
                Teach & share expertise
              </span>
            </button>
          </div>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSignUp} className="space-y-5">
          {submitError && (
            <div className="p-3 bg-red-100 border border-red-200 text-red-700 text-sm rounded-lg">
              {submitError}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            {/* First Name Input */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-text-primary dark:text-white mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First name"
                className={`w-full px-5 py-3 bg-[#F5F7FF] dark:bg-slate-700 rounded-full text-sm text-text-primary dark:text-white placeholder-text-muted dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary-light transition-all ${
                  errors.firstName ? 'ring-2 ring-red-400' : ''
                }`}
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500 ml-2">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name Input */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-text-primary dark:text-white mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last name"
                className={`w-full px-5 py-3 bg-[#F5F7FF] dark:bg-slate-700 rounded-full text-sm text-text-primary dark:text-white placeholder-text-muted dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary-light transition-all ${
                  errors.lastName ? 'ring-2 ring-red-400' : ''
                }`}
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500 ml-2">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-text-primary dark:text-white mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Pick a unique username"
              className={`w-full px-5 py-3 bg-[#F5F7FF] dark:bg-slate-700 rounded-full text-sm text-text-primary dark:text-white placeholder-text-muted dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary-light transition-all ${
                errors.username ? 'ring-2 ring-red-400' : ''
              }`}
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-500 ml-2">{errors.username}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-primary dark:text-white mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={`w-full px-5 py-3 bg-[#F5F7FF] dark:bg-slate-700 rounded-full text-sm text-text-primary dark:text-white placeholder-text-muted dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary-light transition-all ${
                errors.email ? 'ring-2 ring-red-400' : ''
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-primary dark:text-white mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password"
                className={`w-full px-5 py-3 pr-12 bg-[#F5F7FF] dark:bg-slate-700 rounded-full text-sm text-text-primary dark:text-white placeholder-text-muted dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary-light transition-all ${
                  errors.password ? 'ring-2 ring-red-400' : ''
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted dark:text-slate-400 hover:text-text-primary dark:hover:text-white transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
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
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary dark:text-white mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className={`w-full px-5 py-3 pr-12 bg-[#F5F7FF] dark:bg-slate-700 rounded-full text-sm text-text-primary dark:text-white placeholder-text-muted dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary-light transition-all ${
                  errors.confirmPassword ? 'ring-2 ring-red-400' : ''
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted dark:text-slate-400 hover:text-text-primary dark:hover:text-white transition-colors"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
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
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="w-4 h-4 mt-0.5 rounded border-gray-300 text-brand-primary focus:ring-brand-primary-light"
              />
              <span className="text-sm text-text-secondary dark:text-slate-400">
                I agree to the{' '}
                <a href="#" className="text-brand-primary dark:text-blue-400 hover:text-brand-primary-light">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-brand-primary dark:text-blue-400 hover:text-brand-primary-light">
                  Privacy Policy
                </a>
              </span>
            </label>
            {errors.agreeToTerms && (
              <p className="mt-1 text-xs text-red-500">{errors.agreeToTerms}</p>
            )}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 bg-gradient-to-r from-brand-primary to-brand-primary-light text-white font-medium rounded-full shadow-button-primary hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200 dark:bg-slate-600"></div>
          <span className="text-xs text-text-muted dark:text-slate-400">or sign up with</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-slate-600"></div>
        </div>

        {/* Social Sign Up Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            type="button"
            onClick={() => handleSocialSignUp('Google')}
            className="py-3 px-4 bg-[#F5F7FF] dark:bg-slate-700 rounded-full font-medium text-sm text-text-secondary dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </button>
          <button
            type="button"
            onClick={() => handleSocialSignUp('Microsoft')}
            className="py-3 px-4 bg-[#F5F7FF] dark:bg-slate-700 rounded-full font-medium text-sm text-text-secondary dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#f25022" d="M1 1h10v10H1z"/>
              <path fill="#00a4ef" d="M13 1h10v10H13z"/>
              <path fill="#7fba00" d="M1 13h10v10H1z"/>
              <path fill="#ffb900" d="M13 13h10v10H13z"/>
            </svg>
          </button>
          <button
            type="button"
            onClick={() => handleSocialSignUp('Apple')}
            className="py-3 px-4 bg-[#F5F7FF] dark:bg-slate-700 rounded-full font-medium text-sm text-text-secondary dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-text-secondary dark:text-slate-400">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="text-brand-primary dark:text-blue-400 font-medium hover:text-brand-primary-light transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </StudentAuthLayout>
  );
};

export default SignUp;
