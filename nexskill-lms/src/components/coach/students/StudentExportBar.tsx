import React, { useState } from 'react';

interface ExportPayload {
  type: 'all-fields' | 'progress-only' | 'scores-only';
  format: 'csv' | 'xlsx';
}

interface StudentExportBarProps {
  onExport: (payload: ExportPayload) => void;
}

const StudentExportBar: React.FC<StudentExportBarProps> = ({ onExport }) => {
  const [exportType, setExportType] = useState<ExportPayload['type']>('all-fields');
  const [exportFormat, setExportFormat] = useState<ExportPayload['format']>('csv');

  const handleExport = () => {
    onExport({ type: exportType, format: exportFormat });
  };

  return (
    <div className="flex items-center gap-3 bg-white rounded-xl border border-[#EDF0FB] px-4 py-2 shadow-sm">
      <span className="text-sm font-medium text-[#5F6473]">Export data:</span>

      {/* Export Type Dropdown */}
      <select
        value={exportType}
        onChange={(e) => setExportType(e.target.value as ExportPayload['type'])}
        className="text-sm px-3 py-1.5 rounded-lg border border-[#EDF0FB] focus:outline-none focus:ring-2 focus:ring-[#304DB5] focus:border-transparent bg-white text-[#111827]"
      >
        <option value="all-fields">All fields</option>
        <option value="progress-only">Progress only</option>
        <option value="scores-only">Scores only</option>
      </select>

      {/* Format Selector */}
      <div className="flex gap-1 bg-[#F5F7FF] rounded-lg p-1">
        <button
          onClick={() => setExportFormat('csv')}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
            exportFormat === 'csv'
              ? 'bg-white text-[#304DB5] shadow-sm'
              : 'text-[#5F6473] hover:text-[#304DB5]'
          }`}
        >
          CSV
        </button>
        <button
          onClick={() => setExportFormat('xlsx')}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
            exportFormat === 'xlsx'
              ? 'bg-white text-[#304DB5] shadow-sm'
              : 'text-[#5F6473] hover:text-[#304DB5]'
          }`}
        >
          XLSX
        </button>
      </div>

      {/* Export Button */}
      <button
        onClick={handleExport}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white text-sm font-semibold rounded-full hover:shadow-md transition-all"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Export
      </button>
    </div>
  );
};

export default StudentExportBar;
