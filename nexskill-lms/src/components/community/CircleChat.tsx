import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  authorName: string;
  isCurrentUser: boolean;
  timestamp: string;
  text: string;
}

interface CircleChatProps {
  courseId?: string;
  courseName?: string;
}

const CircleChat: React.FC<CircleChatProps> = ({ courseName = 'Advanced React Patterns' }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      authorName: 'Sarah Chen',
      isCurrentUser: false,
      timestamp: '10:23 AM',
      text: 'Hey everyone! Just finished the hooks module. Anyone else struggling with useReducer?',
    },
    {
      id: '2',
      authorName: 'Michael Torres',
      isCurrentUser: false,
      timestamp: '10:25 AM',
      text: 'Yeah, it took me a while to understand when to use useReducer vs useState.',
    },
    {
      id: '3',
      authorName: 'You',
      isCurrentUser: true,
      timestamp: '10:27 AM',
      text: 'I found the reducer pattern really helpful for managing complex state. The key is thinking about actions and state transitions.',
    },
    {
      id: '4',
      authorName: 'Sarah Chen',
      isCurrentUser: false,
      timestamp: '10:28 AM',
      text: 'That makes sense! So it\'s like having a more predictable way to update state?',
    },
    {
      id: '5',
      authorName: 'You',
      isCurrentUser: true,
      timestamp: '10:29 AM',
      text: 'Exactly! Plus it helps with debugging because you can see all possible state changes in one place.',
    },
    {
      id: '6',
      authorName: 'Priya Patel',
      isCurrentUser: false,
      timestamp: '10:31 AM',
      text: 'The instructor also mentioned it\'s great for undo/redo features. Pretty cool use case!',
    },
    {
      id: '7',
      authorName: 'Michael Torres',
      isCurrentUser: false,
      timestamp: '10:33 AM',
      text: 'Thanks for the tips! I\'m going to rewatch that lesson tonight.',
    },
    {
      id: '8',
      authorName: 'Jamal Williams',
      isCurrentUser: false,
      timestamp: '10:35 AM',
      text: 'Anyone starting the Context API module yet?',
    },
    {
      id: '9',
      authorName: 'You',
      isCurrentUser: true,
      timestamp: '10:36 AM',
      text: 'I am! The global state management concepts are really clicking for me.',
    },
    {
      id: '10',
      authorName: 'Sarah Chen',
      isCurrentUser: false,
      timestamp: '10:38 AM',
      text: 'Same here. The examples in the course are super practical.',
    },
    {
      id: '11',
      authorName: 'Priya Patel',
      isCurrentUser: false,
      timestamp: '10:40 AM',
      text: 'Quick question: is the quiz for this module timed?',
    },
    {
      id: '12',
      authorName: 'Michael Torres',
      isCurrentUser: false,
      timestamp: '10:41 AM',
      text: 'Yes, 15 minutes. But you can retake it if needed.',
    },
    {
      id: '13',
      authorName: 'You',
      isCurrentUser: true,
      timestamp: '10:42 AM',
      text: 'I got 85% on my first try. The questions are fair if you\'ve watched the lessons.',
    },
    {
      id: '14',
      authorName: 'Jamal Williams',
      isCurrentUser: false,
      timestamp: '10:44 AM',
      text: 'Good to know! I\'ll tackle it this weekend.',
    },
    {
      id: '15',
      authorName: 'Sarah Chen',
      isCurrentUser: false,
      timestamp: '10:45 AM',
      text: 'Thanks everyone for the help! This study group is amazing 🙌',
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [onlineCount] = useState(12);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        authorName: 'You',
        isCurrentUser: true,
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        }),
        text: inputValue,
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">Course Circle</h2>
            <p className="text-blue-100 text-sm">{courseName}</p>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium">{onlineCount} online</span>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="h-[440px] overflow-y-auto p-6 bg-slate-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] ${
                  message.isCurrentUser ? 'order-2' : 'order-1'
                }`}
              >
                {!message.isCurrentUser && (
                  <div className="text-xs font-medium text-slate-600 mb-1 px-1">
                    {message.authorName}
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.isCurrentUser
                      ? 'bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white rounded-br-sm'
                      : 'bg-white text-slate-900 shadow-sm rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
                <div
                  className={`text-xs text-slate-500 mt-1 px-1 ${
                    message.isCurrentUser ? 'text-right' : 'text-left'
                  }`}
                >
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input footer */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Send a message to your circle…"
            className="flex-1 px-5 py-3 bg-slate-100 rounded-full border border-slate-200 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              inputValue.trim()
                ? 'bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white hover:shadow-lg'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CircleChat;
