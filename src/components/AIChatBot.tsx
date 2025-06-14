import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Sparkles,
  Code,
  Lightbulb,
  BookOpen,
  Zap,
} from "lucide-react";

interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: string;
  type?: "suggestion" | "explanation" | "code" | "general";
}

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      message:
        "Hi! I'm your AI coding assistant. I can help you with algorithms, debugging, and problem-solving strategies. What would you like to work on?",
      isUser: false,
      timestamp: "now",
      type: "general",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickSuggestions = [
    {
      text: "Explain this algorithm",
      icon: BookOpen,
      type: "explanation" as const,
    },
    {
      text: "Optimize my code",
      icon: Zap,
      type: "suggestion" as const,
    },
    {
      text: "Debug help",
      icon: Code,
      type: "code" as const,
    },
    {
      text: "Algorithm hints",
      icon: Lightbulb,
      type: "suggestion" as const,
    },
  ];

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (message.includes("algorithm") || message.includes("complexity")) {
      return "For algorithm analysis, I'd recommend starting with the time and space complexity. What specific algorithm are you working with? I can help break down the approach step by step.";
    }

    if (message.includes("debug") || message.includes("error")) {
      return "I'd be happy to help debug your code! Please share the error message or describe the unexpected behavior you're seeing. Common issues include off-by-one errors, null pointer exceptions, and logic errors in conditionals.";
    }

    if (message.includes("optimize") || message.includes("improve")) {
      return "Great question! Code optimization can involve several approaches: improving time complexity (better algorithms), space complexity (memory usage), or code readability. What specific area would you like to focus on?";
    }

    if (message.includes("two sum") || message.includes("twosum")) {
      return "Two Sum is a classic problem! The optimal solution uses a hash map for O(n) time complexity. As you iterate through the array, check if the complement (target - current number) exists in the hash map. Would you like me to walk through the implementation?";
    }

    if (message.includes("binary search")) {
      return "Binary search is a powerful O(log n) algorithm for sorted arrays. The key is maintaining the invariant that your target (if it exists) is always within your search bounds. Remember: left <= mid < right to avoid infinite loops!";
    }

    if (message.includes("dynamic programming") || message.includes("dp")) {
      return "Dynamic Programming is about breaking down problems into overlapping subproblems. Start by identifying the recursive structure, then optimize using memoization (top-down) or tabulation (bottom-up). What DP problem are you working on?";
    }

    if (message.includes("hello") || message.includes("hi")) {
      return "Hello! I'm here to help you with coding problems, algorithm explanations, debugging, and optimization tips. What would you like to work on today?";
    }

    // Default responses for various contexts
    const responses = [
      "That's an interesting problem! Could you provide more details about what you're trying to achieve?",
      "I'd be happy to help! Can you share more context about the specific challenge you're facing?",
      "Great question! Let me think about the best approach for this. What constraints or requirements do you have?",
      "I can definitely assist with that! What programming language are you using, and what have you tried so far?",
      "That's a common algorithmic challenge. Let's break it down step by step. What's your current approach?",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = (messageText?: string) => {
    const text = messageText || inputValue;
    if (!text.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: text,
      isUser: true,
      timestamp: "now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(
      () => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          message: getAIResponse(text),
          isUser: false,
          timestamp: "now",
          type: "general",
        };

        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      },
      1000 + Math.random() * 1500,
    ); // 1-2.5 second delay
  };

  const getMessageTypeIcon = (type?: string) => {
    switch (type) {
      case "suggestion":
        return <Lightbulb className="w-3 h-3 text-yellow-400" />;
      case "explanation":
        return <BookOpen className="w-3 h-3 text-blue-400" />;
      case "code":
        return <Code className="w-3 h-3 text-green-400" />;
      default:
        return <Sparkles className="w-3 h-3 text-violet-400" />;
    }
  };

  return (
    <>
      {/* Chat Bot Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-200 ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Bot className="w-6 h-6" />
      </motion.button>

      {/* Chat Bot Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-slate-800 border border-slate-600 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">AI Assistant</h3>
                    <p className="text-xs text-white/80">Always here to help</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs rounded-2xl px-4 py-2 ${
                      message.isUser
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700 text-white border border-slate-600"
                    }`}
                  >
                    {!message.isUser && message.type && (
                      <div className="flex items-center space-x-1 mb-1">
                        {getMessageTypeIcon(message.type)}
                        <span className="text-xs text-slate-400 capitalize">
                          {message.type}
                        </span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{message.message}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-slate-700 border border-slate-600 rounded-2xl px-4 py-2">
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-400 ml-2">
                        AI is thinking...
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <div className="grid grid-cols-2 gap-2">
                  {quickSuggestions.map((suggestion, index) => {
                    const Icon = suggestion.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => sendMessage(suggestion.text)}
                        className="flex items-center space-x-2 p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-left"
                      >
                        <Icon className="w-4 h-4 text-violet-400" />
                        <span className="text-xs text-white">
                          {suggestion.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-slate-600">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask about algorithms, debugging, optimization..."
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-xl px-3 py-2 text-white placeholder-slate-400 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2 bg-violet-600 hover:bg-violet-700 rounded-xl transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatBot;
