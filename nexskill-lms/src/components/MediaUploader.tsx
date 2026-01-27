import React, { useEffect, useRef } from "react";
import {
    Upload,
    X,
    Loader2,
    AlertCircle,
    Image as ImageIcon,
    Video as VideoIcon,
    FileText,
    File,
} from "lucide-react";
import { useCloudinaryUpload } from "../hooks/useCloudinaryUpload";
import type { MediaMetadata } from "../types/media.types";

interface MediaUploaderProps {
    resourceType: "image" | "video" | "document";
    currentUrl?: string;
    currentMetadata?: MediaMetadata;
    onUploadComplete: (metadata: MediaMetadata) => void;
    onRemove?: () => void;
    className?: string;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
    resourceType,
    currentUrl,
    currentMetadata,
    onUploadComplete,
    onRemove,
    className = "",
}) => {
    const { uploadMedia, isUploading, uploadProgress, error, clearError } =
        useCloudinaryUpload();
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                clearError();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, clearError]);

    const handleUpload = async () => {
        const metadata = await uploadMedia(resourceType);
        if (metadata) {
            onUploadComplete(metadata);
        }
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // For documents, upload directly without Cloudinary (use Supabase Storage)
        if (resourceType === "document") {
            // This would be handled by a separate upload service
            // For now, call the upload handler
            const metadata = await uploadMedia(resourceType);
            if (metadata) {
                onUploadComplete(metadata);
            }
        }

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const hasMedia =
        currentUrl && currentUrl !== "https://example.com/media-url";
    
    const getIcon = () => {
        switch (resourceType) {
            case "image":
                return ImageIcon;
            case "video":
                return VideoIcon;
            case "document":
                return FileText;
            default:
                return File;
        }
    };

    const Icon = getIcon();

    return (
        <div className={`space-y-3 ${className}`}>
            {/* Error Display */}
            {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* Upload/Replace Button */}
            <div className="flex items-center gap-2">
                <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        isUploading
                            ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                            : "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800"
                    }`}
                >
                    {isUploading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Uploading...{" "}
                            {uploadProgress > 0 &&
                                `${Math.round(uploadProgress)}%`}
                        </>
                    ) : (
                        <>
                            {hasMedia ? (
                                <>
                                    <Upload className="w-4 h-4" />
                                    Replace {resourceType}
                                </>
                            ) : (
                                <>
                                    <Icon className="w-4 h-4" />
                                    Upload {resourceType}
                                </>
                            )}
                        </>
                    )}
                </button>

                {hasMedia && onRemove && !isUploading && (
                    <button
                        onClick={onRemove}
                        className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title={`Remove ${resourceType}`}
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Upload Progress */}
            {isUploading && uploadProgress > 0 && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-blue-600 dark:bg-blue-500 h-full transition-all duration-300 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                    />
                </div>
            )}

            {/* Current Media Preview */}
            {hasMedia && !isUploading && (
                <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    {resourceType === "image" ? (
                        <img
                            src={currentUrl}
                            alt="Current upload"
                            className="w-full h-auto max-h-64 object-contain"
                            onError={(e) => {
                                e.currentTarget.src =
                                    "https://via.placeholder.com/400x300?text=Image+Not+Found";
                            }}
                        />
                    ) : resourceType === "video" ? (
                        <div className="w-full aspect-video bg-black">
                            {currentMetadata?.thumbnail_url ? (
                                <div className="relative w-full h-full">
                                    <img
                                        src={currentMetadata.thumbnail_url}
                                        alt="Video thumbnail"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                        <VideoIcon className="w-12 h-12 text-white opacity-80" />
                                    </div>
                                </div>
                            ) : (
                                <video
                                    src={currentUrl}
                                    className="w-full h-full object-contain"
                                    controls
                                    onError={(e) => {
                                        console.error("Video load error:", e);
                                    }}
                                />
                            )}
                        </div>
                    ) : (
                        // Document preview
                        <div className="flex flex-col items-center justify-center p-8 gap-4">
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                                <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="text-center">
                                <p className="font-medium text-gray-900 dark:text-white truncate max-w-xs">
                                    {currentMetadata?.original_filename || "Document"}
                                </p>
                                <a
                                    href={currentUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
                                >
                                    Open Document
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Metadata Display */}
                    {currentMetadata && (
                        <div className="p-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                <span className="truncate">
                                    {currentMetadata.original_filename ||
                                        currentMetadata.public_id}
                                </span>
                                {currentMetadata.bytes && (
                                    <span className="ml-2 flex-shrink-0">
                                        {(
                                            currentMetadata.bytes /
                                            1024 /
                                            1024
                                        ).toFixed(2)}{" "}
                                        MB
                                    </span>
                                )}
                            </div>
                            {(currentMetadata.width ||
                                currentMetadata.duration) && (
                                <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                    {currentMetadata.width &&
                                        currentMetadata.height && (
                                            <span>
                                                {currentMetadata.width} ×{" "}
                                                {currentMetadata.height}
                                            </span>
                                        )}
                                    {currentMetadata.duration && (
                                        <span className="ml-2">
                                            {Math.floor(
                                                currentMetadata.duration / 60
                                            )}
                                            :
                                            {String(
                                                Math.floor(
                                                    currentMetadata.duration %
                                                        60
                                                )
                                            ).padStart(2, "0")}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* No Media Placeholder */}
            {!hasMedia && !isUploading && (
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                    <Icon className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-3" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        No {resourceType} uploaded yet
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        Click the button above to upload
                    </p>
                </div>
            )}
        </div>
    );
};
