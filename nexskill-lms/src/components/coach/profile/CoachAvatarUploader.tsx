import React, { useRef, useState } from 'react';

interface CoachAvatarUploaderProps {
  avatarUrl?: string;
  name?: string;
  onChange: (newAvatarMeta: { url?: string; fileName?: string }) => void;
}

const CoachAvatarUploader: React.FC<CoachAvatarUploaderProps> = ({
  avatarUrl,
  name = 'Coach',
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(avatarUrl);

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate upload with local preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      onChange({
        url: objectUrl,
        fileName: file.name,
      });
      console.log('Avatar file selected:', file.name);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Avatar Display */}
      <div className="relative group">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#304DB5] to-[#5E7BFF] flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {getInitials(name)}
              </span>
            </div>
          )}
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={triggerFileInput}
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Change photo button */}
      <button
        onClick={triggerFileInput}
        className="px-4 py-2 text-sm font-medium text-[#304DB5] hover:bg-blue-50 rounded-full transition-colors border border-[#304DB5]"
      >
        Change Photo
      </button>

      {/* Helper text */}
      <p className="text-xs text-[#9CA3B5] text-center max-w-[200px]">
        Recommended: Square image, at least 400×400px
      </p>
    </div>
  );
};

export default CoachAvatarUploader;
