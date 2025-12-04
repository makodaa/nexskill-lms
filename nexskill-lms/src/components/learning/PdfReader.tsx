import React, { useState } from 'react';

interface PdfReaderProps {
  pdf: {
    title: string;
    fileName: string;
    totalPages: number;
  };
}

const PdfReader: React.FC<PdfReaderProps> = ({ pdf }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(pdf.totalPages, prev + 1));
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(200, prev + 25));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(50, prev - 25));
  };

  return (
    <div className="bg-white rounded-3xl shadow-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#EDF0FB]">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📄</span>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">{pdf.fileName}</h3>
            <p className="text-xs text-text-muted">
              Page {currentPage} of {pdf.totalPages}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 50}
            className="px-3 py-1.5 bg-[#F5F7FF] rounded-full text-xs font-medium text-text-secondary hover:bg-brand-primary-soft hover:text-brand-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            −
          </button>
          <span className="text-xs text-text-secondary min-w-[50px] text-center">{zoom}%</span>
          <button
            onClick={handleZoomIn}
            disabled={zoom >= 200}
            className="px-3 py-1.5 bg-[#F5F7FF] rounded-full text-xs font-medium text-text-secondary hover:bg-brand-primary-soft hover:text-brand-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>

      {/* PDF Preview Area */}
      <div className="bg-gray-100 p-8 min-h-[600px] flex items-center justify-center">
        <div
          className="bg-white shadow-xl rounded-lg p-12 max-w-3xl w-full"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
        >
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3 mt-8"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-11/12"></div>
            <div className="text-center mt-12 text-gray-400 text-sm">
              PDF Preview Placeholder
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-center gap-4 p-4 border-t border-[#EDF0FB]">
        <button
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          className="px-4 py-2 bg-[#F5F7FF] rounded-full text-sm font-medium text-text-secondary hover:bg-brand-primary-soft hover:text-brand-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        <span className="text-sm text-text-secondary">
          Page {currentPage} / {pdf.totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= pdf.totalPages}
          className="px-4 py-2 bg-[#F5F7FF] rounded-full text-sm font-medium text-text-secondary hover:bg-brand-primary-soft hover:text-brand-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default PdfReader;
