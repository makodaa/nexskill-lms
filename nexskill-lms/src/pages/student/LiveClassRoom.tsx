import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentAppLayout from '../../layouts/StudentAppLayout';

const LiveClassRoom: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'participants' | 'qa'>('chat');

  // Dummy data
  const classData = {
    id: classId || '1',
    title: 'Introduction to Design Systems',
    instructor: 'Sarah Johnson',
    startTime: '2:00 PM',
    duration: '1h 30m',
    date: 'Today',
    participants: 45,
    status: 'live' as const,
  };

  const participants = [
    { id: 1, name: 'You', role: 'Student', camera: false, mic: false },
    { id: 2, name: 'Sarah Johnson', role: 'Instructor', camera: true, mic: true },
    { id: 3, name: 'Mike Chen', role: 'Student', camera: true, mic: false },
    { id: 4, name: 'Emma Wilson', role: 'Student', camera: false, mic: false },
    { id: 5, name: 'Alex Brown', role: 'Student', camera: true, mic: false },
  ];

  const chatMessages = [
    { id: 1, sender: 'Sarah Johnson', message: 'Welcome everyone! 👋', time: '2:05 PM', isInstructor: true },
    { id: 2, sender: 'Mike Chen', message: 'Thanks for having us!', time: '2:06 PM', isInstructor: false },
    { id: 3, sender: 'Sarah Johnson', message: 'We\'ll start with an introduction to design systems', time: '2:07 PM', isInstructor: true },
    { id: 4, sender: 'Emma Wilson', message: 'Can you share the slides?', time: '2:08 PM', isInstructor: false },
    { id: 5, sender: 'Sarah Johnson', message: 'Sure! I\'ll share them now', time: '2:08 PM', isInstructor: true },
  ];

  const qaQuestions = [
    { id: 1, question: 'What tools do you recommend for building design systems?', askedBy: 'Alex Brown', time: '2:10 PM', answered: true, answer: 'Figma for design, Storybook for development documentation' },
    { id: 2, question: 'How long does it take to build a complete design system?', askedBy: 'Mike Chen', time: '2:15 PM', answered: false },
  ];

  return (
    <StudentAppLayout>
      {/* Header */}
      <div className="px-8 py-4 border-b border-[#EDF0FB] bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/student/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ← Back
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                  LIVE
                </span>
                <h1 className="text-lg font-bold text-text-primary">{classData.title}</h1>
              </div>
              <p className="text-sm text-text-secondary mt-1">
                with {classData.instructor} • {classData.participants} participants
              </p>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/student/dashboard')}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Leave Class
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col bg-gray-900">
          {/* Video Grid */}
          <div className="flex-1 p-4 grid grid-cols-2 gap-4">
            {/* Instructor Video (Large) */}
            <div className="col-span-2 bg-gray-800 rounded-xl overflow-hidden relative aspect-video">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 mx-auto">
                    SJ
                  </div>
                  <p className="text-white font-medium">{classData.instructor}</p>
                  <p className="text-gray-400 text-sm">Instructor</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/70 text-white text-sm rounded-lg">
                {classData.instructor}
              </div>
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg">
                Presenting
              </div>
            </div>

            {/* Student Videos (Small) */}
            {participants.slice(2, 4).map((participant) => (
              <div key={participant.id} className="bg-gray-800 rounded-xl overflow-hidden relative aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto">
                      {participant.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                  {participant.name}
                </div>
              </div>
            ))}
          </div>

          {/* Controls Bar */}
          <div className="bg-gray-800 p-4 flex items-center justify-center gap-4">
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-4 rounded-full transition-all ${
                isMicOn ? 'bg-white text-gray-900' : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              {isMicOn ? '🎤' : '🔇'}
            </button>
            <button
              onClick={() => setIsCameraOn(!isCameraOn)}
              className={`p-4 rounded-full transition-all ${
                isCameraOn ? 'bg-white text-gray-900' : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              {isCameraOn ? '📹' : '📷'}
            </button>
            <button className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all">
              ✋
            </button>
            <button className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all">
              📺
            </button>
            <button className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all">
              ⚙️
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l border-[#EDF0FB] flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-[#EDF0FB]">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${
                activeTab === 'chat'
                  ? 'text-brand-primary border-b-2 border-brand-primary'
                  : 'text-text-secondary hover:bg-gray-50'
              }`}
            >
              💬 Chat
            </button>
            <button
              onClick={() => setActiveTab('participants')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${
                activeTab === 'participants'
                  ? 'text-brand-primary border-b-2 border-brand-primary'
                  : 'text-text-secondary hover:bg-gray-50'
              }`}
            >
              👥 People ({participants.length})
            </button>
            <button
              onClick={() => setActiveTab('qa')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${
                activeTab === 'qa'
                  ? 'text-brand-primary border-b-2 border-brand-primary'
                  : 'text-text-secondary hover:bg-gray-50'
              }`}
            >
              ❓ Q&A
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'chat' && (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className={`text-sm font-semibold ${msg.isInstructor ? 'text-brand-primary' : 'text-text-primary'}`}>
                          {msg.sender}
                          {msg.isInstructor && <span className="ml-1 text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Instructor</span>}
                        </span>
                        <span className="text-xs text-text-secondary">{msg.time}</span>
                      </div>
                      <p className="text-sm text-text-primary">{msg.message}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-[#EDF0FB]">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
              </div>
            )}

            {activeTab === 'participants' && (
              <div className="p-4 space-y-2">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{participant.name}</p>
                        <p className="text-xs text-text-secondary">{participant.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={participant.mic ? 'text-green-600' : 'text-gray-400'}>🎤</span>
                      <span className={participant.camera ? 'text-green-600' : 'text-gray-400'}>📹</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'qa' && (
              <div className="p-4 space-y-4">
                <button className="w-full px-4 py-2 bg-brand-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  ✋ Ask a Question
                </button>
                <div className="space-y-3">
                  {qaQuestions.map((qa) => (
                    <div key={qa.id} className={`p-3 rounded-lg border ${qa.answered ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-medium text-text-primary flex-1">{qa.question}</p>
                        {qa.answered && <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Answered</span>}
                      </div>
                      <p className="text-xs text-text-secondary mb-2">
                        Asked by {qa.askedBy} • {qa.time}
                      </p>
                      {qa.answered && qa.answer && (
                        <div className="mt-2 pt-2 border-t border-green-200">
                          <p className="text-xs font-semibold text-brand-primary mb-1">Answer:</p>
                          <p className="text-xs text-text-primary">{qa.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </StudentAppLayout>
  );
};

export default LiveClassRoom;
