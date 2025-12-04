import React from 'react';

interface Lead {
  id: string;
  name: string;
  email: string;
  source: string;
  status: 'new' | 'engaged' | 'customer' | 'closed_lost';
  tags: string[];
  score: number;
  owner?: string;
  createdAt: string;
  lastActivityAt: string;
}

interface Tag {
  id: string;
  name: string;
  color?: string;
}

interface LeadsDatabaseTableProps {
  leads: Lead[];
  tags: Tag[];
  onSelectLead: (leadId: string) => void;
  onEditLeadTags: (leadId: string) => void;
  onAssignOwner?: (leadId: string) => void;
}

const LeadsDatabaseTable: React.FC<LeadsDatabaseTableProps> = ({
  leads,
  tags,
  onSelectLead,
  onEditLeadTags,
  onAssignOwner,
}) => {
  const getStatusConfig = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return {
          label: 'New',
          bg: 'bg-[#DBEAFE]',
          text: 'text-[#1E40AF]',
        };
      case 'engaged':
        return {
          label: 'Engaged',
          bg: 'bg-[#D1FAE5]',
          text: 'text-[#047857]',
        };
      case 'customer':
        return {
          label: 'Customer',
          bg: 'bg-[#E0E7FF]',
          text: 'text-[#3730A3]',
        };
      case 'closed_lost':
        return {
          label: 'Closed Lost',
          bg: 'bg-[#F3F4F6]',
          text: 'text-[#6B7280]',
        };
    }
  };

  const getScoreBandConfig = (score: number) => {
    if (score >= 80) {
      return {
        label: 'Hot',
        color: 'text-[#059669]',
        bg: 'bg-[#D1FAE5]',
      };
    } else if (score >= 50) {
      return {
        label: 'Warm',
        color: 'text-[#D97706]',
        bg: 'bg-[#FEF3C7]',
      };
    } else {
      return {
        label: 'Cold',
        color: 'text-[#DC2626]',
        bg: 'bg-[#FEE2E2]',
      };
    }
  };

  const getTagColor = (tagId: string) => {
    const tag = tags.find((t) => t.id === tagId);
    return tag?.color || '#304DB5';
  };

  const getTagName = (tagId: string) => {
    const tag = tags.find((t) => t.id === tagId);
    return tag?.name || tagId;
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EDF0FB] shadow-md">
      {/* Header */}
      <div className="p-6 border-b border-[#EDF0FB]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#111827]">Leads Database</h2>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F5F7FF] text-[#304DB5]">
            Showing {leads.length} leads
          </span>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F5F7FF]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5F6473] uppercase">
                Lead
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5F6473] uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5F6473] uppercase">
                Score
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5F6473] uppercase">
                Tags
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5F6473] uppercase">
                Source
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5F6473] uppercase">
                Owner
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5F6473] uppercase">
                Activity
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5F6473] uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDF0FB]">
            {leads.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center">
                  <div className="text-5xl mb-3">👥</div>
                  <p className="text-sm font-semibold text-[#111827] mb-1">No leads found</p>
                  <p className="text-xs text-[#9CA3B5]">Leads will appear here</p>
                </td>
              </tr>
            )}
            {leads.map((lead) => {
              const statusConfig = getStatusConfig(lead.status);
              const scoreBandConfig = getScoreBandConfig(lead.score);

              return (
                <tr
                  key={lead.id}
                  className="hover:bg-[#F5F7FF] transition-colors cursor-pointer"
                  onClick={() => onSelectLead(lead.id)}
                >
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-[#111827]">{lead.name}</div>
                    <div className="text-xs text-[#9CA3B5]">{lead.email}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}
                    >
                      {statusConfig.label}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold ${scoreBandConfig.color}`}>
                        {lead.score}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${scoreBandConfig.bg} ${scoreBandConfig.color}`}
                      >
                        {scoreBandConfig.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {lead.tags.length === 0 && (
                        <span className="text-xs text-[#9CA3B5]">No tags</span>
                      )}
                      {lead.tags.slice(0, 2).map((tagId) => (
                        <span
                          key={tagId}
                          className="px-2 py-0.5 rounded-full text-xs font-semibold text-white"
                          style={{ backgroundColor: getTagColor(tagId) }}
                        >
                          {getTagName(tagId)}
                        </span>
                      ))}
                      {lead.tags.length > 2 && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#F3F4F6] text-[#6B7280]">
                          +{lead.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-[#5F6473]">{lead.source}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-[#5F6473]">{lead.owner || '—'}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-[#5F6473]">
                      {getRelativeTime(lead.lastActivityAt)}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditLeadTags(lead.id);
                        }}
                        className="text-xs font-semibold text-[#304DB5] hover:text-[#5E7BFF] transition-colors"
                      >
                        Tags
                      </button>
                      {onAssignOwner && (
                        <>
                          <span className="text-[#E5E7EB]">|</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAssignOwner(lead.id);
                            }}
                            className="text-xs font-semibold text-[#304DB5] hover:text-[#5E7BFF] transition-colors"
                          >
                            Assign
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-[#EDF0FB]">
        {leads.length === 0 && (
          <div className="px-4 py-12 text-center">
            <div className="text-5xl mb-3">👥</div>
            <p className="text-sm font-semibold text-[#111827] mb-1">No leads found</p>
            <p className="text-xs text-[#9CA3B5]">Leads will appear here</p>
          </div>
        )}
        {leads.map((lead) => {
          const statusConfig = getStatusConfig(lead.status);
          const scoreBandConfig = getScoreBandConfig(lead.score);

          return (
            <div
              key={lead.id}
              className="p-4 cursor-pointer"
              onClick={() => onSelectLead(lead.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-sm font-bold text-[#111827] mb-1">{lead.name}</div>
                  <div className="text-xs text-[#9CA3B5]">{lead.email}</div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}
                >
                  {statusConfig.label}
                </span>
              </div>

              {/* Score */}
              <div className="mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#9CA3B5]">Score:</span>
                  <span className={`text-lg font-bold ${scoreBandConfig.color}`}>
                    {lead.score}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${scoreBandConfig.bg} ${scoreBandConfig.color}`}
                  >
                    {scoreBandConfig.label}
                  </span>
                </div>
              </div>

              {/* Tags */}
              {lead.tags.length > 0 && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {lead.tags.map((tagId) => (
                      <span
                        key={tagId}
                        className="px-2 py-0.5 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: getTagColor(tagId) }}
                      >
                        {getTagName(tagId)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                <div>
                  <span className="text-[#9CA3B5]">Source:</span>
                  <div className="text-[#5F6473] mt-0.5">{lead.source}</div>
                </div>
                <div>
                  <span className="text-[#9CA3B5]">Owner:</span>
                  <div className="text-[#5F6473] mt-0.5">{lead.owner || '—'}</div>
                </div>
                <div>
                  <span className="text-[#9CA3B5]">Activity:</span>
                  <div className="text-[#5F6473] mt-0.5">
                    {getRelativeTime(lead.lastActivityAt)}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditLeadTags(lead.id);
                  }}
                  className="flex-1 py-2 text-sm font-semibold text-[#304DB5] hover:text-[#5E7BFF] border border-[#304DB5] rounded-full transition-colors"
                >
                  Edit Tags
                </button>
                {onAssignOwner && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAssignOwner(lead.id);
                    }}
                    className="flex-1 py-2 text-sm font-semibold text-[#304DB5] hover:text-[#5E7BFF] border border-[#304DB5] rounded-full transition-colors"
                  >
                    Assign Owner
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeadsDatabaseTable;
