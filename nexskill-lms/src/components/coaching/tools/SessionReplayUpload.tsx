import React, { useState } from 'react';

interface SessionReplay {
  id: string;
  title: string;
  studentName: string;
  sessionDate: string;
  duration: string;
  uploadDate: string;
  fileSize: string;
  status: 'Processing' | 'Ready' | 'Failed';
  thumbnailUrl?: string;
}

const SessionReplayUpload: React.FC = () => {
  const [replays, setReplays] = useState<SessionReplay[]>([
    {
      id: 'replay-1',
      title: 'Strategy Session with Emma Wilson',
      studentName: 'Emma Wilson',
      sessionDate: '2024-01-15',
      duration: '60 min',
      uploadDate: '2024-01-15',
      fileSize: '245 MB',
      status: 'Ready',
    },
    {
      id: 'replay-2',
      title: 'Q&A with James Chen',
      studentName: 'James Chen',
      sessionDate: '2024-01-16',
      duration: '30 min',
      uploadDate: '2024-01-16',
      fileSize: '128 MB',
      status: 'Ready',
    },
    {
      id: 'replay-3',
      title: 'Workshop Recording',
      studentName: 'Multiple Students',
      sessionDate: '2024-01-18',
      duration: '90 min',
      uploadDate: '2024-01-18',
      fileSize: '412 MB',
      status: 'Processing',
    },
  ]);

  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    console.log('Files to upload:', files);

    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadProgress(null);
            alert('Session replay uploaded successfully!');
            
            // Add new replay
            const newReplay: SessionReplay = {
              id: `replay-${Date.now()}`,
              title: files[0].name,
              studentName: 'Pending Assignment',
              sessionDate: new Date().toISOString().split('T')[0],
              duration: 'Unknown',
              uploadDate: new Date().toISOString().split('T')[0],
              fileSize: `${Math.round(files[0].size / (1024 * 1024))} MB`,
              status: 'Processing',
            };
            setReplays([newReplay, ...replays]);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready':
        return 'bg-[#22C55E] text-white';
      case 'Processing':
        return 'bg-[#F97316] text-white';
      case 'Failed':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-300 text-gray-700';
    }
  };

  const shareReplay = (replayId: string) => {
    console.log('Sharing replay:', replayId);
    alert('Share link copied to clipboard!');
  };

  const downloadReplay = (replayId: string) => {
    console.log('Downloading replay:', replayId);
    alert('Download started!');
  };

  const deleteReplay = (replayId: string) => {
    if (confirm('Are you sure you want to delete this replay?')) {
      setReplays(replays.filter((r) => r.id !== replayId));
      console.log('Deleted replay:', replayId);
    }
  };

  const editReplayInfo = (replayId: string) => {
    console.log('Editing replay info:', replayId);
    alert('Would open edit modal');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-[#111827]">Session Replays</h3>
        <p className="text-sm text-[#5F6473] mt-1">
          Upload, manage, and share recorded coaching sessions
        </p>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative bg-gradient-to-br from-[#F5F7FF] to-white rounded-2xl border-2 border-dashed p-12 text-center transition-all ${
          isDragging
            ? 'border-[#304DB5] bg-blue-50 scale-[1.02]'
            : 'border-[#EDF0FB] hover:border-[#304DB5]'
        }`}
      >
        <div className="text-6xl mb-4">🎥</div>
        <h4 className="text-lg font-bold text-[#111827] mb-2">Upload Session Recording</h4>
        <p className="text-sm text-[#5F6473] mb-6">
          Drag & drop your video file here, or click to browse
        </p>
        <label className="inline-block">
          <input
            type="file"
            accept="video/*"
            multiple
            onChange={handleFileInput}
            className="hidden"
          />
          <span className="px-6 py-3 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white font-semibold rounded-full hover:shadow-lg transition-all cursor-pointer inline-block">
            Choose Files
          </span>
        </label>
        <p className="text-xs text-[#9CA3B5] mt-4">
          Supported formats: MP4, MOV, AVI, MKV (Max 2GB per file)
        </p>

        {/* Upload Progress */}
        {uploadProgress !== null && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-[#5F6473] mb-2">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-[#EDF0FB] rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Replays Library */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-[#111827]">Replay Library</h4>
          <div className="flex items-center gap-2 text-sm text-[#5F6473]">
            <span>{replays.length} recordings</span>
            <span>•</span>
            <span>
              {replays
                .reduce((sum, r) => sum + parseInt(r.fileSize), 0)
                .toFixed(0)}{' '}
              MB total
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {replays.map((replay) => (
            <div
              key={replay.id}
              className="bg-white rounded-2xl border border-[#EDF0FB] p-6 hover:border-[#304DB5] transition-colors"
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Thumbnail Placeholder */}
                <div className="w-full md:w-48 h-32 bg-gradient-to-br from-[#304DB5] to-[#5E7BFF] rounded-xl flex items-center justify-center text-white text-5xl">
                  ▶️
                </div>

                {/* Replay Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h5 className="text-lg font-bold text-[#111827] mb-1">{replay.title}</h5>
                      <div className="flex items-center gap-3 text-sm text-[#5F6473]">
                        <span>👤 {replay.studentName}</span>
                        <span>•</span>
                        <span>📅 {replay.sessionDate}</span>
                        <span>•</span>
                        <span>⏱️ {replay.duration}</span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        replay.status
                      )}`}
                    >
                      {replay.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mb-4">
                    <div className="bg-[#F5F7FF] rounded-lg p-3">
                      <p className="text-[#9CA3B5] text-xs mb-1">File Size</p>
                      <p className="font-medium text-[#111827]">{replay.fileSize}</p>
                    </div>
                    <div className="bg-[#F5F7FF] rounded-lg p-3">
                      <p className="text-[#9CA3B5] text-xs mb-1">Upload Date</p>
                      <p className="font-medium text-[#111827]">{replay.uploadDate}</p>
                    </div>
                    <div className="bg-[#F5F7FF] rounded-lg p-3">
                      <p className="text-[#9CA3B5] text-xs mb-1">Views</p>
                      <p className="font-medium text-[#111827]">
                        {Math.floor(Math.random() * 50)}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  {replay.status === 'Ready' && (
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => shareReplay(replay.id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] rounded-full hover:shadow-lg transition-all"
                      >
                        Share Link
                      </button>
                      <button
                        onClick={() => downloadReplay(replay.id)}
                        className="px-4 py-2 text-sm font-medium text-[#304DB5] hover:bg-blue-50 rounded-full transition-colors"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => editReplayInfo(replay.id)}
                        className="px-4 py-2 text-sm font-medium text-[#5F6473] hover:bg-[#F5F7FF] rounded-full transition-colors"
                      >
                        Edit Info
                      </button>
                      <button
                        onClick={() => deleteReplay(replay.id)}
                        className="px-4 py-2 text-sm font-medium text-[#F97316] hover:bg-orange-50 rounded-full transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  {replay.status === 'Processing' && (
                    <div className="bg-[#FEF3E7] rounded-lg p-3 flex items-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#F97316] border-t-transparent" />
                      <p className="text-sm text-[#F97316]">
                        Processing video... This may take a few minutes.
                      </p>
                    </div>
                  )}

                  {replay.status === 'Failed' && (
                    <div className="bg-red-50 rounded-lg p-3">
                      <p className="text-sm text-red-600">
                        ❌ Processing failed. Please try uploading again.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {replays.length === 0 && (
          <div className="bg-white rounded-2xl border-2 border-dashed border-[#EDF0FB] p-12 text-center">
            <div className="text-6xl mb-4">📹</div>
            <p className="text-lg text-[#5F6473] mb-2">No replays yet</p>
            <p className="text-sm text-[#9CA3B5]">
              Upload your first session recording to get started
            </p>
          </div>
        )}
      </div>

      {/* Best Practices */}
      <div className="bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] rounded-2xl p-6 text-white">
        <h4 className="font-bold mb-3 flex items-center gap-2">
          <span>💡</span>
          <span>Session Recording Best Practices</span>
        </h4>
        <ul className="text-sm space-y-2 opacity-90">
          <li>• Always inform students that the session will be recorded</li>
          <li>• Use high-quality recording software for best results</li>
          <li>• Add clear titles and descriptions for easy organization</li>
          <li>• Share replays only with students who attended or need review</li>
          <li>• Keep recordings secure and respect student privacy</li>
        </ul>
      </div>
    </div>
  );
};

export default SessionReplayUpload;
