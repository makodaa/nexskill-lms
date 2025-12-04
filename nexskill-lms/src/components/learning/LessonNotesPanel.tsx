import React, { useState, useEffect } from 'react';

interface LessonNotesPanelProps {
  activeLessonId: string;
}

const LessonNotesPanel: React.FC<LessonNotesPanelProps> = ({ activeLessonId }) => {
  const [notes, setNotes] = useState('');
  const maxLength = 1000;

  // Load notes from localStorage when lesson changes
  useEffect(() => {
    const savedNotes = localStorage.getItem(`lesson-notes-${activeLessonId}`);
    setNotes(savedNotes || '');
  }, [activeLessonId]);

  // Save notes to localStorage
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    if (newNotes.length <= maxLength) {
      setNotes(newNotes);
      localStorage.setItem(`lesson-notes-${activeLessonId}`, newNotes);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-text-primary">Notes</h4>
        <span className="text-xs text-text-muted">For this lesson</span>
      </div>

      <textarea
        value={notes}
        onChange={handleNotesChange}
        placeholder="Type your notes here..."
        className="w-full h-32 px-4 py-3 bg-[#F5F7FF] rounded-2xl text-sm text-text-primary placeholder-text-muted resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary-light transition-all"
      />

      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-text-muted">
          {notes.length} / {maxLength}
        </span>
        <span className="text-xs text-green-600 flex items-center gap-1">
          <span>✓</span> Autosaved locally
        </span>
      </div>
    </div>
  );
};

export default LessonNotesPanel;
