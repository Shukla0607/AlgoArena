import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  type: "message" | "system" | "ai";
  isCurrentUser?: boolean;
}

interface MessageListProps {
  messages: ChatMessage[];
  currentUser: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages]);

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

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4"
      style={{
        maxHeight: "calc(100vh - 280px)",
        minHeight: "200px",
        scrollBehavior: "smooth",
      }}
    >
      {messages.map((message, index) => {
        const isCurrentUserMessage =
          message.isCurrentUser || message.user === currentUser;

        // System messages
        if (message.type === "system") {
          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center my-4"
            >
              <div className="text-xs py-2 px-4 bg-slate-800/60 text-slate-400 rounded-full border border-slate-700">
                {message.message}
              </div>
            </motion.div>
          );
        }

        // Regular and AI messages
        return (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: Math.min(index * 0.1, 0.5),
              ease: "easeOut",
            }}
            className={`flex items-end space-x-2 ${
              isCurrentUserMessage
                ? "flex-row-reverse space-x-reverse"
                : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div className="flex-shrink-0">{getUserAvatar(message)}</div>

            {/* Message Content */}
            <div
              className={`flex flex-col max-w-xs lg:max-w-sm ${
                isCurrentUserMessage ? "items-end" : "items-start"
              }`}
            >
              {/* Username and timestamp */}
              <div
                className={`flex items-center space-x-2 mb-1 ${
                  isCurrentUserMessage
                    ? "flex-row-reverse space-x-reverse"
                    : "flex-row"
                }`}
              >
                <span className="text-xs font-medium text-white">
                  {message.type === "ai" ? "AI Assistant" : message.user}
                </span>
                <span className="text-xs text-slate-400">
                  {message.timestamp}
                </span>
              </div>

              {/* Message bubble */}
              <div
                className={`rounded-2xl px-4 py-2 max-w-full break-words word-wrap ${
                  message.type === "ai"
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                    : isCurrentUserMessage
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                      : "bg-slate-700 text-white border border-slate-600 shadow-sm"
                }`}
              >
                {message.type === "ai" && (
                  <div className="flex items-center space-x-1 mb-1">
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                    <span className="text-xs text-yellow-300 font-medium">
                      AI
                    </span>
                  </div>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.message
                    .replace("AI_RESPONSE: ", "")
                    .replace("@AI ", "")}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Invisible scroll anchor */}
      <div ref={messagesEndRef} className="h-4 w-full" />
    </div>
  );
};

export default MessageList;
