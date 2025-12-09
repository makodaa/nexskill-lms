import { useState } from 'react';
import { Award, Send, CheckCircle, Eye, RefreshCw, Mail, X, Download, ExternalLink, AlertTriangle, Clock, User } from 'lucide-react';

interface CertificateRequest {
  id: string;
  studentName: string;
  studentEmail: string;
  courseName: string;
  completedDate: string;
  issueReason: string;
  requestDate: string;
  status: 'pending' | 'resent' | 'failed' | 'regenerating';
}

interface CertificatesListProps {
  onResend?: (certId: string, email: string) => void;
  onRegenerate?: (certId: string) => void;
}

const CertificatesList = ({ onResend, onRegenerate }: CertificatesListProps) => {
  const [requests, setRequests] = useState<CertificateRequest[]>([
    { id: 'CERT-501', studentName: 'Sarah Chen', studentEmail: 'sarah.chen@email.com', courseName: 'Advanced React Development', completedDate: 'Oct 15, 2024', issueReason: 'Email not received', requestDate: '2 hours ago', status: 'pending' },
    { id: 'CERT-502', studentName: 'Michael Brown', studentEmail: 'michael.b@email.com', courseName: 'Python for Data Science', completedDate: 'Nov 2, 2024', issueReason: 'Wrong email address', requestDate: '5 hours ago', status: 'resent' },
    { id: 'CERT-503', studentName: 'Emma Wilson', studentEmail: 'emma.w@email.com', courseName: 'Digital Marketing Mastery', completedDate: 'Nov 20, 2024', issueReason: 'Certificate not generated', requestDate: '1 day ago', status: 'pending' },
    { id: 'CERT-504', studentName: 'James Lee', studentEmail: 'james.lee@email.com', courseName: 'UI/UX Design Fundamentals', completedDate: 'Sep 30, 2024', issueReason: 'Lost certificate', requestDate: '3 days ago', status: 'resent' },
  ]);

  const [toast, setToast] = useState<string | null>(null);
  const [previewModal, setPreviewModal] = useState<CertificateRequest | null>(null);
  const [resendModal, setResendModal] = useState<CertificateRequest | null>(null);
  const [regenerateModal, setRegenerateModal] = useState<CertificateRequest | null>(null);
  const [emailOverride, setEmailOverride] = useState('');
  const [regenerateReason, setRegenerateReason] = useState('');

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleResend = (request: CertificateRequest, email: string) => {
    onResend?.(request.id, email);
    setRequests(prev => prev.map(req => 
      req.id === request.id ? { ...req, status: 'resent' as const } : req
    ));
    showToast(`✓ Certificate resent to ${email}`);
    setResendModal(null);
    setEmailOverride('');
  };

  const handleRegenerate = (request: CertificateRequest) => {
    onRegenerate?.(request.id);
    setRequests(prev => prev.map(req => 
      req.id === request.id ? { ...req, status: 'regenerating' as const } : req
    ));
    showToast(`⏳ Regenerating certificate for ${request.studentName}...`);
    setRegenerateModal(null);
    setRegenerateReason('');
    
    // Simulate regeneration completion
    setTimeout(() => {
      setRequests(prev => prev.map(req => 
        req.id === request.id ? { ...req, status: 'pending' as const } : req
      ));
      showToast(`✓ Certificate regenerated for ${request.studentName}`);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'resent': return 'bg-green-100 text-green-700 border-green-300';
      case 'failed': return 'bg-red-100 text-red-700 border-red-300';
      case 'regenerating': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Certificate Requests</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Award className="w-5 h-5" />
          <span>{requests.filter(r => r.status === 'pending').length} Pending</span>
        </div>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="bg-gray-50 rounded-2xl p-5 hover:bg-blue-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-sm font-semibold text-gray-700">{request.id}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(request.status)}`}>
                    {request.status.toUpperCase()}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{request.studentName}</h4>
                <p className="text-sm text-gray-700 mb-2">{request.courseName}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Completed:</span>
                    <span className="ml-2 font-medium text-gray-900">{request.completedDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Requested:</span>
                    <span className="ml-2 font-medium text-gray-900">{request.requestDate}</span>
                  </div>
                </div>
                <div className="mt-2 p-3 bg-white rounded-xl">
                  <span className="text-xs text-gray-600 font-semibold">Issue Reason:</span>
                  <p className="text-sm text-gray-900 mt-1">{request.issueReason}</p>
                </div>
              </div>
              <div className="ml-4 flex flex-col gap-2">
                  <button
                    onClick={() => setPreviewModal(request)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  {request.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          setResendModal(request);
                          setEmailOverride(request.studentEmail);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                      >
                        <Send className="w-4 h-4" />
                        Resend
                      </button>
                      <button
                        onClick={() => setRegenerateModal(request)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-orange-200 text-orange-600 rounded-xl font-medium hover:bg-orange-50 transition-all"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Regenerate
                      </button>
                    </>
                  )}
                  {request.status === 'resent' && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Resent
                    </div>
                  )}
                  {request.status === 'regenerating' && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-medium">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Regenerating...
                    </div>
                  )}
                </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> Resending certificates triggers an automated email to the student with a download link. Ensure the email address is correct before resending.
        </p>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-xl z-50 animate-fade-in">
          {toast}
        </div>
      )}

      {/* Certificate Preview Modal */}
      {previewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setPreviewModal(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Certificate Preview</h3>
              <button onClick={() => setPreviewModal(null)} className="p-2 hover:bg-gray-100 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Mock Preview */}
            <div className="p-6">
              <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-4 border-double border-blue-200 rounded-2xl p-8 text-center">
                <Award className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Certificate of Completion</h2>
                <p className="text-gray-600 mb-4">This is to certify that</p>
                <p className="text-2xl font-bold text-blue-700 mb-4">{previewModal.studentName}</p>
                <p className="text-gray-600 mb-4">has successfully completed the course</p>
                <p className="text-xl font-semibold text-gray-900 mb-4">{previewModal.courseName}</p>
                <p className="text-gray-600">on {previewModal.completedDate}</p>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 font-mono">Certificate ID: {previewModal.id}</p>
                </div>
              </div>

              {/* Student Info */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <User className="w-4 h-4" /> Student
                  </span>
                  <p className="font-semibold text-gray-900">{previewModal.studentName}</p>
                  <p className="text-sm text-gray-600">{previewModal.studentEmail}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Request Info
                  </span>
                  <p className="font-semibold text-gray-900">Requested {previewModal.requestDate}</p>
                  <p className="text-sm text-gray-600">{previewModal.issueReason}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-3xl flex gap-3">
              <button
                onClick={() => {
                  showToast('✓ Certificate downloaded');
                }}
                className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
              <button
                onClick={() => {
                  showToast('✓ Opened in new tab');
                }}
                className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" /> Open Full View
              </button>
              {previewModal.status === 'pending' && (
                <button
                  onClick={() => {
                    setPreviewModal(null);
                    setResendModal(previewModal);
                    setEmailOverride(previewModal.studentEmail);
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Resend
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Resend Confirmation Modal */}
      {resendModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setResendModal(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Resend Certificate</h3>
              <button onClick={() => setResendModal(null)} className="p-2 hover:bg-gray-100 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4 p-4 bg-blue-50 rounded-2xl">
              <p className="font-semibold text-gray-900">{resendModal.studentName}</p>
              <p className="text-sm text-gray-600">{resendModal.courseName}</p>
            </div>

            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-600 block mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={emailOverride}
                onChange={(e) => setEmailOverride(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-2">Original email: {resendModal.studentEmail}</p>
            </div>

            <div className="mb-6 p-4 bg-amber-50 rounded-2xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                The certificate will be sent to the email address above. Please verify it's correct before sending.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setResendModal(null)}
                className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleResend(resendModal, emailOverride)}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Regenerate Confirmation Modal */}
      {regenerateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setRegenerateModal(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Regenerate Certificate</h3>
              <button onClick={() => setRegenerateModal(null)} className="p-2 hover:bg-gray-100 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4 p-4 bg-orange-50 rounded-2xl">
              <p className="font-semibold text-gray-900">{regenerateModal.studentName}</p>
              <p className="text-sm text-gray-600">{regenerateModal.courseName}</p>
              <p className="text-sm text-orange-600 mt-2 font-medium">Original Issue: {regenerateModal.issueReason}</p>
            </div>

            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-600 block mb-2">
                Regeneration Reason (Optional)
              </label>
              <textarea
                value={regenerateReason}
                onChange={(e) => setRegenerateReason(e.target.value)}
                placeholder="Enter reason for regeneration..."
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>

            <div className="mb-6 p-4 bg-amber-50 rounded-2xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                This will generate a new certificate PDF. The old certificate link will be invalidated.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setRegenerateModal(null)}
                className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRegenerate(regenerateModal)}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-2xl font-semibold hover:shadow-lg flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Regenerate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatesList;
