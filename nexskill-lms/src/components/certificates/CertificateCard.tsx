import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlockchainVerificationBadge from './BlockchainVerificationBadge';

interface Certificate {
  id: string;
  courseTitle: string;
  issueDate: string;
  certificateType: string;
  grade?: number;
  score?: number;
  blockchainHash?: string;
}

interface CertificateCardProps {
  certificate: Certificate;
  onView?: (id: string) => void;
  onDownload?: (id: string) => void;
  onShare?: (id: string) => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  onView,
  onDownload,
  onShare,
}) => {
  const navigate = useNavigate();

  const handleView = () => {
    if (onView) {
      onView(certificate.id);
    } else {
      navigate(`/student/certificates/${certificate.id}`);
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDownload) {
      onDownload(certificate.id);
    } else {
      console.log('Download certificate:', certificate.id);
      alert('Download started! (Simulated)');
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare) {
      onShare(certificate.id);
    } else {
      console.log('Share certificate:', certificate.id);
      alert('Share dialog opened! (Simulated)');
    }
  };

  const getTypeBadgeColor = (type: string) => {
    if (type.includes('Course')) return 'bg-blue-100 text-blue-700';
    if (type.includes('Specialization')) return 'bg-purple-100 text-purple-700';
    if (type.includes('Coaching')) return 'bg-green-100 text-green-700';
    return 'bg-slate-100 text-slate-700';
  };

  return (
    <div
      onClick={handleView}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-all cursor-pointer group"
    >
      {/* Certificate Thumbnail */}
      <div className="mb-4 aspect-[16/11] rounded-xl bg-gradient-to-br from-[#E7F0FF] via-[#F9F0FF] to-[#E3F4FF] border-2 border-[#304DB5] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-4 border-2 border-[#304DB5] opacity-20 rounded-lg" />
        <div className="text-center z-10">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#304DB5] to-[#5E7BFF] flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <div className="text-xs font-bold text-[#304DB5] opacity-50">CERTIFICATE</div>
        </div>
      </div>

      {/* Certificate Info */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#304DB5] transition-colors">
          {certificate.courseTitle}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeBadgeColor(certificate.certificateType)}`}>
            {certificate.certificateType}
          </span>
          {certificate.score && (
            <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
              Score: {certificate.score}%
            </span>
          )}
          {certificate.grade && (
            <span className="px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full">
              Grade: {certificate.grade}
            </span>
          )}
        </div>
        <p className="text-sm text-slate-600">Issued on {certificate.issueDate}</p>
      </div>

      {/* Blockchain Badge */}
      {certificate.blockchainHash && (
        <div className="mb-4">
          <BlockchainVerificationBadge status="verified" hash={certificate.blockchainHash} />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-slate-200">
        <button
          onClick={handleView}
          className="flex-1 py-2 px-4 text-sm font-medium text-[#304DB5] hover:text-white hover:bg-gradient-to-r hover:from-[#304DB5] hover:to-[#5E7BFF] rounded-full border-2 border-[#304DB5] transition-all"
        >
          View certificate
        </button>
        <button
          onClick={handleDownload}
          className="p-2 text-slate-600 hover:text-[#304DB5] hover:bg-blue-50 rounded-full transition-all"
          title="Download"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </button>
        <button
          onClick={handleShare}
          className="p-2 text-slate-600 hover:text-[#304DB5] hover:bg-blue-50 rounded-full transition-all"
          title="Share"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CertificateCard;
