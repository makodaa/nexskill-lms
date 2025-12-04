import React, { useState, useEffect } from 'react';

interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  status: 'active' | 'banned' | 'pending';
  roles: string[];
  organizationId?: string;
}

interface Organization {
  id: string;
  name: string;
}

interface UserFormDrawerProps {
  open: boolean;
  mode: 'create' | 'edit';
  initialUser?: User;
  organizations: Organization[];
  onClose: () => void;
  onSave: (userData: User) => void;
}

const UserFormDrawer: React.FC<UserFormDrawerProps> = ({
  open,
  mode,
  initialUser,
  organizations,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    status: 'active',
    roles: ['student'],
    organizationId: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && initialUser) {
        setFormData(initialUser);
      } else {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          status: 'active',
          roles: ['student'],
          organizationId: '',
        });
      }
      setErrors({});
    }
  }, [open, mode, initialUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleRoleToggle = (role: string) => {
    setFormData((prev) => {
      const roles = prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role];
      return { ...prev, roles };
    });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.roles.length === 0) {
      newErrors.roles = 'At least one role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
      console.log(`User ${mode === 'create' ? 'created' : 'updated'}:`, formData);
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#EDF0FB] flex items-center justify-between bg-gradient-to-r from-[#F5F7FF] to-white">
            <div>
              <h2 className="text-2xl font-bold text-[#111827]">
                {mode === 'create' ? 'Create User' : 'Edit User'}
              </h2>
              <p className="text-sm text-[#5F6473] mt-1">
                {mode === 'create'
                  ? 'Add a new user to the platform'
                  : 'Update user information and roles'}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-[#F5F7FF] rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-[#5F6473]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 px-6 py-6 space-y-5 overflow-y-auto">
            {/* First Name */}
            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                First Name <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.firstName ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                } focus:ring-2 focus:ring-[#304DB5] focus:border-transparent outline-none`}
              />
              {errors.firstName && (
                <p className="text-xs text-[#DC2626] mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Last Name <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.lastName ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                } focus:ring-2 focus:ring-[#304DB5] focus:border-transparent outline-none`}
              />
              {errors.lastName && (
                <p className="text-xs text-[#DC2626] mt-1">{errors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Email <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.email ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                } focus:ring-2 focus:ring-[#304DB5] focus:border-transparent outline-none`}
              />
              {errors.email && (
                <p className="text-xs text-[#DC2626] mt-1">{errors.email}</p>
              )}
            </div>

            {/* Roles */}
            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-3">
                Roles <span className="text-[#DC2626]">*</span>
              </label>
              <div className="space-y-2">
                {['student', 'coach', 'admin', 'org_admin'].map((role) => (
                  <label
                    key={role}
                    className="flex items-center gap-3 p-3 rounded-xl border border-[#E5E7EB] hover:bg-[#F5F7FF] cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.roles.includes(role)}
                      onChange={() => handleRoleToggle(role)}
                      className="w-4 h-4 text-[#304DB5] border-[#E5E7EB] rounded focus:ring-[#304DB5]"
                    />
                    <span className="text-sm font-medium text-[#111827] capitalize">
                      {role.replace('_', ' ')}
                    </span>
                  </label>
                ))}
              </div>
              {errors.roles && (
                <p className="text-xs text-[#DC2626] mt-1">{errors.roles}</p>
              )}
            </div>

            {/* Organization */}
            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Organization
              </label>
              <select
                name="organizationId"
                value={formData.organizationId || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:ring-2 focus:ring-[#304DB5] focus:border-transparent outline-none"
              >
                <option value="">Individual</option>
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:ring-2 focus:ring-[#304DB5] focus:border-transparent outline-none"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="banned">Banned</option>
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-[#EDF0FB] bg-[#F9FAFB] flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white border border-[#E5E7EB] text-[#5F6473] font-semibold rounded-full hover:bg-[#F9FAFB] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white font-semibold rounded-full hover:shadow-lg transition-all"
            >
              {mode === 'create' ? 'Create User' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserFormDrawer;
