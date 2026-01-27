import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StudentAuthLayout from '../../layouts/StudentAuthLayout';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
// Removed unused BrandLogo import

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { getDefaultRoute } = useUser();
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    nameExtension: '',
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
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
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
          'STUDENT',
          formData.middleName,
          formData.nameExtension
        );
        if (error) {
          setSubmitError(error.message);
          return;
        }
        // Fix: Await the promise before navigating
        const route = await getDefaultRoute();
        navigate(route);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An unexpected error occurred during signup';
        setSubmitError(message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSocialSignUp = (provider: string) => {
    console.log(`Signing up with ${provider}`);
    setSubmitError(`Social signup with ${provider} is not yet configured.`);
  };

  return (
    <StudentAuthLayout maxWidth="large">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h1>
          <p className="text-gray-500 dark:text-gray-400">Student Application</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          {submitError && (
            <div className="p-3 bg-red-100 border border-red-200 text-red-700 text-sm rounded-lg">
              {submitError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 bg-gray-50 border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all`}
                placeholder="John"
              />
              {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Middle</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all`}
                placeholder="M."
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 bg-gray-50 border ${errors.lastName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all`}
                placeholder="Doe"
              />
              {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Ext</label>
              <input
                type="text"
                name="nameExtension"
                value={formData.nameExtension}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all`}
                placeholder="Jr."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-gray-50 border ${errors.username ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all`}
              placeholder="johndoe123"
            />
            {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all`}
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Confirm</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all`}
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>


          <div className="flex items-center">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
              I agree to the <a href="#" className="text-brand-primary hover:underline">Terms of Service</a>
            </label>
          </div>
          {errors.agreeToTerms && <p className="text-xs text-red-500">{errors.agreeToTerms}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-brand-primary/30 transition-all transform hover:-translate-y-0.5"
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200 dark:bg-slate-600"></div>
          <span className="text-xs text-text-muted dark:text-slate-400">or sign up with</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-slate-600"></div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            type="button"
            onClick={() => handleSocialSignUp('Google')}
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
            onClick={() => handleSocialSignUp('Microsoft')}
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
            onClick={() => handleSocialSignUp('Apple')}
            className="py-3 px-4 bg-[#F5F7FF] dark:bg-slate-700 rounded-full font-medium text-sm text-text-secondary dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
          >
            <span className="sr-only">Apple</span>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Are you an expert? <Link to="/coach/apply" className="text-brand-primary font-semibold hover:underline">Become a Coach</Link>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account? <Link to="/login" className="text-brand-primary hover:underline font-medium">Log in</Link>
          </p>
        </div>
      </div>
    </StudentAuthLayout>
  );
};

export default SignUp;