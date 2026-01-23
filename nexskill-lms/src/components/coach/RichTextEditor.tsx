import React, { useCallback, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code, Pilcrow,
  Heading1, Heading2, Heading3, Heading4, List, ListOrdered,
  Quote, Link as LinkIcon, Image as ImageIcon, Minus, Palette,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Undo, Redo, Trash2, Loader2, FileText
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

interface RichTextEditorProps {
  content: string;
  onUpdate: (content: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onUpdate, placeholder = "Write your lesson content here..." }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Underline,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image,
    ],
    content,
    onUpdate: useCallback(({ editor }) => {
      onUpdate(editor.getHTML());
    }, [onUpdate]),
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const addPdf = useCallback(() => {
    pdfInputRef.current?.click();
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editor) return;

    setIsUploading(true);

    try {
      // Create a unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `editor-uploads/${fileName}`;

      // Upload to Supabase
      const { error: uploadError } = await supabase.storage
        .from('course-assets')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage
        .from('course-assets')
        .getPublicUrl(filePath);

      if (data.publicUrl) {
        editor.chain().focus().setImage({ src: data.publicUrl }).run();
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try entering a URL instead.');
      
      // Fallback to URL prompt
      const url = window.prompt('Image URL');
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editor) return;

    setIsUploading(true);

    try {
      // Create a unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `editor-uploads/${fileName}`;

      // Upload to Supabase
      const { error: uploadError } = await supabase.storage
        .from('course-assets')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage
        .from('course-assets')
        .getPublicUrl(filePath);

      if (data.publicUrl) {
        // Insert link
        editor.chain().focus().setLink({ href: data.publicUrl }).insertContent(file.name).run();
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert('Failed to upload PDF.');
    } finally {
      setIsUploading(false);
      // Reset input
      if (pdfInputRef.current) {
        pdfInputRef.current.value = '';
      }
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-slate-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleImageUpload} 
      />
      <input 
        type="file" 
        ref={pdfInputRef} 
        className="hidden" 
        accept="application/pdf" 
        onChange={handlePdfUpload} 
      />
      
      {/* Toolbar */}
      <div className="bg-slate-50 dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 p-2 flex flex-wrap items-center gap-2">
        
        {/* History */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-gray-700 disabled:opacity-50"
            title="Undo"
          >
            <Undo size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-gray-700 disabled:opacity-50"
            title="Redo"
          >
            <Redo size={16} />
          </button>
        </div>

        <div className="w-px h-6 bg-slate-300 dark:bg-gray-600 mx-2"></div>

        {/* Heading Level */}
        <select
          value={editor.isActive('heading') ? editor.getAttributes('heading').level : 0}
          onChange={(e) => {
            const level = parseInt(e.target.value);
            if (level === 0) {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 }).run();
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

        <div className="w-px h-6 bg-slate-300 dark:bg-gray-600 mx-2"></div>

        {/* Basic Formatting */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded-md ${editor.isActive('bold') ? 'bg-slate-200 dark:bg-gray-700' : 'hover:bg-slate-100 dark:hover:bg-gray-700'}`}
            title="Bold"
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded-md ${editor.isActive('italic') ? 'bg-slate-200 dark:bg-gray-700' : 'hover:bg-slate-100 dark:hover:bg-gray-700'}`}
            title="Italic"
          >
            <Italic size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded-md ${editor.isActive('underline') ? 'bg-slate-200 dark:bg-gray-700' : 'hover:bg-slate-100 dark:hover:bg-gray-700'}`}
            title="Underline"
          >
            <UnderlineIcon size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded-md ${editor.isActive('strike') ? 'bg-slate-200 dark:bg-gray-700' : 'hover:bg-slate-100 dark:hover:bg-gray-700'}`}
            title="Strikethrough"
          >
            <Strikethrough size={16} />
          </button>
        </div>
        
        <div className="w-px h-6 bg-slate-300 dark:bg-gray-600 mx-2"></div>

        {/* Highlight */}
        <div className="flex items-center gap-1 relative">
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`p-2 rounded-md ${editor.isActive('highlight') ? 'bg-slate-200 dark:bg-gray-700' : 'hover:bg-slate-100 dark:hover:bg-gray-700'}`}
            title="Highlight"
          >
            <Palette size={16} />
          </button>
          <input
              type="color"
              onInput={event => editor.chain().focus().setHighlight({ color: (event.target as HTMLInputElement).value }).run()}
              value={editor.getAttributes('highlight').color || '#ffffff'}
              className="w-6 h-6 p-0 border-none bg-transparent"
              title="Highlight Color"
            />
        </div>

        <div className="w-px h-6 bg-slate-300 dark:bg-gray-600 mx-2"></div>
        
        {/* Link and Image and PDF */}
        <div className="flex items-center gap-1">
          <button
            onClick={setLink}
            className={`p-2 rounded-md ${editor.isActive('link') ? 'bg-slate-200 dark:bg-gray-700' : 'hover:bg-slate-100 dark:hover:bg-gray-700'}`}
            title="Add Link"
          >
            <LinkIcon size={16} />
          </button>
          <button
            onClick={addImage}
            disabled={isUploading}
            className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-gray-700 disabled:opacity-50"
            title="Add Image"
          >
            {isUploading ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
          </button>
          <button
            onClick={addPdf}
            disabled={isUploading}
            className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-gray-700 disabled:opacity-50"
            title="Add PDF"
          >
             {isUploading ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
          </button>
        </div>


        <div className="w-px h-6 bg-slate-300 dark:bg-gray-600 mx-2"></div>

        {/* Text Align */}
        <div className="flex items-center gap-1">
          <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`p-2 rounded-md ${editor.isActive({ textAlign: 'left' }) ? 'bg-slate-200 dark:bg-gray-700' : 'hover:bg-slate-100 dark:hover:bg-gray-700'}`} title="Align Left"><AlignLeft size={16} /></button>
          <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`p-2 rounded-md ${editor.isActive({ textAlign: 'center' }) ? 'bg-slate-200 dark:bg-gray-700' : 'hover:bg-slate-100 dark:hover:bg-gray-700'}`} title="Align Center"><AlignCenter size={16} /></button>
          <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`p-2 rounded-md ${editor.isActive({ textAlign: 'right' }) ? 'bg-slate-200 dark:bg-gray-700' : 'hover:bg-slate-100 dark:hover:bg-gray-700'}`} title="Align Right"><AlignRight size={16} /></button>
          <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={`p-2 rounded-md ${editor.isActive({ textAlign: 'justify' }) ? 'bg-slate-200 dark:bg-gray-700' : 'hover:bg-slate-100 dark:hover:bg-gray-700'}`} title="Justify"><AlignJustify size={16} /></button>
        </div>

        <div className="w-px h-6 bg-slate-300 dark:bg-gray-600 mx-2"></div>

        {/* Lists */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded-md ${editor.isActive('bulletList') ? 'bg-slate-200 dark:bg-gray-700' : 'hover:bg-slate-100 dark:hover:bg-gray-700'}`}
            title="Bullet List"
          >
            <List size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded-md ${editor.isActive('orderedList') ? 'bg-slate-200 dark:bg-gray-700' : 'hover:bg-slate-100 dark:hover:bg-gray-700'}`}
            title="Numbered List"
          >
            <ListOrdered size={16} />
          </button>
        </div>

        <div className="w-px h-6 bg-slate-300 dark:bg-gray-600 mx-2"></div>

        {/* Inserts */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded-md ${editor.isActive('blockquote') ? 'bg-slate-200 dark:bg-gray-700' : 'hover:bg-slate-100 dark:hover:bg-gray-700'}`}
            title="Blockquote"
          >
            <Quote size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-2 rounded-md ${editor.isActive('codeBlock') ? 'bg-slate-200 dark:bg-gray-700' : 'hover:bg-slate-100 dark:hover:bg-gray-700'}`}
            title="Code Block"
          >
            <Code size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-gray-700"
            title="Horizontal Rule"
          >
            <Minus size={16} />
          </button>
        </div>
        
        <div className="w-px h-6 bg-slate-300 dark:bg-gray-600 mx-2"></div>

        {/* Clear */}
        <button
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-gray-700"
          title="Clear Formatting"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Editor Content */}
      <div className="p-4 min-h-[300px] bg-white dark:bg-gray-900">
        <EditorContent
          editor={editor}
          className="prose prose-slate dark:prose-invert max-w-none min-h-[250px]"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;