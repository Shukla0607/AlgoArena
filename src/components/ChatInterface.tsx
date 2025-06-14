import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Brain } from "lucide-react";

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      if (isAiMode) {
        // Send to AI
        onSendMessage(`@AI ${newMessage}`);

        // Simulate AI response
        setTimeout(() => {
          const aiResponses = [
            "That's an interesting approach! Have you considered using a hash map for O(1) lookup?",
            "Great question! For this problem, I'd recommend starting with the brute force solution and then optimizing.",
            "I see what you're trying to do. The time complexity can be improved by using dynamic programming.",
            "Nice algorithm! You might want to handle edge cases like empty arrays or negative numbers.",
            "That's a solid solution! For better readability, consider adding some comments to explain the logic.",
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

  const getMessageAlignment = (message: ChatMessage) => {
    if (message.type === "system") return "center";
    if (message.type === "ai") return "left";
    if (message.isCurrentUser || message.user === currentUser) return "right";
    return "left";
  };

  const getMessageStyle = (message: ChatMessage) => {
    const alignment = getMessageAlignment(message);

    if (message.type === "system") {
      return "bg-slate-800/50 text-slate-400 text-center mx-auto max-w-xs";
    }

    if (message.type === "ai") {
      return "bg-gradient-to-r from-violet-600 to-purple-600 text-white ml-0 mr-auto max-w-xs lg:max-w-sm";
    }

    if (alignment === "right") {
      return "bg-gradient-to-r from-blue-600 to-blue-700 text-white ml-auto mr-0 max-w-xs lg:max-w-sm";
    }

    return "bg-slate-700 text-white ml-0 mr-auto max-w-xs lg:max-w-sm border border-slate-600";
  };

  const getUserAvatar = (message: ChatMessage) => {
    if (message.type === "ai") {
      return (
        <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
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
        className={`w-8 h-8 bg-gradient-to-r ${color} rounded-full flex items-center justify-center`}
      >
        <span className="text-white text-sm font-bold">
          {message.user.charAt(0)}
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Mode Toggle */}
      <div className="p-3 border-b border-slate-600 bg-slate-800/30">
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => {
            const alignment = getMessageAlignment(message);

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex ${
                  alignment === "right"
                    ? "justify-end"
                    : alignment === "center"
                      ? "justify-center"
                      : "justify-start"
                }`}
              >
                {message.type !== "system" && (
                  <div
                    className={`flex items-end space-x-2 ${
                      alignment === "right"
                        ? "flex-row-reverse space-x-reverse"
                        : "flex-row"
                    }`}
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      {getUserAvatar(message)}
                    </div>

                    {/* Message Bubble */}
                    <div className="flex flex-col">
                      {/* Username and timestamp */}
                      <div
                        className={`flex items-center space-x-2 mb-1 ${
                          alignment === "right"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <span className="text-xs font-medium text-white">
                          {message.type === "ai"
                            ? "AI Assistant"
                            : message.user}
                        </span>
                        <span className="text-xs text-slate-400">
                          {message.timestamp}
                        </span>
                      </div>

                      {/* Message content */}
                      <div
                        className={`rounded-2xl px-4 py-2 ${getMessageStyle(message)}`}
                      >
                        {message.type === "ai" && (
                          <div className="flex items-center space-x-1 mb-1">
                            <Sparkles className="w-3 h-3 text-yellow-300" />
                            <span className="text-xs text-yellow-300 font-medium">
                              AI
                            </span>
                          </div>
                        )}
                        <p className="text-sm leading-relaxed">
                          {message.message
                            .replace("AI_RESPONSE: ", "")
                            .replace("@AI ", "")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* System messages */}
                {message.type === "system" && (
                  <div
                    className={`text-xs py-2 px-4 rounded-full ${getMessageStyle(message)}`}
                  >
                    {message.message}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-slate-600 bg-slate-800/20">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
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
            className={`p-3 rounded-xl transition-all duration-200 ${
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
