import type {
    CloudinaryUploadOptions,
    CloudinaryUploadResult,
    MediaMetadata,
    CloudinaryWidget,
    CloudinaryError,
    CloudinaryUploadEvent,
} from "../types/media.types";

export class CloudinaryService {
    private static cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    private static uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    private static scriptLoaded = false;
    private static scriptPromise: Promise<void> | null = null;

    /**
     * Load the Cloudinary widget script dynamically
     */
    static async loadScript(): Promise<void> {
        if (this.scriptLoaded) {
            return Promise.resolve();
        }

        if (this.scriptPromise) {
            return this.scriptPromise;
        }

        this.scriptPromise = new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://upload-widget.cloudinary.com/global/all.js";
            script.async = true;
            script.onload = () => {
                this.scriptLoaded = true;
                resolve();
            };
            script.onerror = () => {
                this.scriptPromise = null;
                reject(new Error("Failed to load Cloudinary widget script"));
            };
            document.body.appendChild(script);
        });

        return this.scriptPromise;
    }

    /**
     * Open the Cloudinary upload widget
     */
    static async openUploadWidget(
        options: Partial<CloudinaryUploadOptions>,
        callback: (
            error: CloudinaryError | null,
            result: CloudinaryUploadEvent | null
        ) => void
    ): Promise<CloudinaryWidget | null> {
        try {
            await this.loadScript();

            if (!window.cloudinary) {
                throw new Error("Cloudinary widget failed to load");
            }

            if (!this.cloudName || !this.uploadPreset) {
                throw new Error(
                    "Cloudinary credentials not configured. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env file"
                );
            }

            const widgetOptions: CloudinaryUploadOptions = {
                cloudName: this.cloudName,
                uploadPreset: this.uploadPreset,
                sources: ["local", "url", "camera"],
                multiple: false,
                maxFiles: 1,
                resourceType: "auto",
                maxFileSize: 10485760, // 10MB default
                clientAllowedFormats: [
                    "jpg",
                    "jpeg",
                    "png",
                    "gif",
                    "webp",
                    "mp4",
                    "mov",
                    "avi",
                ],
                cropping: false,
                showSkipCropButton: true,
                folder: "nexskill-lms/lessons",
                tags: ["lesson-content"],
                ...options,
            };

            const widget = window.cloudinary.createUploadWidget(
                widgetOptions,
                callback
            );
            return widget;
        } catch (error) {
            console.error("Error opening Cloudinary widget:", error);
            const cloudinaryError: CloudinaryError = {
                message:
                    error instanceof Error
                        ? error.message
                        : "Unknown error occurred",
            };
            callback(cloudinaryError, null);
            return null;
        }
    }

    /**
     * Convert Cloudinary upload result to MediaMetadata
     */
    static convertToMediaMetadata(
        result: CloudinaryUploadResult
    ): MediaMetadata {
        const resourceType =
            result.resource_type === "image" || result.resource_type === "video"
                ? result.resource_type
                : "image";

        const metadata: MediaMetadata = {
            cloudinary_id: result.public_id,
            public_id: result.public_id,
            url: result.secure_url,
            resource_type: resourceType,
            format: result.format,
            bytes: result.bytes,
            original_filename: result.original_filename,
        };

        if (result.width) metadata.width = result.width;
        if (result.height) metadata.height = result.height;
        if (result.duration) metadata.duration = result.duration;

        // Generate thumbnail for videos
        if (resourceType === "video") {
            metadata.thumbnail_url = this.generateThumbnail(
                result.public_id,
                400
            );
        }

        return metadata;
    }

    /**
     * Generate a Cloudinary transformation URL
     */
    static generateThumbnail(publicId: string, width = 400): string {
        if (!this.cloudName) {
            console.warn("Cloudinary cloud name not configured");
            return "";
        }

        return `https://res.cloudinary.com/${this.cloudName}/image/upload/w_${width},c_fill/${publicId}.jpg`;
    }

    /**
     * Generate an optimized image URL with transformations
     */
    static getOptimizedImageUrl(
        publicId: string,
        options: {
            width?: number;
            height?: number;
            quality?: number;
            format?: string;
        } = {}
    ): string {
        if (!this.cloudName) {
            console.warn("Cloudinary cloud name not configured");
            return "";
        }

        const transformations: string[] = [];

        if (options.width) transformations.push(`w_${options.width}`);
        if (options.height) transformations.push(`h_${options.height}`);
        if (options.quality) transformations.push(`q_${options.quality}`);

        transformations.push("f_auto"); // Auto format
        transformations.push("c_fill"); // Crop and fill

        const transformString = transformations.join(",");
        const format = options.format || "auto";

        return `https://res.cloudinary.com/${this.cloudName}/image/upload/${transformString}/${publicId}.${format}`;
    }

    /**
     * Generate a video URL with transformations
     */
    static getOptimizedVideoUrl(
        publicId: string,
        options: {
            width?: number;
            quality?: string;
            format?: string;
        } = {}
    ): string {
        if (!this.cloudName) {
            console.warn("Cloudinary cloud name not configured");
            return "";
        }

        const transformations: string[] = [];

        if (options.width) transformations.push(`w_${options.width}`);
        if (options.quality) transformations.push(`q_${options.quality}`);

        transformations.push("f_auto"); // Auto format

        const transformString = transformations.join(",");

        return `https://res.cloudinary.com/${this.cloudName}/video/upload/${transformString}/${publicId}`;
    }

    /**
     * Delete media from Cloudinary (requires backend implementation)
     * This is a placeholder - actual deletion should be done server-side
     */
    static async deleteMedia(publicId: string): Promise<void> {
        console.warn(
            "Media deletion should be implemented server-side for security. Public ID:",
            publicId
        );
        // TODO: Implement server-side deletion endpoint
        // await fetch('/api/cloudinary/delete', {
        //   method: 'DELETE',
        //   body: JSON.stringify({ public_id: publicId }),
        // });
    }
}
