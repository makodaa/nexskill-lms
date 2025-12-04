import React from 'react';

interface Resource {
  id: string;
  fileName: string;
  size: string;
  type: 'pdf' | 'docx' | 'zip' | 'pptx';
}

interface DownloadCenterProps {
  resources: Resource[];
}

const DownloadCenter: React.FC<DownloadCenterProps> = ({ resources }) => {
  const handleDownload = (fileName: string) => {
    console.log('Downloading:', fileName);
    // Simulate download
    alert(`Downloading ${fileName}...`);
  };

  const getFileIcon = (type: string) => {
    const icons: Record<string, string> = {
      pdf: '📕',
      docx: '📘',
      zip: '📦',
      pptx: '📊',
    };
    return icons[type] || '📄';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <h4 className="text-sm font-semibold text-text-primary mb-3">Downloads</h4>
      
      {resources.length > 0 ? (
        <div className="space-y-2">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="flex items-center justify-between p-3 bg-[#F5F7FF] rounded-xl hover:bg-brand-primary-soft transition-colors group"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-xl flex-shrink-0">{getFileIcon(resource.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {resource.fileName}
                  </p>
                  <p className="text-xs text-text-muted">{resource.size}</p>
                </div>
              </div>
              <button
                onClick={() => handleDownload(resource.fileName)}
                className="px-3 py-1.5 bg-white group-hover:bg-brand-primary text-text-secondary group-hover:text-white rounded-full text-xs font-medium transition-colors flex-shrink-0"
              >
                ⬇️ Download
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-text-muted text-center py-4">No downloads available</p>
      )}
    </div>
  );
};

export default DownloadCenter;
