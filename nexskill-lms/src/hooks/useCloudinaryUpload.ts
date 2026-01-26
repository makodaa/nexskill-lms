import { useState, useCallback } from "react";
import { CloudinaryService } from "../services/cloudinary.service";
import type {
    MediaMetadata,
    CloudinaryWidget,
    CloudinaryError,
    CloudinaryUploadEvent,
} from "../types/media.types";

interface UseCloudinaryUploadReturn {
    uploadMedia: (
        resourceType: "image" | "video" | "auto"
    ) => Promise<MediaMetadata | null>;
    isUploading: boolean;
    uploadProgress: number;
    error: string | null;
    clearError: () => void;
}

export function useCloudinaryUpload(): UseCloudinaryUploadReturn {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const uploadMedia = useCallback(
        async (
            resourceType: "image" | "video" | "auto" = "auto"
        ): Promise<MediaMetadata | null> => {
            setIsUploading(true);
            setUploadProgress(0);
            setError(null);

            return new Promise((resolve) => {
                let widget: CloudinaryWidget | null = null;

                const cleanup = () => {
                    if (widget) {
                        widget.close();
                    }
                    setIsUploading(false);
                    setUploadProgress(0);
                };

                CloudinaryService.openUploadWidget(
                    {
                        resourceType,
                        maxFileSize:
                            resourceType === "video" ? 104857600 : 10485760, // 100MB for video, 10MB for images
                        clientAllowedFormats:
                            resourceType === "image"
                                ? ["jpg", "jpeg", "png", "gif", "webp", "svg"]
                                : resourceType === "video"
                                ? ["mp4", "mov", "avi", "wmv", "flv", "webm"]
                                : undefined,
                        cropping: resourceType === "image",
                        showSkipCropButton: true,
                        multiple: false,
                        maxFiles: 1,
                    },
                    (
                        uploadError: CloudinaryError | null,
                        result: CloudinaryUploadEvent | null
                    ) => {
                        if (uploadError) {
                            console.error("Upload error:", uploadError);
                            setError(
                                uploadError.message ||
                                    "Upload failed. Please try again."
                            );
                            cleanup();
                            resolve(null);
                            return;
                        }

                        if (!result) {
                            cleanup();
                            resolve(null);
                            return;
                        }

                        // Handle upload progress
                        if (result.event === "upload-added") {
                            setUploadProgress(10);
                        } else if (result.event === "queues-start") {
                            setUploadProgress(20);
                        } else if (result.event === "progress") {
                            // Update progress based on upload percentage
                            const progress = Math.min(
                                90,
                                20 + (result.info?.percent || 0) * 0.7
                            );
                            setUploadProgress(progress);
                        } else if (result.event === "success") {
                            setUploadProgress(100);

                            try {
                                if (result.info) {
                                    const metadata =
                                        CloudinaryService.convertToMediaMetadata(
                                            result.info
                                        );
                                    cleanup();
                                    resolve(metadata);
                                } else {
                                    throw new Error(
                                        "Upload result missing info"
                                    );
                                }
                            } catch (conversionError) {
                                console.error(
                                    "Error converting upload result:",
                                    conversionError
                                );
                                setError("Failed to process upload result");
                                cleanup();
                                resolve(null);
                            }
                        } else if (
                            result.event === "abort" ||
                            result.event === "close"
                        ) {
                            cleanup();
                            resolve(null);
                        }
                    }
                ).then((widgetInstance) => {
                    widget = widgetInstance;
                    if (widget) {
                        widget.open();
                    } else {
                        setError("Failed to initialize upload widget");
                        cleanup();
                        resolve(null);
                    }
                });
            });
        },
        []
    );

    return {
        uploadMedia,
        isUploading,
        uploadProgress,
        error,
        clearError,
    };
}
