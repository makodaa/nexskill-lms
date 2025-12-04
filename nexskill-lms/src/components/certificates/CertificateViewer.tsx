import React from 'react';

interface CertificateViewerProps {
  certificate: {
    courseTitle: string;
    studentName: string;
    issueDate: string;
    issuerName: string;
    certificateType: string;
  };
}

const CertificateViewer: React.FC<CertificateViewerProps> = ({ certificate }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-200 p-8 md:p-12">
      {/* Certificate Container with 16:9 aspect ratio */}
      <div className="relative aspect-[16/9] bg-gradient-to-br from-[#E7F0FF] via-white to-[#F9F0FF] rounded-2xl border-4 border-[#304DB5] p-8 md:p-12 flex flex-col items-center justify-center">
        {/* Decorative border */}
        <div className="absolute inset-6 border-2 border-[#304DB5] opacity-30 rounded-xl" />
        
        {/* Content */}
        <div className="relative z-10 text-center w-full max-w-2xl">
          {/* Header */}
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#304DB5] to-[#5E7BFF] flex items-center justify-center">
              <span className="text-white font-bold text-2xl">N</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#304DB5] mb-2">
              Certificate of {certificate.certificateType}
            </h1>
            <p className="text-sm text-slate-600">This certifies that</p>
          </div>

          {/* Student Name */}
          <div className="mb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
              {certificate.studentName}
            </h2>
            <p className="text-sm text-slate-600">has successfully completed</p>
          </div>

          {/* Course Title */}
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-[#304DB5] mb-1">
              {certificate.courseTitle}
            </h3>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-6 border-t-2 border-slate-200">
            <div className="text-left">
              <div className="w-32 h-0.5 bg-slate-400 mb-2" />
              <p className="text-xs font-medium text-slate-700">Course Instructor</p>
            </div>

            <div className="text-center">
              <p className="text-sm font-semibold text-slate-900">{certificate.issueDate}</p>
              <p className="text-xs text-slate-600">Issue Date</p>
            </div>

            <div className="text-right">
              <div className="w-32 h-0.5 bg-slate-400 mb-2 ml-auto" />
              <p className="text-xs font-medium text-slate-700">{certificate.issuerName}</p>
            </div>
          </div>
        </div>

        {/* Decorative seal */}
        <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border-4 border-white shadow-lg flex items-center justify-center transform rotate-12">
          <div className="text-center">
            <svg className="w-10 h-10 text-white mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-[10px] font-bold text-white">VERIFIED</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateViewer;
