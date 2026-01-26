import React from 'react';
import DOMPurify from 'dompurify';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { LessonContentBlock } from '../../types/lesson';

interface ContentBlockRendererProps {
  block: LessonContentBlock;
}

const ContentBlockRenderer: React.FC<ContentBlockRendererProps> = ({ block }) => {
  switch (block.type) {
    case 'text':
      return (
        <div 
          className="prose dark:prose-invert max-w-none mb-4 text-gray-700 dark:text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(block.content) }}
        />
      );
    
    case 'heading': {
      const level = block.attributes?.level || 2;
      const HeadingTag = `h${level}` as React.ElementType; 
      const styles = {
        1: 'text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white border-b pb-2 border-gray-100 dark:border-gray-800',
        2: 'text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white',
        3: 'text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white'
      };
      
      return (
        <HeadingTag className={styles[level as keyof typeof styles] || styles[2]}>
          {block.content}
        </HeadingTag>
      );
    }
      
    case 'image':
      if (!block.content) return null;
      
      return (
        <figure className="my-6">
          <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <img 
              src={block.content} 
              alt={block.attributes?.alt || 'Lesson image'} 
              className="w-full h-auto object-cover max-h-[600px]"
              loading="lazy"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </div>
          {block.attributes?.caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-2 italic">
              {block.attributes.caption}
            </figcaption>
          )}
        </figure>
      );
      
    case 'code':
      return (
        <div className="my-6 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {block.attributes?.language || 'Code'}
            </span>
          </div>
          <SyntaxHighlighter 
            language={block.attributes?.language || 'typescript'} 
            style={vscDarkPlus}
            showLineNumbers
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              borderRadius: 0,
              fontSize: '0.875rem',
            }}
          >
            {block.content}
          </SyntaxHighlighter>
        </div>
      );
      
    case 'video': {
       if (!block.content) return null;
       
       const isYoutube = block.content.includes('youtube.com') || block.content.includes('youtu.be');
       let videoSrc = block.content;
       
       if (isYoutube) {
         if (block.content.includes('watch?v=')) {
           videoSrc = block.content.replace('watch?v=', 'embed/');
         } else if (block.content.includes('youtu.be')) {
           videoSrc = block.content.replace('youtu.be/', 'youtube.com/embed/');
         }
       }

      return (
         <div className="my-6 w-full rounded-xl overflow-hidden bg-black shadow-md aspect-video">
           {isYoutube ? (
             <iframe
               src={videoSrc}
               className="w-full h-full"
               title="Video player"
               allowFullScreen
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             />
           ) : (
             <video src={block.content} controls className="w-full h-full" />
           )}
         </div>
      );
    }
      
    default:
      return (
        <div className="p-4 my-4 bg-gray-50 text-gray-500 rounded text-sm italic border border-dashed border-gray-200 text-center">
          Unsupported block type: {block.type}
        </div>
      );
  }
};

export default React.memo(ContentBlockRenderer);
