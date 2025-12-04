import React from 'react';

interface VideoPlayerProps {
  lesson: {
    id: string;
    title: string;
    duration: string;
    description: string;
  };
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ lesson }) => {
  return (
    <div className="space-y-4">
      {/* Video Frame */}
      <div className="bg-black rounded-3xl overflow-hidden shadow-card">
        <div className="relative aspect-video">
          {/* Placeholder Video */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
              <p className="text-white text-sm">Video Player Placeholder</p>
              <p className="text-gray-400 text-xs mt-2">Click to play lesson video</p>
            </div>
          </div>

          {/* Uncomment to use HTML5 video */}
          {/* <video
            controls
            className="w-full h-full"
            poster="/placeholder-thumbnail.jpg"
          >
            <source src="/dummy-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
        </div>
      </div>

      {/* Lesson Info */}
      <div className="bg-white rounded-3xl shadow-card p-6">
        <h2 className="text-xl font-bold text-text-primary mb-2">{lesson.title}</h2>
        <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
          <span>🎥 Video</span>
          <span>⏱️ {lesson.duration}</span>
          <span>📅 Updated Nov 2025</span>
        </div>
        <p className="text-text-secondary leading-relaxed">{lesson.description}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
