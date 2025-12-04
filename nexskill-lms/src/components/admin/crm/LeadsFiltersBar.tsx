import React from 'react';

interface Tag {
  id: string;
  name: string;
  color?: string;
}

interface LeadsFiltersBarProps {
  value: {
    search: string;
    status: string;
    selectedTagIds: string[];
    scoreBand: string;
    source: string;
  };
  tags: Tag[];
  onChange: (updatedFilters: {
    search: string;
    status: string;
    selectedTagIds: string[];
    scoreBand: string;
    source: string;
  }) => void;
}

const LeadsFiltersBar: React.FC<LeadsFiltersBarProps> = ({ value, tags, onChange }) => {
  const handleClearFilters = () => {
    onChange({
      search: '',
      status: 'all',
      selectedTagIds: [],
      scoreBand: 'all',
      source: 'all',
    });
  };

  const hasActiveFilters =
    value.search ||
    value.status !== 'all' ||
    value.selectedTagIds.length > 0 ||
    value.scoreBand !== 'all' ||
    value.source !== 'all';

  const handleTagToggle = (tagId: string) => {
    const newSelectedTagIds = value.selectedTagIds.includes(tagId)
      ? value.selectedTagIds.filter((id) => id !== tagId)
      : [...value.selectedTagIds, tagId];

    onChange({ ...value, selectedTagIds: newSelectedTagIds });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EDF0FB] shadow-sm p-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search by name, email, or tag"
            value={value.search}
            onChange={(e) => onChange({ ...value, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 text-sm border border-[#E5E7EB] rounded-full focus:outline-none focus:ring-2 focus:ring-[#304DB5]/20 focus:border-[#304DB5]"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3B5]"
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
        </div>

        {/* Status Dropdown */}
        <select
          value={value.status}
          onChange={(e) => onChange({ ...value, status: e.target.value })}
          className="text-sm border border-[#E5E7EB] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#304DB5]/20"
        >
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="engaged">Engaged</option>
          <option value="customer">Customer</option>
          <option value="closed_lost">Closed Lost</option>
        </select>

        {/* Tags Multi-Select */}
        <div className="relative">
          <button
            className="text-sm border border-[#E5E7EB] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#304DB5]/20 flex items-center gap-2"
            onClick={(e) => {
              e.currentTarget.nextElementSibling?.classList.toggle('hidden');
            }}
          >
            <span>
              Tags
              {value.selectedTagIds.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-[#304DB5] text-white text-xs rounded-full">
                  {value.selectedTagIds.length}
                </span>
              )}
            </span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="hidden absolute top-full mt-2 bg-white rounded-xl border border-[#EDF0FB] shadow-lg p-3 min-w-[200px] z-10">
            {tags.length === 0 && (
              <p className="text-xs text-[#9CA3B5] py-2">No tags available</p>
            )}
            {tags.map((tag) => (
              <label
                key={tag.id}
                className="flex items-center gap-2 py-2 px-2 hover:bg-[#F5F7FF] rounded-lg cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={value.selectedTagIds.includes(tag.id)}
                  onChange={() => handleTagToggle(tag.id)}
                  className="rounded border-[#E5E7EB] text-[#304DB5] focus:ring-[#304DB5]"
                />
                <span className="text-sm text-[#111827]">{tag.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Score Band Filter */}
        <select
          value={value.scoreBand}
          onChange={(e) => onChange({ ...value, scoreBand: e.target.value })}
          className="text-sm border border-[#E5E7EB] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#304DB5]/20"
        >
          <option value="all">All Scores</option>
          <option value="hot">Hot (80+)</option>
          <option value="warm">Warm (50–79)</option>
          <option value="cold">Cold (&lt;50)</option>
        </select>

        {/* Source Filter */}
        <select
          value={value.source}
          onChange={(e) => onChange({ ...value, source: e.target.value })}
          className="text-sm border border-[#E5E7EB] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#304DB5]/20"
        >
          <option value="all">All Sources</option>
          <option value="landing_page">Landing Pages</option>
          <option value="webinar">Webinar</option>
          <option value="manual">Manual Imports</option>
          <option value="referral">Referral</option>
        </select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-sm font-semibold text-[#304DB5] hover:text-[#5E7BFF] transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
};

export default LeadsFiltersBar;
