import React from 'react';

interface FilterState {
  search: string;
  status: string;
  category: string;
  qualityBand: string;
}

interface CourseModerationFiltersBarProps {
  value: FilterState;
  onChange: (updatedFilters: FilterState) => void;
}

const CourseModerationFiltersBar: React.FC<CourseModerationFiltersBarProps> = ({ value, onChange }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, search: e.target.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...value, status: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...value, category: e.target.value });
  };

  const handleQualityBandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...value, qualityBand: e.target.value });
  };

  const handleReset = () => {
    onChange({
      search: '',
      status: 'pending',
      category: 'all',
      qualityBand: 'all',
    });
  };

  const hasActiveFilters =
    value.search ||
    value.status !== 'pending' ||
    value.category !== 'all' ||
    value.qualityBand !== 'all';

  return (
    <div className="bg-white rounded-2xl border border-[#EDF0FB] p-4 shadow-sm">
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search Input */}
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9CA3B5]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={value.search}
              onChange={handleSearchChange}
              placeholder="Search by course title or instructor"
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E5E7EB] focus:ring-2 focus:ring-[#304DB5] focus:border-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Status Dropdown */}
        <select
          value={value.status}
          onChange={handleStatusChange}
          className="px-4 py-2 rounded-xl border border-[#E5E7EB] focus:ring-2 focus:ring-[#304DB5] focus:border-transparent outline-none text-sm font-medium text-[#5F6473] bg-white"
        >
          <option value="pending">Pending only</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="all">All statuses</option>
        </select>

        {/* Category Dropdown */}
        <select
          value={value.category}
          onChange={handleCategoryChange}
          className="px-4 py-2 rounded-xl border border-[#E5E7EB] focus:ring-2 focus:ring-[#304DB5] focus:border-transparent outline-none text-sm font-medium text-[#5F6473] bg-white"
        >
          <option value="all">All categories</option>
          <option value="design">Design</option>
          <option value="development">Development</option>
          <option value="business">Business</option>
          <option value="marketing">Marketing</option>
          <option value="personal_dev">Personal Development</option>
        </select>

        {/* Quality Band Dropdown */}
        <select
          value={value.qualityBand}
          onChange={handleQualityBandChange}
          className="px-4 py-2 rounded-xl border border-[#E5E7EB] focus:ring-2 focus:ring-[#304DB5] focus:border-transparent outline-none text-sm font-medium text-[#5F6473] bg-white"
        >
          <option value="all">All quality scores</option>
          <option value="high">Score ≥ 80</option>
          <option value="medium">Score 60-79</option>
          <option value="low">Score &lt; 60</option>
        </select>

        {/* Reset Button */}
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm font-semibold text-[#304DB5] hover:text-[#5E7BFF] transition-colors"
          >
            Reset filters
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseModerationFiltersBar;
