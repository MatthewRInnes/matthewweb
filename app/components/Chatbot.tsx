import React, { useState, useRef, useEffect } from 'react';
import { FaComments, FaTimes, FaMinus, FaPaperPlane } from 'react-icons/fa';
import { processUserInput, getQuickReplyOptions } from '../services/chatLogic';

// Types for our chat messages
type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  options?: string[];
};

// Initial bot message
const initialMessage: Message = {
  id: 1,
  text: "Hi there! 👋 I'm here to help 24/7. What can I help you with today?",
  sender: 'bot',
  options: [
    "I need a website",
    "I need a logo",
    "I'm browsing products",
    "Just looking / Other"
  ]
};

// Chat state type
type ChatState = {
  currentFlow: string;
  answers: Record<string, string>;
};

// Main Chatbot component
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [inputValue, setInputValue] = useState('');
  const [chatState, setChatState] = useState<ChatState>({
    currentFlow: '',
    answers: {}
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Process user input and get bot response
    const { message, newState } = processUserInput(text, chatState);
    setChatState(newState);

    // Add bot response with quick reply options
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: message,
        sender: 'bot',
        options: getQuickReplyOptions(newState)
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  // Handle quick reply options
  const handleQuickReply = (option: string) => {
    handleSendMessage(option);
  };

  return (
    <div className="fixed bottom-0 right-0 z-[9999] pointer-events-none">
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 pointer-events-auto">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-accent hover:bg-accent/90 text-white px-6 py-4 rounded-full shadow-lg flex items-center space-x-3 transition-all duration-300 hover:scale-105 animate-bounce"
          title="Open chat"
        >
          <FaComments className="text-2xl" />
          <span className="font-bold text-lg">Chat 24/7</span>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-xl transition-all duration-300 pointer-events-auto"
          style={{ 
            height: isMinimized ? '4rem' : '600px',
            zIndex: 9998
          }}
        >
          {/* Chat Header */}
          <div className="bg-primary text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat with us</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:text-accent transition-colors"
                title={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                <FaMinus />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-accent transition-colors"
                title="Close chat"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          {!isMinimized && (
            <>
              <div className="h-[calc(600px-8rem)] overflow-y-auto p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 ${
                      message.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-accent text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.text}
                    </div>
                    {message.options && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickReply(option)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors"
                            title={`Quick reply: ${option}`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-accent"
                  />
                  <button
                    onClick={() => handleSendMessage(inputValue)}
                    className="bg-accent hover:bg-accent/90 text-white p-2 rounded-lg transition-colors"
                    title="Send message"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
} 