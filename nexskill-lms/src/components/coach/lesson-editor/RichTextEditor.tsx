import React, { useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { Extension } from "@tiptap/core";
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Code,
    List,
    ListOrdered,
    Link as LinkIcon,
    Palette,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Trash2,
    Type,
} from "lucide-react";

// Custom FontSize extension
const FontSizeExtension = Extension.create({
    name: "fontSize",
    addOptions() {
        return {
            types: ["textStyle"],
        };
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: (element) => element.style.fontSize || null,
                        renderHTML: (attributes) => {
                            if (!attributes.fontSize) {
                                return {};
                            }
                            return {
                                style: `font-size: ${attributes.fontSize}`,
                            };
                        },
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setFontSize:
                (fontSize: string) =>
                ({ chain }: any) => {
                    return chain().setMark("textStyle", { fontSize }).run();
                },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            unsetFontSize:
                () =>
                ({ chain }: any) => {
                    return chain()
                        .setMark("textStyle", { fontSize: null })
                        .updateAttributes("textStyle", { fontSize: null })
                        .run();
                },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any;
    },
});

interface RichTextEditorProps {
    content: string;
    onUpdate: (content: string) => void;
    placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
    content,
    onUpdate,
    placeholder = "Write your lesson content here...",
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder,
            }),
            Highlight.configure({ multicolor: true }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Image,
            TextStyle,
            FontSizeExtension,
        ],
        content,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onUpdate: useCallback(
            ({ editor }: any) => {
                onUpdate(editor.getHTML());
            },
            [onUpdate]
        ),
    });

    const setLink = useCallback(() => {
        if (!editor) return;
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        if (url === null) {
            return;
        }

        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div
            className="group/editor border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:border-gray-300 dark:hover:border-gray-600 transition-all cursor-text"
            onClick={() => editor?.chain().focus().run()}
        >
            {/* Toolbar */}
            <div className="bg-transparent border-b border-gray-100 dark:border-gray-800 pt-1 pb-2 px-2 flex flex-wrap items-center gap-1 opacity-50 group-hover/editor:opacity-100 transition-opacity">
                {/* Heading Level */}
                <select
                    value={
                        editor.isActive("heading")
                            ? editor.getAttributes("heading").level
                            : 0
                    }
                    onChange={(e) => {
                        const level = parseInt(e.target.value);
                        if (level === 0) {
                            editor.chain().focus().setParagraph().run();
                        } else {
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({
                                    level: level as 1 | 2 | 3 | 4,
                                })
                                .run();
                        }
                    }}
                    className="p-2 rounded-md bg-transparent hover:bg-slate-100 dark:hover:bg-gray-700 text-sm"
                >
                    <option value="0">Paragraph</option>
                    <option value="1">H1</option>
                    <option value="2">H2</option>
                    <option value="3">H3</option>
                    <option value="4">H4</option>
                </select>

                <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1"></div>

                {/* Font Size */}
                <div className="flex items-center gap-1">
                    <Type size={14} className="text-gray-400" />
                    <select
                        value={
                            editor.getAttributes("textStyle").fontSize || "16px"
                        }
                        onChange={(e) => {
                            if (e.target.value === "unset") {
                                editor.chain().focus().unsetFontSize().run();
                            } else {
                                editor
                                    .chain()
                                    .focus()
                                    .setFontSize(e.target.value)
                                    .run();
                            }
                        }}
                        className="p-2 rounded-md bg-transparent hover:bg-slate-100 dark:hover:bg-gray-700 text-sm"
                    >
                        <option value="unset">Default</option>
                        <option value="12px">12px</option>
                        <option value="14px">14px</option>
                        <option value="16px">16px</option>
                        <option value="18px">18px</option>
                        <option value="20px">20px</option>
                        <option value="24px">24px</option>
                        <option value="28px">28px</option>
                        <option value="32px">32px</option>
                    </select>
                </div>

                <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1"></div>

                {/* Basic Formatting */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                        className={`p-2 rounded-md ${
                            editor.isActive("bold")
                                ? "bg-slate-200 dark:bg-gray-700"
                                : "hover:bg-slate-100 dark:hover:bg-gray-700"
                        }`}
                        title="Bold"
                    >
                        <Bold size={16} />
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                        className={`p-2 rounded-md ${
                            editor.isActive("italic")
                                ? "bg-slate-200 dark:bg-gray-700"
                                : "hover:bg-slate-100 dark:hover:bg-gray-700"
                        }`}
                        title="Italic"
                    >
                        <Italic size={16} />
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleUnderline().run()
                        }
                        className={`p-2 rounded-md ${
                            editor.isActive("underline")
                                ? "bg-slate-200 dark:bg-gray-700"
                                : "hover:bg-slate-100 dark:hover:bg-gray-700"
                        }`}
                        title="Underline"
                    >
                        <UnderlineIcon size={16} />
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleStrike().run()
                        }
                        className={`p-2 rounded-md ${
                            editor.isActive("strike")
                                ? "bg-slate-200 dark:bg-gray-700"
                                : "hover:bg-slate-100 dark:hover:bg-gray-700"
                        }`}
                        title="Strikethrough"
                    >
                        <Strikethrough size={16} />
                    </button>
                </div>

                <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1"></div>

                {/* Highlight */}
                <div className="flex items-center gap-1 relative">
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleHighlight().run()
                        }
                        className={`p-2 rounded-md ${
                            editor.isActive("highlight")
                                ? "bg-slate-200 dark:bg-gray-700"
                                : "hover:bg-slate-100 dark:hover:bg-gray-700"
                        }`}
                        title="Highlight"
                    >
                        <Palette size={16} />
                    </button>
                    <input
                        type="color"
                        onInput={(event) =>
                            editor
                                .chain()
                                .focus()
                                .setHighlight({
                                    color: (event.target as HTMLInputElement)
                                        .value,
                                })
                                .run()
                        }
                        value={
                            editor.getAttributes("highlight").color || "#ffffff"
                        }
                        className="w-6 h-6 p-0 border-none bg-transparent"
                        title="Highlight Color"
                    />
                </div>

                <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1"></div>

                {/* Link */}
                <button
                    onClick={setLink}
                    className={`p-2 rounded-md ${
                        editor.isActive("link")
                            ? "bg-slate-200 dark:bg-gray-700"
                            : "hover:bg-slate-100 dark:hover:bg-gray-700"
                    }`}
                    title="Add Link"
                >
                    <LinkIcon size={16} />
                </button>

                <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1"></div>

                {/* Text Align */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={() =>
                            editor.chain().focus().setTextAlign("left").run()
                        }
                        className={`p-2 rounded-md ${
                            editor.isActive({ textAlign: "left" })
                                ? "bg-slate-200 dark:bg-gray-700"
                                : "hover:bg-slate-100 dark:hover:bg-gray-700"
                        }`}
                        title="Align Left"
                    >
                        <AlignLeft size={16} />
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().setTextAlign("center").run()
                        }
                        className={`p-2 rounded-md ${
                            editor.isActive({ textAlign: "center" })
                                ? "bg-slate-200 dark:bg-gray-700"
                                : "hover:bg-slate-100 dark:hover:bg-gray-700"
                        }`}
                        title="Align Center"
                    >
                        <AlignCenter size={16} />
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().setTextAlign("right").run()
                        }
                        className={`p-2 rounded-md ${
                            editor.isActive({ textAlign: "right" })
                                ? "bg-slate-200 dark:bg-gray-700"
                                : "hover:bg-slate-100 dark:hover:bg-gray-700"
                        }`}
                        title="Align Right"
                    >
                        <AlignRight size={16} />
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().setTextAlign("justify").run()
                        }
                        className={`p-2 rounded-md ${
                            editor.isActive({ textAlign: "justify" })
                                ? "bg-slate-200 dark:bg-gray-700"
                                : "hover:bg-slate-100 dark:hover:bg-gray-700"
                        }`}
                        title="Justify"
                    >
                        <AlignJustify size={16} />
                    </button>
                </div>

                <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1"></div>

                {/* Lists */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                        }
                        className={`p-2 rounded-md ${
                            editor.isActive("bulletList")
                                ? "bg-slate-200 dark:bg-gray-700"
                                : "hover:bg-slate-100 dark:hover:bg-gray-700"
                        }`}
                        title="Bullet List"
                    >
                        <List size={16} />
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleOrderedList().run()
                        }
                        className={`p-2 rounded-md ${
                            editor.isActive("orderedList")
                                ? "bg-slate-200 dark:bg-gray-700"
                                : "hover:bg-slate-100 dark:hover:bg-gray-700"
                        }`}
                        title="Numbered List"
                    >
                        <ListOrdered size={16} />
                    </button>
                </div>

                <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1"></div>

                {/* Inserts */}
                {/* Inserts */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleCodeBlock().run()
                        }
                        className={`p-2 rounded-md ${
                            editor.isActive("codeBlock")
                                ? "bg-slate-200 dark:bg-gray-700"
                                : "hover:bg-slate-100 dark:hover:bg-gray-700"
                        }`}
                        title="Code Block"
                    >
                        <Code size={16} />
                    </button>
                </div>

                <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1"></div>

                {/* Clear */}
                <button
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .clearNodes()
                            .unsetAllMarks()
                            .run()
                    }
                    className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-gray-700"
                    title="Clear Formatting"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            {/* Editor Content */}
            <div className="p-3 min-h-[200px] bg-transparent">
                <EditorContent
                    editor={editor}
                    className="prose prose-slate dark:prose-invert max-w-none min-h-[150px]"
                />
            </div>
        </div>
    );
};

export default RichTextEditor;
