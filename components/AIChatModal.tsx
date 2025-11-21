import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';
import { chatWithBOSAssistant } from '../services/geminiService';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

interface AIChatModalProps {
  contextData: string; // JSON string of current inventory/state for RAG-lite
}

const AIChatModal: React.FC<AIChatModalProps> = ({ contextData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init', sender: 'bot', text: 'Hello! I am DealerBot. How can I help you with the inventory or sales today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const botResponseText = await chatWithBOSAssistant(input, contextData);
    
    const botMsg: Message = { id: (Date.now() + 1).toString(), sender: 'bot', text: botResponseText };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <>
      {/* FAB */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg z-50 transition-all duration-300 ${isOpen ? 'bg-red-500 rotate-45' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-110'}`}
      >
        {isOpen ? <PlusIcon className="text-white w-6 h-6" /> : <Sparkles className="text-white w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-fade-in-up overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="font-bold">DealerBot AI</h3>
              <p className="text-xs text-blue-100">Powered by Gemini 2.5 Flash</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-md' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-xl rounded-tl-none border border-gray-100 shadow-sm">
                  <Loader2 size={16} className="animate-spin text-blue-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about inventory..."
              className="flex-1 bg-gray-100 border-0 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const PlusIcon = ({className}:{className?:string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
)

export default AIChatModal;