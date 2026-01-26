import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
    X,
    ChevronUp,
    ChevronDown,
    Trash2,
    Type,
    Heading1,
    Image,
    Code,
    FileText,
    Eye,
    EyeOff,
    MonitorPlay,
} from "lucide-react";
import LessonPreview from "./LessonPreview";
import LessonHeader from "./LessonHeader";
import type { Lesson, LessonContentBlock } from "../../../types/lesson";
import type { MediaMetadata } from "../../../types/media.types";
import RichTextEditor from "./RichTextEditor";
import { MediaUploader } from "../../MediaUploader";

interface LessonEditorPanelProps {
    lesson: Lesson;
    onChange: (updatedLesson: Lesson) => void;
    onClose: () => void;
}

const LessonEditorPanel: React.FC<LessonEditorPanelProps> = ({
    lesson,
    onChange,
    onClose,
}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isEditingHeader, setIsEditingHeader] = useState(false);
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    // Keyboard shortcut to enter preview
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Cmd/Ctrl + Shift + P
            if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "P") {
                e.preventDefault();
                setIsPreviewMode((prev) => !prev);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Local state for header fields to prevent re-render delays
    const [localTitle, setLocalTitle] = useState(lesson.title);
    const [localDescription, setLocalDescription] = useState(
        lesson.description || ""
    );
    const [localDuration, setLocalDuration] = useState(
        lesson.estimated_duration_minutes?.toString() || ""
    );

    // Local state for heading blocks to prevent re-render delays
    const [headingValues, setHeadingValues] = useState<Record<string, string>>(
        () => {
            const initialValues: Record<string, string> = {};
            lesson.content_blocks?.forEach((block) => {
                if (block.type === "heading") {
                    initialValues[block.id] = block.content;
                }
            });
            return initialValues;
        }
    );

    // Handle blur events to propagate header field changes
    const handleHeaderBlur = (
        field: "title" | "description" | "estimated_duration_minutes",
        value: string
    ) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let processedValue: any = value;
        if (field === "estimated_duration_minutes") {
            processedValue = parseInt(value) || undefined;
        }
        onChange({ ...lesson, [field]: processedValue });
    };

    // Handle content updates for a specific block
    const handleContentUpdate = (content: string, blockId?: string) => {
        // Ensure content_blocks is initialized as an array
        const currentBlocks = lesson.content_blocks || [];
        let updatedBlocks: LessonContentBlock[];

        if (blockId) {
            // Update existing block
            updatedBlocks = currentBlocks.map((block) =>
                block.id === blockId ? { ...block, content } : block
            );
        } else {
            // If no blockId provided, update the first text block or create one
            if (currentBlocks.length === 0) {
                // Create first block
                updatedBlocks = [
                    {
                        id: uuidv4(),
                        type: "text",
                        content,
                        position: 0,
                        attributes: {},
                    },
                ];
            } else {
                // Find first text block to update, or create a new one
                const firstTextBlockIndex = currentBlocks.findIndex(
                    (block) => block.type === "text"
                );
                if (firstTextBlockIndex !== -1) {
                    updatedBlocks = currentBlocks.map((block, index) =>
                        index === firstTextBlockIndex
                            ? { ...block, content }
                            : block
                    );
                } else {
                    // If no text block exists, add a new one at the end
                    const newBlock: LessonContentBlock = {
                        id: uuidv4(),
                        type: "text",
                        content,
                        position: currentBlocks.length,
                        attributes: {},
                    };
                    updatedBlocks = [...currentBlocks, newBlock];
                }
            }
        }

        onChange({ ...lesson, content_blocks: updatedBlocks });
    };

    // Add a new content block
    const addContentBlock = (type: LessonContentBlock["type"]) => {
        const currentBlocks = lesson.content_blocks || [];
        const newBlock: LessonContentBlock = {
            id: uuidv4(),
            type,
            content:
                type === "text"
                    ? ""
                    : type === "image" || type === "video"
                    ? "https://example.com/media-url"
                    : "",
            position: currentBlocks.length,
            attributes: {},
        };

        const updatedBlocks = [...currentBlocks, newBlock];
        onChange({ ...lesson, content_blocks: updatedBlocks });
        setShowDropdown(false);
    };

    // Remove a content block
    const removeContentBlock = (blockId: string) => {
        const currentBlocks = lesson.content_blocks || [];
        const updatedBlocks = currentBlocks
            .filter((block) => block.id !== blockId)
            .map((block, index) => ({ ...block, position: index })); // Re-index positions

        onChange({ ...lesson, content_blocks: updatedBlocks });
    };

    // Move a content block up or down
    const moveContentBlock = (blockId: string, direction: "up" | "down") => {
        const currentBlocks = lesson.content_blocks || [];
        const blocks = [...currentBlocks];
        const index = blocks.findIndex((b) => b.id === blockId);

        if (index !== -1) {
            if (direction === "up" && index > 0) {
                [blocks[index - 1], blocks[index]] = [
                    blocks[index],
                    blocks[index - 1],
                ];
            } else if (direction === "down" && index < blocks.length - 1) {
                [blocks[index], blocks[index + 1]] = [
                    blocks[index + 1],
                    blocks[index],
                ];
            }

            // Update positions
            const updatedBlocks = blocks.map((block, idx) => ({
                ...block,
                position: idx,
            }));
            onChange({ ...lesson, content_blocks: updatedBlocks });
        }
    };

    // Handle media upload completion
    const handleMediaUpload = (blockId: string, metadata: MediaMetadata) => {
        const currentBlocks = lesson.content_blocks || [];
        const updatedBlocks = currentBlocks.map((block) =>
            block.id === blockId
                ? {
                      ...block,
                      content: metadata.url,
                      attributes: {
                          ...block.attributes,
                          media_metadata: metadata,
                          alt: block.attributes?.alt || metadata.original_filename,
                          caption: block.attributes?.caption,
                      },
                  }
                : block
        );
        onChange({ ...lesson, content_blocks: updatedBlocks });
    };

    if (isPreviewMode) {
        return (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-gray-900">
                <LessonPreview
                    lesson={lesson}
                    onExitPreview={() => setIsPreviewMode(false)}
                />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-white dark:bg-dark-background-card z-50 flex flex-col">
            <div className="w-full h-full flex flex-col bg-slate-50 dark:bg-gray-900">
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 px-8 py-4 z-10 shadow-sm">
                    <div className="max-w-5xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 -ml-2"
                                title="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Edit Lesson
                                </h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                    Modify lesson content and settings
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Preview Button */}
                            <button
                                onClick={() => setIsPreviewMode(true)}
                                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                title="Preview (Cmd+Shift+P)"
                            >
                                <MonitorPlay className="w-4 h-4" />
                                Preview
                            </button>

                            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1 hidden sm:block"></div>

                            {/* Published/Hidden Toggle Button */}
                            <button
                                onClick={() =>
                                    onChange({
                                        ...lesson,
                                        is_published: !lesson.is_published,
                                    })
                                }
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    lesson.is_published
                                        ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                                        : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                                }`}
                            >
                                {lesson.is_published ? (
                                    <>
                                        <Eye className="w-4 h-4" />
                                        Published
                                    </>
                                ) : (
                                    <>
                                        <EyeOff className="w-4 h-4" />
                                        Hidden
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5 max-w-5xl mx-auto w-full animate-in fade-in zoom-in-95 duration-300">
                    <LessonHeader
                        lesson={lesson}
                        isEditing={isEditingHeader}
                        onToggleEdit={() => setIsEditingHeader(!isEditingHeader)}
                        title={localTitle}
                        description={localDescription}
                        duration={localDuration}
                        onTitleChange={setLocalTitle}
                        onDescriptionChange={setLocalDescription}
                        onDurationChange={setLocalDuration}
                        onBlur={handleHeaderBlur}
                    />

                    {/* Content Section */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
                                Lesson Content
                            </h2>
                        </div>

                        {/* Render all content blocks */}
                        <div className="space-y-2">
                            {(lesson.content_blocks || [])
                                .sort((a, b) => a.position - b.position)
                                .map((block) => {
                                    const config: Record<
                                        string,
                                        { icon: any; label: string }
                                    > = {
                                        text: { icon: Type, label: "Text" },
                                        heading: {
                                            icon: Heading1,
                                            label: "Heading",
                                        },
                                        image: { icon: Image, label: "Image" },
                                        code: { icon: Code, label: "Code" },
                                        video: {
                                            icon: FileText,
                                            label: "Video",
                                        },
                                    };
                                    const blockConfig = config[block.type] || {
                                        icon: FileText,
                                        label: "Unknown",
                                    };

                                    const BlockIcon = blockConfig.icon;

                                    return (
                                        <div
                                            key={block.id}
                                            className="bg-white dark:bg-gray-800 rounded-lg border  p-6 transition-all"
                                        >
                                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-50 dark:border-gray-700/50">
                                                <div className="flex items-center gap-2.5 text-slate-400">
                                                    <div className="p-1.5 bg-slate-50 dark:bg-gray-900 rounded-lg">
                                                        <BlockIcon className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-xs font-bold uppercase tracking-widest">
                                                        {blockConfig.label}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() =>
                                                            moveContentBlock(
                                                                block.id,
                                                                "up"
                                                            )
                                                        }
                                                        disabled={
                                                            block.position === 0
                                                        }
                                                        className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-30 rounded hover:bg-white dark:hover:bg-gray-700 shadow-sm"
                                                        title="Move up"
                                                    >
                                                        <ChevronUp className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            moveContentBlock(
                                                                block.id,
                                                                "down"
                                                            )
                                                        }
                                                        disabled={
                                                            block.position ===
                                                            (
                                                                lesson.content_blocks ||
                                                                []
                                                            ).length -
                                                                1
                                                        }
                                                        className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-30 rounded hover:bg-white dark:hover:bg-gray-700 shadow-sm"
                                                        title="Move down"
                                                    >
                                                        <ChevronDown className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            removeContentBlock(
                                                                block.id
                                                            )
                                                        }
                                                        className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-colors"
                                                        title="Remove block"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="">
                                                {block.type === "text" ? (
                                                    <div>
                                                        <RichTextEditor
                                                            content={
                                                                block.content
                                                            }
                                                            onUpdate={(
                                                                content
                                                            ) =>
                                                                handleContentUpdate(
                                                                    content,
                                                                    block.id
                                                                )
                                                            }
                                                            placeholder="Type your text..."
                                                        />
                                                    </div>
                                                ) : block.type === "heading" ? (
                                                    <div className="px-2 space-y-2">
                                                        <input
                                                            type="text"
                                                            value={
                                                                headingValues[
                                                                    block.id
                                                                ] ??
                                                                block.content
                                                            }
                                                            onChange={(e) =>
                                                                setHeadingValues(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        [block.id]:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    })
                                                                )
                                                            }
                                                            onBlur={(e) =>
                                                                handleContentUpdate(
                                                                    e.target
                                                                        .value,
                                                                    block.id
                                                                )
                                                            }
                                                            placeholder="Heading text..."
                                                            className="w-full bg-transparent border-none focus:outline-none text-2xl font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600 p-0"
                                                        />
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs text-gray-400">
                                                                Level:
                                                            </span>
                                                            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
                                                                {[1, 2, 3].map(
                                                                    (level) => (
                                                                        <button
                                                                            key={
                                                                                level
                                                                            }
                                                                            onClick={() => {
                                                                                const currentBlocks =
                                                                                    lesson.content_blocks ||
                                                                                    [];
                                                                                const updatedBlocks =
                                                                                    currentBlocks.map(
                                                                                        (
                                                                                            b
                                                                                        ) =>
                                                                                            b.id ===
                                                                                            block.id
                                                                                                ? {
                                                                                                      ...b,
                                                                                                      attributes:
                                                                                                          {
                                                                                                              ...b.attributes,
                                                                                                              level,
                                                                                                          },
                                                                                                  }
                                                                                                : b
                                                                                    );
                                                                                onChange(
                                                                                    {
                                                                                        ...lesson,
                                                                                        content_blocks:
                                                                                            updatedBlocks,
                                                                                    }
                                                                                );
                                                                            }}
                                                                            className={`px-2 py-0.5 text-xs font-medium rounded-md transition-all ${
                                                                                (block
                                                                                    .attributes
                                                                                    ?.level ||
                                                                                    2) ===
                                                                                level
                                                                                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                                                                                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                                                            }`}
                                                                        >
                                                                            H
                                                                            {
                                                                                level
                                                                            }
                                                                        </button>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : block.type === "image" ? (
                                                    <div className="space-y-4">
                                                        <MediaUploader
                                                            resourceType="image"
                                                            currentUrl={block.content}
                                                            currentMetadata={block.attributes?.media_metadata}
                                                            onUploadComplete={(metadata) =>
                                                                handleMediaUpload(block.id, metadata)
                                                            }
                                                            onRemove={() => handleContentUpdate("", block.id)}
                                                        />
                                                        
                                                        {/* Alt text and caption fields */}
                                                        <div className="grid grid-cols-2 gap-3 px-2">
                                                            <input
                                                                type="text"
                                                                value={block.attributes?.alt || ""}
                                                                onChange={(e) => {
                                                                    const currentBlocks = lesson.content_blocks || [];
                                                                    const updatedBlocks = currentBlocks.map((b) =>
                                                                        b.id === block.id
                                                                            ? {
                                                                                  ...b,
                                                                                  attributes: {
                                                                                      ...b.attributes,
                                                                                      alt: e.target.value,
                                                                                  },
                                                                              }
                                                                            : b
                                                                    );
                                                                    onChange({ ...lesson, content_blocks: updatedBlocks });
                                                                }}
                                                                placeholder="Alt text (for accessibility)"
                                                                className="w-full px-3 py-1.5 bg-transparent border-b border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:outline-none text-xs text-gray-600 dark:text-gray-400 transition-colors"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={block.attributes?.caption || ""}
                                                                onChange={(e) => {
                                                                    const currentBlocks = lesson.content_blocks || [];
                                                                    const updatedBlocks = currentBlocks.map((b) =>
                                                                        b.id === block.id
                                                                            ? {
                                                                                  ...b,
                                                                                  attributes: {
                                                                                      ...b.attributes,
                                                                                      caption: e.target.value,
                                                                                  },
                                                                              }
                                                                            : b
                                                                    );
                                                                    onChange({ ...lesson, content_blocks: updatedBlocks });
                                                                }}
                                                                placeholder="Caption (optional)"
                                                                className="w-full px-3 py-1.5 bg-transparent border-b border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:outline-none text-xs text-gray-600 dark:text-gray-400 transition-colors"
                                                            />
                                                        </div>
                                                    </div>
                                                ) : block.type === "video" ? (
                                                    <div className="space-y-4">
                                                        <MediaUploader
                                                            resourceType="video"
                                                            currentUrl={block.content}
                                                            currentMetadata={block.attributes?.media_metadata}
                                                            onUploadComplete={(metadata) =>
                                                                handleMediaUpload(block.id, metadata)
                                                            }
                                                            onRemove={() => handleContentUpdate("", block.id)}
                                                        />
                                                        
                                                        {/* Video URL input (for YouTube, etc.) */}
                                                        <div className="px-2">
                                                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                                                Or paste video URL (YouTube, Vimeo, etc.)
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={block.content}
                                                                onChange={(e) =>
                                                                    handleContentUpdate(e.target.value, block.id)
                                                                }
                                                                placeholder="https://youtube.com/watch?v=..."
                                                                className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none text-sm text-gray-600 dark:text-gray-300"
                                                            />
                                                        </div>
                                                        
                                                        {/* Caption field */}
                                                        <div className="px-2">
                                                            <input
                                                                type="text"
                                                                value={block.attributes?.caption || ""}
                                                                onChange={(e) => {
                                                                    const currentBlocks = lesson.content_blocks || [];
                                                                    const updatedBlocks = currentBlocks.map((b) =>
                                                                        b.id === block.id
                                                                            ? {
                                                                                  ...b,
                                                                                  attributes: {
                                                                                      ...b.attributes,
                                                                                      caption: e.target.value,
                                                                                  },
                                                                              }
                                                                            : b
                                                                    );
                                                                    onChange({ ...lesson, content_blocks: updatedBlocks });
                                                                }}
                                                                placeholder="Video caption (optional)"
                                                                className="w-full px-3 py-1.5 bg-transparent border-b border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:outline-none text-xs text-gray-600 dark:text-gray-400 transition-colors"
                                                            />
                                                        </div>
                                                    </div>
                                                ) : block.type === "code" ? (
                                                    <div className="relative group/code">
                                                        <div className="absolute top-3 right-3 px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded opacity-50 font-mono">
                                                            Code
                                                        </div>
                                                        <textarea
                                                            value={
                                                                block.content
                                                            }
                                                            onChange={(e) =>
                                                                handleContentUpdate(
                                                                    e.target
                                                                        .value,
                                                                    block.id
                                                                )
                                                            }
                                                            placeholder="Paste your code here..."
                                                            rows={6}
                                                            className="w-full px-4 py-4 bg-gray-900 text-gray-300 rounded-xl border border-gray-800 focus:border-gray-700 focus:ring-0 font-mono text-sm leading-relaxed resize-y"
                                                            spellCheck={false}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="text-sm text-slate-500 dark:text-slate-400 p-2 bg-slate-50 dark:bg-gray-700 rounded">
                                                        {block.type} block
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}

                            <div className="relative pt-2 pb-12">
                                <button
                                    onClick={() =>
                                        setShowDropdown(!showDropdown)
                                    }
                                    className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <span className="text-lg leading-none">
                                        +
                                    </span>
                                    Add content
                                </button>

                                {/* Dropdown Menu */}
                                {showDropdown && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() =>
                                                setShowDropdown(false)
                                            }
                                        ></div>
                                        <div className="absolute left-0 top-12 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-200">
                                            <div className="p-1.5 grid gap-0.5">
                                                <button
                                                    onClick={() =>
                                                        addContentBlock("text")
                                                    }
                                                    className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-3"
                                                >
                                                    <Type className="w-4 h-4 text-gray-500" />
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                                        Text
                                                    </span>
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        addContentBlock(
                                                            "heading"
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-3"
                                                >
                                                    <Heading1 className="w-4 h-4 text-gray-500" />
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                                        Heading
                                                    </span>
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        addContentBlock("image")
                                                    }
                                                    className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-3"
                                                >
                                                    <Image className="w-4 h-4 text-gray-500" />
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                                        Image
                                                    </span>
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        addContentBlock("code")
                                                    }
                                                    className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-3"
                                                >
                                                    <Code className="w-4 h-4 text-gray-500" />
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                                        Code
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sticky bottom-0 bg-slate-50 dark:bg-gray-800 border-t border-slate-200 dark:border-gray-700 px-6 py-4 flex justify-end gap-3 z-10">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            // Validate required fields before saving
                            if (!lesson.title.trim()) {
                                alert("Please enter a lesson title");
                                return;
                            }

                            onClose();
                        }}
                        className="px-6 py-2 bg-gray-900 hover:bg-black text-white text-sm font-medium rounded-lg shadow-sm transition-all dark:bg-white dark:text-black dark:hover:bg-gray-100"
                    >
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LessonEditorPanel;
