import React, { useState } from 'react';

interface SessionNote {
  id: string;
  sessionTitle: string;
  studentName: string;
  sessionDate: string;
  notes: string;
  actionItems: string[];
  tags: string[];
  lastUpdated: string;
}

const SessionNotesPanel: React.FC = () => {
  const [notes, setNotes] = useState<SessionNote[]>([
    {
      id: 'note-1',
      sessionTitle: '1:1 Strategy Session',
      studentName: 'Emma Wilson',
      sessionDate: '2024-01-15',
      notes: `Great progress on course module. Emma is excelling with the marketing fundamentals.\n\nKey discussion points:\n- Reviewed social media strategy\n- Discussed content calendar implementation\n- Analyzed competitor positioning\n\nNext steps: Emma will create her first marketing campaign draft by next week.`,
      actionItems: [
        'Create marketing campaign draft',
        'Research 3 competitor strategies',
        'Set up content calendar template',
      ],
      tags: ['Marketing', 'Strategy', 'Progress Review'],
      lastUpdated: '2024-01-15',
    },
    {
      id: 'note-2',
      sessionTitle: 'Quick Q&A',
      studentName: 'James Chen',
      sessionDate: '2024-01-16',
      notes: `James had questions about Module 3 implementation. Clarified the concepts around customer segmentation and provided additional examples.\n\nHe's doing well overall but needs more practice with data analysis.`,
      actionItems: [
        'Complete data analysis exercise',
        'Review customer segmentation worksheet',
      ],
      tags: ['Q&A', 'Module 3', 'Data Analysis'],
      lastUpdated: '2024-01-16',
    },
  ]);

  const [selectedNote, setSelectedNote] = useState<SessionNote | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<SessionNote>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredNotes = notes.filter(
    (note) =>
      note.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.sessionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const createNewNote = () => {
    setShowCreateModal(true);
  };

  const saveNewNote = () => {
    const newNote: SessionNote = {
      id: `note-${Date.now()}`,
      sessionTitle: 'New Session',
      studentName: 'Student Name',
      sessionDate: new Date().toISOString().split('T')[0],
      notes: '',
      actionItems: [],
      tags: [],
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setIsEditing(true);
    setEditForm(newNote);
    setShowCreateModal(false);
  };

  const startEdit = () => {
    if (!selectedNote) return;
    setIsEditing(true);
    setEditForm({ ...selectedNote });
  };

  const saveEdit = () => {
    if (!selectedNote) return;
    const updated = notes.map((note) =>
      note.id === selectedNote.id
        ? { ...note, ...editForm, lastUpdated: new Date().toISOString().split('T')[0] }
        : note
    );
    setNotes(updated);
    setSelectedNote({ ...selectedNote, ...editForm } as SessionNote);
    setIsEditing(false);
    console.log('Note saved:', editForm);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditForm({});
  };

  const deleteNote = (noteId: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter((n) => n.id !== noteId));
      if (selectedNote?.id === noteId) {
        setSelectedNote(null);
      }
      console.log('Deleted note:', noteId);
    }
  };

  const exportNote = (noteId: string) => {
    console.log('Exporting note:', noteId);
    alert('Note exported as PDF!');
  };

  const addActionItem = () => {
    const newActionItem = prompt('Enter new action item:');
    if (newActionItem) {
      setEditForm({
        ...editForm,
        actionItems: [...(editForm.actionItems || []), newActionItem],
      });
    }
  };

  const removeActionItem = (index: number) => {
    setEditForm({
      ...editForm,
      actionItems: (editForm.actionItems || []).filter((_, i) => i !== index),
    });
  };

  const addTag = () => {
    const newTag = prompt('Enter new tag:');
    if (newTag) {
      setEditForm({
        ...editForm,
        tags: [...(editForm.tags || []), newTag],
      });
    }
  };

  const removeTag = (index: number) => {
    setEditForm({
      ...editForm,
      tags: (editForm.tags || []).filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-[#111827]">Session Notes</h3>
          <p className="text-sm text-[#5F6473] mt-1">
            Document and track important session details and follow-ups
          </p>
        </div>
        <button
          onClick={createNewNote}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white font-semibold rounded-full hover:shadow-lg transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Note
        </button>
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search by student, session, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[#EDF0FB] focus:outline-none focus:ring-2 focus:ring-[#304DB5]"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notes List */}
        <div className="lg:col-span-1 space-y-3">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => {
                setSelectedNote(note);
                setIsEditing(false);
              }}
              className={`bg-white rounded-2xl border p-4 cursor-pointer hover:border-[#304DB5] transition-colors ${
                selectedNote?.id === note.id ? 'border-[#304DB5] shadow-md' : 'border-[#EDF0FB]'
              }`}
            >
              <div className="mb-2">
                <h5 className="font-bold text-[#111827] text-sm mb-1">{note.sessionTitle}</h5>
                <p className="text-xs text-[#5F6473]">{note.studentName}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-[#9CA3B5]">
                <span>{note.sessionDate}</span>
                <span>{note.actionItems.length} actions</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {note.tags.slice(0, 2).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-[#F5F7FF] text-[#304DB5] text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {note.tags.length > 2 && (
                  <span className="px-2 py-1 bg-[#F5F7FF] text-[#5F6473] text-xs rounded-full">
                    +{note.tags.length - 2}
                  </span>
                )}
              </div>
            </div>
          ))}

          {filteredNotes.length === 0 && (
            <div className="bg-white rounded-2xl border-2 border-dashed border-[#EDF0FB] p-8 text-center">
              <div className="text-4xl mb-2">📝</div>
              <p className="text-sm text-[#5F6473]">No notes found</p>
            </div>
          )}
        </div>

        {/* Note Details/Editor */}
        <div className="lg:col-span-2">
          {selectedNote ? (
            <div className="bg-white rounded-2xl border border-[#EDF0FB] p-6">
              {/* Header Actions */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.sessionTitle || ''}
                      onChange={(e) =>
                        setEditForm({ ...editForm, sessionTitle: e.target.value })
                      }
                      className="text-xl font-bold text-[#111827] border-b-2 border-[#304DB5] focus:outline-none"
                    />
                  ) : (
                    <h4 className="text-xl font-bold text-[#111827]">
                      {selectedNote.sessionTitle}
                    </h4>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={saveEdit}
                        className="px-4 py-2 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white font-medium rounded-full hover:shadow-lg transition-all text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2 text-[#5F6473] font-medium rounded-full hover:bg-[#F5F7FF] transition-all text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={startEdit}
                        className="px-4 py-2 text-sm font-medium text-[#304DB5] hover:bg-blue-50 rounded-full transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => exportNote(selectedNote.id)}
                        className="px-4 py-2 text-sm font-medium text-[#22C55E] hover:bg-green-50 rounded-full transition-colors"
                      >
                        Export
                      </button>
                      <button
                        onClick={() => deleteNote(selectedNote.id)}
                        className="px-4 py-2 text-sm font-medium text-[#F97316] hover:bg-orange-50 rounded-full transition-colors"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Student & Date */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#F5F7FF] rounded-xl p-4">
                  <p className="text-xs text-[#9CA3B5] mb-1">Student</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.studentName || ''}
                      onChange={(e) => setEditForm({ ...editForm, studentName: e.target.value })}
                      className="w-full font-medium text-[#111827] bg-white px-2 py-1 rounded"
                    />
                  ) : (
                    <p className="font-medium text-[#111827]">{selectedNote.studentName}</p>
                  )}
                </div>
                <div className="bg-[#F5F7FF] rounded-xl p-4">
                  <p className="text-xs text-[#9CA3B5] mb-1">Session Date</p>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editForm.sessionDate || ''}
                      onChange={(e) => setEditForm({ ...editForm, sessionDate: e.target.value })}
                      className="w-full font-medium text-[#111827] bg-white px-2 py-1 rounded"
                    />
                  ) : (
                    <p className="font-medium text-[#111827]">{selectedNote.sessionDate}</p>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#111827] mb-2">Notes</label>
                {isEditing ? (
                  <textarea
                    value={editForm.notes || ''}
                    onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-3 rounded-xl border border-[#EDF0FB] focus:outline-none focus:ring-2 focus:ring-[#304DB5] resize-none"
                    placeholder="Enter session notes..."
                  />
                ) : (
                  <div className="bg-[#F5F7FF] rounded-xl p-4 text-sm text-[#111827] whitespace-pre-wrap">
                    {selectedNote.notes || 'No notes added yet.'}
                  </div>
                )}
              </div>

              {/* Action Items */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-[#111827]">Action Items</label>
                  {isEditing && (
                    <button
                      onClick={addActionItem}
                      className="text-xs text-[#304DB5] hover:underline"
                    >
                      + Add Item
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {(isEditing ? editForm.actionItems : selectedNote.actionItems)?.map(
                    (item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-[#F5F7FF] rounded-lg px-4 py-3"
                      >
                        <div className="w-5 h-5 rounded border-2 border-[#304DB5]" />
                        <p className="flex-1 text-sm text-[#111827]">{item}</p>
                        {isEditing && (
                          <button
                            onClick={() => removeActionItem(idx)}
                            className="text-[#F97316] hover:text-red-600 text-sm"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    )
                  )}
                  {(isEditing
                    ? editForm.actionItems?.length
                    : selectedNote.actionItems.length) === 0 && (
                    <p className="text-sm text-[#9CA3B5] italic">No action items yet</p>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-[#111827]">Tags</label>
                  {isEditing && (
                    <button onClick={addTag} className="text-xs text-[#304DB5] hover:underline">
                      + Add Tag
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(isEditing ? editForm.tags : selectedNote.tags)?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white text-xs rounded-full flex items-center gap-2"
                    >
                      {tag}
                      {isEditing && (
                        <button
                          onClick={() => removeTag(idx)}
                          className="hover:text-red-200"
                        >
                          ✕
                        </button>
                      )}
                    </span>
                  ))}
                  {(isEditing ? editForm.tags?.length : selectedNote.tags.length) === 0 && (
                    <p className="text-sm text-[#9CA3B5] italic">No tags yet</p>
                  )}
                </div>
              </div>

              {/* Last Updated */}
              <div className="mt-6 pt-6 border-t border-[#EDF0FB] text-xs text-[#9CA3B5]">
                Last updated: {selectedNote.lastUpdated}
              </div>
            </div>
          ) : (
            /* No Note Selected */
            <div className="bg-white rounded-2xl border-2 border-dashed border-[#EDF0FB] p-12 text-center h-full flex flex-col items-center justify-center">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-lg text-[#5F6473] mb-2">No note selected</p>
              <p className="text-sm text-[#9CA3B5]">
                Select a note from the list or create a new one
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-[#111827] mb-4">Create New Note</h3>
            <p className="text-sm text-[#5F6473] mb-6">
              A blank note will be created that you can edit immediately.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={saveNewNote}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white font-semibold rounded-full hover:shadow-lg transition-all"
              >
                Create Note
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-3 text-[#5F6473] font-medium rounded-full hover:bg-[#F5F7FF] transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionNotesPanel;
