import React, { useState, useEffect } from 'react';

interface EmailTemplate {
  id: string;
  name: string;
  category: 'transactional' | 'marketing' | 'system';
  subject: string;
  previewText: string;
  body?: string;
  status: 'active' | 'draft' | 'archived';
  lastUpdatedAt?: string;
}

interface SmsTemplate {
  id: string;
  name: string;
  category: 'otp' | 'reminder' | 'marketing' | 'system';
  body: string;
  characterCount: number;
  status: 'active' | 'draft' | 'archived';
  lastUpdatedAt?: string;
}

interface TemplateEditorDrawerProps {
  open: boolean;
  mode: 'create' | 'edit';
  type: 'email' | 'sms';
  initialTemplate?: EmailTemplate | SmsTemplate;
  onClose: () => void;
  onSave: (templateData: EmailTemplate | SmsTemplate) => void;
}

const TemplateEditorDrawer: React.FC<TemplateEditorDrawerProps> = ({
  open,
  mode,
  type,
  initialTemplate,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<any>({
    name: '',
    category: type === 'email' ? 'transactional' : 'otp',
    status: 'active',
    subject: '',
    previewText: '',
    body: '',
  });

  useEffect(() => {
    if (initialTemplate) {
      setFormData({
        ...initialTemplate,
        body: (initialTemplate as any).body || '',
      });
    } else {
      setFormData({
        name: '',
        category: type === 'email' ? 'transactional' : 'otp',
        status: 'active',
        subject: '',
        previewText: '',
        body: '',
      });
    }
  }, [initialTemplate, type, open]);

  const calculateCharacterCount = (text: string): number => text.length;
  const calculateSegments = (charCount: number): number => {
    if (charCount === 0) return 0;
    if (charCount <= 160) return 1;
    return Math.ceil(charCount / 153);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      window.alert('Please enter a template name.');
      return;
    }

    if (type === 'email') {
      if (!formData.subject.trim()) {
        window.alert('Please enter an email subject.');
        return;
      }

      const emailTemplate: EmailTemplate = {
        id: initialTemplate?.id || `email-${Date.now()}`,
        name: formData.name,
        category: formData.category,
        subject: formData.subject,
        previewText: formData.previewText,
        body: formData.body,
        status: formData.status,
        lastUpdatedAt: new Date().toLocaleDateString(),
      } as EmailTemplate;

      onSave(emailTemplate);
    } else {
      if (!formData.body.trim()) {
        window.alert('Please enter SMS message content.');
        return;
      }

      const smsTemplate: SmsTemplate = {
        id: initialTemplate?.id || `sms-${Date.now()}`,
        name: formData.name,
        category: formData.category,
        body: formData.body,
        characterCount: calculateCharacterCount(formData.body),
        status: formData.status,
        lastUpdatedAt: new Date().toLocaleDateString(),
      } as SmsTemplate;

      onSave(smsTemplate);
    }

    onClose();
  };

  if (!open) return null;

  const charCount = type === 'sms' ? calculateCharacterCount(formData.body) : 0;
  const segments = type === 'sms' ? calculateSegments(charCount) : 0;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#EDF0FB] p-6 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#111827]">
                {mode === 'create' ? 'Create' : 'Edit'}{' '}
                {type === 'email' ? 'Email' : 'SMS'} Template
              </h2>
              <p className="text-sm text-[#9CA3B5] mt-1">
                {type === 'email'
                  ? 'Configure email notification template'
                  : 'Configure SMS notification template'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F5F7FF] hover:bg-[#EDF0FB] flex items-center justify-center text-[#5F6473] transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Template Name */}
          <div>
            <label className="block text-sm font-semibold text-[#111827] mb-2">
              Template Name
            </label>
            <input
              type="text"
              placeholder={`e.g., ${type === 'email' ? 'Welcome Email' : 'OTP Verification'}`}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#304DB5]/20"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-[#111827] mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#304DB5]/20"
            >
              {type === 'email' ? (
                <>
                  <option value="transactional">Transactional</option>
                  <option value="marketing">Marketing</option>
                  <option value="system">System</option>
                </>
              ) : (
                <>
                  <option value="otp">OTP</option>
                  <option value="reminder">Reminder</option>
                  <option value="marketing">Marketing</option>
                  <option value="system">System</option>
                </>
              )}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-[#111827] mb-2">Status</label>
            <div className="flex gap-3">
              {(['active', 'draft', 'archived'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFormData({ ...formData, status })}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold border transition-all ${
                    formData.status === status
                      ? 'bg-[#304DB5] text-white border-[#304DB5]'
                      : 'bg-white text-[#5F6473] border-[#E5E7EB] hover:border-[#304DB5]'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Email-specific fields */}
          {type === 'email' && (
            <>
              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="e.g., Welcome to NexSkill!"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#304DB5]/20"
                />
              </div>

              {/* Preview Text */}
              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-2">
                  Preview Text
                </label>
                <input
                  type="text"
                  placeholder="e.g., Get started with your learning journey"
                  value={formData.previewText}
                  onChange={(e) => setFormData({ ...formData, previewText: e.target.value })}
                  className="w-full px-4 py-3 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#304DB5]/20"
                />
              </div>

              {/* Body Editor */}
              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-2">
                  Email Body
                </label>
                <textarea
                  placeholder="Enter email body. Use {{first_name}}, {{course_name}}, {{link}} for dynamic content."
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  rows={12}
                  className="w-full px-4 py-3 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#304DB5]/20 font-mono resize-none"
                />
                <p className="text-xs text-[#9CA3B5] mt-2">
                  Variables: {'{'}first_name{'}'}, {'{'}last_name{'}'}, {'{'}course_name{'}'}, {'{'}link{'}'}
                </p>
              </div>

              {/* Preview */}
              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-2">Preview</label>
                <div className="border border-[#EDF0FB] rounded-xl p-4 bg-gradient-to-br from-[#F5F7FF] to-white">
                  <div className="text-xs text-[#9CA3B5] mb-2">From: notifications@nexskill.com</div>
                  <div className="text-sm font-bold text-[#111827] mb-1">
                    {formData.subject || 'Subject line will appear here'}
                  </div>
                  <div className="text-xs text-[#5F6473]">
                    {formData.previewText || 'Preview text will appear here'}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* SMS-specific fields */}
          {type === 'sms' && (
            <>
              {/* Body */}
              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-2">
                  Message Content
                </label>
                <textarea
                  placeholder="Enter SMS message. Use {{first_name}}, {{code}}, {{link}} for dynamic content."
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  maxLength={1600}
                  rows={6}
                  className="w-full px-4 py-3 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#304DB5]/20 font-mono resize-none"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-[#9CA3B5]">
                    Variables: {'{'}first_name{'}'}, {'{'}code{'}'}, {'{'}link{'}'}
                  </p>
                  <p className="text-xs font-semibold text-[#5F6473]">
                    {charCount} characters · {segments} segment{segments !== 1 ? 's' : ''}
                  </p>
                </div>
                {charCount > 160 && (
                  <p className="text-xs text-[#D97706] mt-1">
                    ⚠️ Messages over 160 characters are split into multiple segments and may increase costs.
                  </p>
                )}
              </div>

              {/* Preview */}
              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-2">Preview</label>
                <div className="border border-[#EDF0FB] rounded-2xl p-4 bg-gradient-to-br from-[#F5F7FF] to-white">
                  <div className="bg-[#304DB5] text-white text-sm p-3 rounded-xl inline-block max-w-[80%] font-mono">
                    {formData.body || 'Your SMS message will appear here'}
                  </div>
                  <div className="text-xs text-[#9CA3B5] mt-2">SMS Preview</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-[#EDF0FB] p-6">
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 py-3 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white text-sm font-semibold rounded-full hover:shadow-md transition-shadow"
            >
              Save Template
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 text-sm font-semibold text-[#5F6473] hover:text-[#111827] border border-[#E5E7EB] rounded-full hover:border-[#304DB5] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateEditorDrawer;
