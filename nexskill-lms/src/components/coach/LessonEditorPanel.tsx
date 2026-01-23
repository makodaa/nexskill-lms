import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Lesson, LessonContentBlock } from '../../types/lesson';
import RichTextEditor from './RichTextEditor';

interface LessonEditorPanelProps {
  lesson: Lesson;
  onChange: (updatedLesson: Lesson) => void;
  onClose: () => void;
}

const LessonEditorPanel: React.FC<LessonEditorPanelProps> = ({ lesson, onChange, onClose }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue: any = value;

    // Convert numeric fields
    if (name === 'estimated_duration_minutes') {
      newValue = parseInt(value) || undefined;
    } else if (name === 'is_published') {
      newValue = value === 'true';
    }

    onChange({ ...lesson, [name]: newValue });
  };

  // Handle content updates for a specific block
  const handleContentUpdate = (content: string, blockId?: string) => {
    // Ensure content_blocks is initialized as an array
    const currentBlocks = lesson.content_blocks || [];
    let updatedBlocks: LessonContentBlock[];

    if (blockId) {
      // Update existing block
      updatedBlocks = currentBlocks.map(block =>
        block.id === blockId ? { ...block, content } : block
      );
    } else {
      // If no blockId provided, update the first text block or create one
      if (currentBlocks.length === 0) {
        // Create first block
        updatedBlocks = [{
          id: uuidv4(),
          type: 'text',
          content,
          position: 0,
          attributes: {}
        }];
      } else {
        // Find first text block to update, or create a new one
        const firstTextBlockIndex = currentBlocks.findIndex(block => block.type === 'text');
        if (firstTextBlockIndex !== -1) {
          updatedBlocks = currentBlocks.map((block, index) =>
            index === firstTextBlockIndex ? { ...block, content } : block
          );
        } else {
          // If no text block exists, add a new one at the end
          const newBlock: LessonContentBlock = {
            id: uuidv4(),
            type: 'text',
            content,
            position: currentBlocks.length,
            attributes: {}
          };
          updatedBlocks = [...currentBlocks, newBlock];
        }
      }
    }

    onChange({ ...lesson, content_blocks: updatedBlocks });
  };

  // Add a new content block
  const addContentBlock = (type: LessonContentBlock['type']) => {
    const currentBlocks = lesson.content_blocks || [];
    const newBlock: LessonContentBlock = {
      id: uuidv4(),
      type,
      content: type === 'text' ? '' : (type === 'image' || type === 'video' ? 'https://example.com/media-url' : ''),
      position: currentBlocks.length,
      attributes: {}
    };

    const updatedBlocks = [...currentBlocks, newBlock];
    onChange({ ...lesson, content_blocks: updatedBlocks });
  };

  // Remove a content block
  const removeContentBlock = (blockId: string) => {
    const currentBlocks = lesson.content_blocks || [];
    const updatedBlocks = currentBlocks
      .filter(block => block.id !== blockId)
      .map((block, index) => ({ ...block, position: index })); // Re-index positions

    onChange({ ...lesson, content_blocks: updatedBlocks });
  };

  // Move a content block up or down
  const moveContentBlock = (blockId: string, direction: 'up' | 'down') => {
    const currentBlocks = lesson.content_blocks || [];
    const blocks = [...currentBlocks];
    const index = blocks.findIndex(b => b.id === blockId);

    if (index !== -1) {
      if (direction === 'up' && index > 0) {
        [blocks[index - 1], blocks[index]] = [blocks[index], blocks[index - 1]];
      } else if (direction === 'down' && index < blocks.length - 1) {
        [blocks[index], blocks[index + 1]] = [blocks[index + 1], blocks[index]];
      }

      // Update positions
      const updatedBlocks = blocks.map((block, idx) => ({ ...block, position: idx }));
      onChange({ ...lesson, content_blocks: updatedBlocks });
    }
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-dark-background-card z-50 flex flex-col">
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-dark-background-card border-b border-slate-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Edit lesson</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:text-dark-text-secondary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 max-w-5xl mx-auto w-full">
          {/* Details Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-dark-text-primary">Lesson Details</h3>
            
            {/* Basics */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-slate-700 dark:text-dark-text-primary mb-2">
                Lesson title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={lesson.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="estimated_duration_minutes" className="block text-sm font-semibold text-slate-700 dark:text-dark-text-primary mb-2">
                Estimated Duration (minutes)
              </label>
              <input
                type="number"
                id="estimated_duration_minutes"
                name="estimated_duration_minutes"
                value={lesson.estimated_duration_minutes || ''}
                onChange={handleInputChange}
                placeholder="e.g., 15"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-slate-700 dark:text-dark-text-primary mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={lesson.description || ''}
                onChange={handleInputChange}
                rows={3}
                placeholder="Brief description of the lesson"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-dark-text-primary mb-2">
                Publish Status
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="is_published"
                    value="true"
                    checked={lesson.is_published}
                    onChange={handleInputChange}
                    className="text-[#304DB5] focus:ring-[#304DB5]"
                  />
                  <span className="ml-2 text-slate-700 dark:text-dark-text-primary">Published</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="is_published"
                    value="false"
                    checked={!lesson.is_published}
                    onChange={handleInputChange}
                    className="text-[#304DB5] focus:ring-[#304DB5]"
                  />
                  <span className="ml-2 text-slate-700 dark:text-dark-text-primary">Draft</span>
                </label>
              </div>
            </div>


          </div>

          <hr className="border-slate-200 dark:border-gray-700" />

          {/* Content Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-800 dark:text-dark-text-primary">
                Lesson Content
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => addContentBlock('text')}
                  className="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                  Add Text
                </button>
                <button
                  onClick={() => addContentBlock('heading')}
                  className="px-3 py-1.5 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                >
                  Add Heading
                </button>
                <button
                  onClick={() => addContentBlock('image')}
                  className="px-3 py-1.5 text-xs bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
                >
                  Add Image
                </button>
                <button
                  onClick={() => addContentBlock('code')}
                  className="px-3 py-1.5 text-xs bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200"
                >
                  Add Code
                </button>
              </div>
            </div>

            {/* Render all content blocks */}
            <div className="space-y-4">
              {(lesson.content_blocks || [])
                .sort((a, b) => a.position - b.position)
                .map((block) => (
                  <div
                    key={block.id}
                    className="border border-slate-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-gray-700 rounded text-slate-600 dark:text-slate-300 capitalize">
                        {block.type}
                      </span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => moveContentBlock(block.id, 'up')}
                          disabled={block.position === 0}
                          className="p-1 text-xs text-slate-500 hover:text-slate-700 disabled:opacity-30"
                          title="Move up"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => moveContentBlock(block.id, 'down')}
                          disabled={block.position === (lesson.content_blocks || []).length - 1}
                          className="p-1 text-xs text-slate-500 hover:text-slate-700 disabled:opacity-30"
                          title="Move down"
                        >
                          ↓
                        </button>
                        <button
                          onClick={() => removeContentBlock(block.id)}
                          className="p-1 text-xs text-red-500 hover:text-red-700"
                          title="Remove block"
                        >
                          ×
                        </button>
                      </div>
                    </div>

                    {block.type === 'text' ? (
                      <RichTextEditor
                        content={block.content}
                        onUpdate={(content) => handleContentUpdate(content, block.id)}
                        placeholder="Write your content here..."
                      />
                    ) : block.type === 'heading' ? (
                      <div>
                        <input
                          type="text"
                          value={block.content}
                          onChange={(e) => handleContentUpdate(e.target.value, block.id)}
                          placeholder="Heading text..."
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-gray-700 rounded-lg border border-slate-200 dark:border-gray-600 focus:border-[#304DB5] focus:outline-none focus:ring-1 focus:ring-blue-100"
                        />
                        <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                          Level:
                          <select
                            value={block.attributes?.level || 2}
                            onChange={(e) => {
                              const currentBlocks = lesson.content_blocks || [];
                              const updatedBlocks = currentBlocks.map(b =>
                                b.id === block.id
                                  ? { ...b, attributes: { ...b.attributes, level: parseInt(e.target.value) } }
                                  : b
                              );
                              onChange({ ...lesson, content_blocks: updatedBlocks });
                            }}
                            className="ml-2 px-2 py-1 bg-slate-100 dark:bg-gray-700 rounded border border-slate-300"
                          >
                            {[1, 2, 3, 4, 5, 6].map(level => (
                              <option key={level} value={level}>H{level}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : block.type === 'image' ? (
                      <div>
                        <input
                          type="text"
                          value={block.content}
                          onChange={(e) => handleContentUpdate(e.target.value, block.id)}
                          placeholder="Image URL..."
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-gray-700 rounded-lg border border-slate-200 dark:border-gray-600 focus:border-[#304DB5] focus:outline-none focus:ring-1 focus:ring-blue-100"
                        />
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={block.attributes?.alt || ''}
                            onChange={(e) => {
                              const currentBlocks = lesson.content_blocks || [];
                              const updatedBlocks = currentBlocks.map(b =>
                                b.id === block.id
                                  ? { ...b, attributes: { ...b.attributes, alt: e.target.value } }
                                  : b
                              );
                              onChange({ ...lesson, content_blocks: updatedBlocks });
                            }}
                            placeholder="Alt text"
                            className="px-2 py-1 text-sm bg-slate-50 dark:bg-gray-700 rounded border border-slate-200 dark:border-gray-600"
                          />
                          <input
                            type="text"
                            value={block.attributes?.caption || ''}
                            onChange={(e) => {
                              const currentBlocks = lesson.content_blocks || [];
                              const updatedBlocks = currentBlocks.map(b =>
                                b.id === block.id
                                  ? { ...b, attributes: { ...b.attributes, caption: e.target.value } }
                                  : b
                              );
                              onChange({ ...lesson, content_blocks: updatedBlocks });
                            }}
                            placeholder="Caption"
                            className="px-2 py-1 text-sm bg-slate-50 dark:bg-gray-700 rounded border border-slate-200 dark:border-gray-600"
                          />
                        </div>
                      </div>
                    ) : block.type === 'code' ? (
                      <textarea
                        value={block.content}
                        onChange={(e) => handleContentUpdate(e.target.value, block.id)}
                        placeholder="Code content..."
                        rows={4}
                        className="w-full px-3 py-2 bg-slate-900 text-slate-100 dark:bg-gray-900 dark:text-dark-text-primary rounded-lg border border-slate-200 dark:border-gray-600 font-mono text-sm"
                      />
                    ) : (
                      <div className="text-sm text-slate-500 dark:text-slate-400 p-2 bg-slate-50 dark:bg-gray-700 rounded">
                        {block.type} block: {block.content.substring(0, 50)}{block.content.length > 50 ? '...' : ''}
                      </div>
                    )}
                  </div>
                ))
              }

              {(lesson.content_blocks || []).length === 0 && (
                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                  <p>No content blocks yet. Add your first content block using the buttons above.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 dark:bg-gray-800 border-t border-slate-200 dark:border-gray-700 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-slate-700 dark:text-dark-text-primary font-medium rounded-full border-2 border-slate-300 dark:border-gray-600 hover:bg-white dark:bg-dark-background-card transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Validate required fields before saving
              if (!lesson.title.trim()) {
                alert('Please enter a lesson title');
                return;
              }

              onClose();
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white font-semibold rounded-full hover:shadow-lg transition-all"
          >
            Save lesson
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonEditorPanel;