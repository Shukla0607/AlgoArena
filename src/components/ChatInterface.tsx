import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Brain } from "lucide-react";
import MessageList from "./MessageList";

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  type: "message" | "system" | "ai";
  isCurrentUser?: boolean;
}

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  currentUser: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  currentUser,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [isAiMode, setIsAiMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      if (isAiMode) {
        // Send to AI
        onSendMessage(`@AI ${newMessage}`);

        // Simulate AI response after a delay
        setTimeout(() => {
          const aiResponses = [
            "That's an interesting approach! Have you considered using a hash map for O(1) lookup?",
            "Great question! For this problem, I'd recommend starting with the brute force solution and then optimizing.",
            "I see what you're trying to do. The time complexity can be improved by using dynamic programming.",
            "Nice algorithm! You might want to handle edge cases like empty arrays or negative numbers.",
            "That's a solid solution! For better readability, consider adding some comments to explain the logic.",
            "Consider the space-time tradeoff here. Sometimes a slightly more complex solution with better time complexity is worth it.",
            "Have you tested this with edge cases? What happens with empty inputs or very large datasets?",
            "This looks good! One optimization could be to use a two-pointer technique to reduce the space complexity.",
          ];
          const randomResponse =
            aiResponses[Math.floor(Math.random() * aiResponses.length)];
          onSendMessage(`AI_RESPONSE: ${randomResponse}`);
        }, 1500);
      } else {
        onSendMessage(newMessage);
      }
      setNewMessage("");
    }
  };

  const getUserAvatar = (message: ChatMessage) => {
    if (message.type === "ai") {
      return (
        <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
      );
    }

    const colors = {
      Alex: "from-blue-500 to-blue-600",
      Sarah: "from-cyan-500 to-cyan-600",
      Mike: "from-orange-500 to-orange-600",
    };

    const color =
      colors[message.user as keyof typeof colors] ||
      "from-slate-500 to-slate-600";

    return (
      <div
        className={`w-8 h-8 bg-gradient-to-r ${color} rounded-full flex items-center justify-center flex-shrink-0`}
      >
        <span className="text-white text-sm font-bold">
          {message.user.charAt(0)}
        </span>
      </div>
    );
  };

  const formatTime = (timestamp: string) => {
    if (timestamp === "now") return "now";
    return timestamp;
  };

  return (
    <div className="flex flex-col h-full max-h-full">
      {/* Chat Header */}
      <div className="flex-shrink-0 p-4 border-b border-slate-600 bg-slate-800/30">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Chat</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsAiMode(!isAiMode)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                isAiMode
                  ? "bg-violet-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {isAiMode ? (
                <>
                  <Brain className="w-3 h-3" />
                  <span>AI Mode</span>
                </>
              ) : (
                <>
                  <User className="w-3 h-3" />
                  <span>Team</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <MessageList messages={messages} currentUser={currentUser} />

      {/* Message Input */}
      <div className="flex-shrink-0 p-4 border-t border-slate-600 bg-slate-800/20">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={
                isAiMode
                  ? "Ask AI assistant about algorithms..."
                  : "Type a message..."
              }
              className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 pr-12"
            />

            {isAiMode && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Bot className="w-4 h-4 text-violet-400" />
              </div>
            )}
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`p-3 rounded-xl transition-all duration-200 flex-shrink-0 ${
              isAiMode
                ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {isAiMode && (
          <div className="mt-2 text-xs text-violet-400 flex items-center space-x-1">
            <Sparkles className="w-3 h-3" />
            <span>AI mode: Get help with algorithms and coding problems</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
