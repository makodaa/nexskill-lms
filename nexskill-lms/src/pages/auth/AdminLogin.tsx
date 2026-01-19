import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();
  const { getDefaultRoute } = useUser();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const { error: signInError } = await signIn(formData.email, formData.password);
      
      if (signInError) {
        setError(signInError.message);
        setIsLoading(false);
        return;
      }

      // Small delay to ensure profile is fetched
      setTimeout(() => {
        navigate(getDefaultRoute());
      }, 100);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#304DB5] via-[#5E7BFF] to-[#7C3AED] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#304DB5] to-[#5E7BFF] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">
              🛡️
            </div>
            <h1 className="text-3xl font-bold text-[#111827] mb-2">Admin Access</h1>
            <p className="text-[#5F6473]">NexSkill Platform Administration</p>
          </div>

          {/* Security Notice */}
          <div className="mb-6 p-4 bg-[#FEF3C7] border border-[#FCD34D] rounded-xl">
            <div className="flex gap-3">
              <span className="text-xl">⚠️</span>
              <div>
                <p className="text-sm font-semibold text-[#92400E] mb-1">Restricted Area</p>
                <p className="text-xs text-[#92400E]">
                  This login is for authorized platform administrators only. All access is logged and monitored.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {error && (
              <div className="p-3 bg-red-100 border border-red-200 text-red-700 text-sm rounded-lg">
                {error}
              </div>
            )}
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Admin Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@nexskill.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:ring-2 focus:ring-[#304DB5] focus:border-transparent outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:ring-2 focus:ring-[#304DB5] focus:border-transparent outline-none"
              />
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#304DB5] border-[#E5E7EB] rounded focus:ring-[#304DB5]"
                />
                <span className="text-sm text-[#5F6473]">Remember me</span>
              </label>
              <Link
                to="/admin/forgot-password"
                className="text-sm font-semibold text-[#304DB5] hover:text-[#5E7BFF]"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-full font-semibold transition-all ${
                isLoading
                  ? 'bg-[#E5E7EB] text-[#9CA3B5] cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white hover:shadow-lg'
              }`}
            >
              {isLoading ? 'Authenticating...' : 'Sign In to Admin Console'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 border-t border-[#E5E7EB]" />
            <span className="text-sm text-[#9CA3B5]">Other Portals</span>
            <div className="flex-1 border-t border-[#E5E7EB]" />
          </div>

          {/* Links to Other Portals */}
          <div className="space-y-3">
            <Link
              to="/login"
              className="block w-full py-3 text-center bg-[#F5F7FF] text-[#304DB5] font-semibold rounded-full hover:bg-[#EDF0FB] transition-colors"
            >
              👨‍🎓 Student Portal
            </Link>
            <Link
              to="/login"
              className="block w-full py-3 text-center bg-[#F5F7FF] text-[#304DB5] font-semibold rounded-full hover:bg-[#EDF0FB] transition-colors"
            >
              🎓 Coach Portal
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/80 text-sm mt-6">
          Protected by enterprise-grade security
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
