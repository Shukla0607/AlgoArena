import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import {
  Users,
  Play,
  MessageCircle,
  Code,
  Sparkles,
  UserPlus,
  Share,
  Video,
  Mic,
  MicOff,
  VideoOff,
  Send,
  Settings,
  Crown,
} from "lucide-react";
import Navigation from "../components/Navigation";
import ChatInterface from "../components/ChatInterface";

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  color: string;
  isOnline: boolean;
  cursor?: { line: number; column: number };
}

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  type: "message" | "system" | "ai";
  isCurrentUser?: boolean;
}

const Debug = () => {
  const [code, setCode] = useState(`# Collaborative Two Sum Solution
def twoSum(nums, target):
    """
    Find two numbers that add up to target
    """
    hashmap = {}

    for i, num in enumerate(nums):
        complement = target - num

        if complement in hashmap:
            return [hashmap[complement], i]

        hashmap[num] = i

    return []

# Test the function
nums = [2, 7, 11, 15]
target = 9
result = twoSum(nums, target)
print(f"Result: {result}")
`);

  const [isConnected, setIsConnected] = useState(true);
  const [collaborators] = useState<Collaborator[]>([
    {
      id: "1",
      name: "Alex (You)",
      avatar: "A",
      color: "violet",
      isOnline: true,
      cursor: { line: 8, column: 15 },
    },
    {
      id: "2",
      name: "Sarah",
      avatar: "S",
      color: "cyan",
      isOnline: true,
      cursor: { line: 12, column: 30 },
    },
    {
      id: "3",
      name: "Mike",
      avatar: "M",
      color: "orange",
      isOnline: false,
    },
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "sys-1",
      user: "System",
      message: "Sarah joined the session",
      timestamp: "2 min ago",
      type: "system",
    },
    {
      id: "msg-2",
      user: "Sarah",
      message: "Hey! I think we can optimize this solution",
      timestamp: "1 min ago",
      type: "message",
      isCurrentUser: false,
    },
    {
      id: "msg-3",
      user: "Alex",
      message: "Sure! What do you have in mind?",
      timestamp: "30s ago",
      type: "message",
      isCurrentUser: true,
    },
    {
      id: "ai-4",
      user: "AI Assistant",
      message:
        "I can help analyze the algorithm complexity. Would you like me to review your current approach?",
      timestamp: "10s ago",
      type: "ai",
    },
  ]);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);

  const sendMessage = (messageText: string) => {
    if (messageText.trim()) {
      // Handle AI responses
      if (messageText.startsWith("AI_RESPONSE: ")) {
        const aiMessage: ChatMessage = {
          id: `ai-${Date.now()}`,
          user: "AI Assistant",
          message: messageText.replace("AI_RESPONSE: ", ""),
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "ai",
        };
        setChatMessages((prev) => [...prev, aiMessage]);
        return;
      }

      // Handle AI requests
      if (messageText.startsWith("@AI ")) {
        const userMessage: ChatMessage = {
          id: `user-${Date.now()}`,
          user: "Alex",
          message: messageText.replace("@AI ", ""),
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "message",
          isCurrentUser: true,
        };
        setChatMessages((prev) => [...prev, userMessage]);
        return;
      }

      // Regular user message
      const message: ChatMessage = {
        id: `msg-${Date.now()}`,
        user: "Alex",
        message: messageText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "message",
        isCurrentUser: true,
      };
      setChatMessages((prev) => [...prev, message]);
    }
  };

  const getCursorColor = (color: string) => {
    const colors = {
      violet: "bg-violet-500",
      cyan: "bg-cyan-500",
      orange: "bg-orange-500",
    };
    return colors[color as keyof typeof colors] || "bg-violet-500";
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />

      <div className="pt-20">
        <div className="h-screen flex">
          {/* Left Sidebar - Collaborators & Chat */}
          <div
            className="w-80 bg-slate-800 border-r border-slate-600 flex flex-col"
            style={{ height: "calc(100vh - 80px)" }}
          >
            {/* Session Header */}
            <div className="p-4 border-b border-slate-600 bg-slate-800/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Debug Session</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">
                    Connected
                  </span>
                </div>
              </div>

              {/* Session Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-2 rounded-lg transition-colors ${
                    isMicOn
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                  }`}
                >
                  {isMicOn ? (
                    <Mic className="w-4 h-4" />
                  ) : (
                    <MicOff className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-2 rounded-lg transition-colors ${
                    isVideoOn
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                  }`}
                >
                  {isVideoOn ? (
                    <Video className="w-4 h-4" />
                  ) : (
                    <VideoOff className="w-4 h-4" />
                  )}
                </button>

                <button className="p-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors text-white">
                  <UserPlus className="w-4 h-4" />
                </button>

                <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-slate-300">
                  <Share className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Collaborators */}
            <div className="p-4 border-b border-slate-600">
              <h3 className="text-sm font-semibold text-white mb-3">
                Participants ({collaborators.filter((c) => c.isOnline).length})
              </h3>
              <div className="space-y-3">
                {collaborators.map((collaborator) => (
                  <div
                    key={collaborator.id}
                    className="flex items-center space-x-3"
                  >
                    <div className="relative">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold bg-gradient-to-r ${
                          collaborator.color === "violet"
                            ? "from-violet-500 to-violet-600"
                            : collaborator.color === "cyan"
                              ? "from-cyan-500 to-cyan-600"
                              : "from-orange-500 to-orange-600"
                        }`}
                      >
                        {collaborator.avatar}
                      </div>
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-800 ${
                          collaborator.isOnline
                            ? "bg-green-400"
                            : "bg-slate-500"
                        }`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-white text-sm font-medium">
                          {collaborator.name}
                        </span>
                        {collaborator.id === "1" && (
                          <Crown className="w-3 h-3 text-yellow-400" />
                        )}
                      </div>
                      <div className="text-xs text-slate-400">
                        {collaborator.isOnline ? "Online" : "Offline"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat */}
            <div className="flex-1 flex flex-col min-h-0">
              <ChatInterface
                messages={chatMessages}
                onSendMessage={sendMessage}
                currentUser="Alex"
              />
            </div>
          </div>

          {/* Right Side - Code Editor */}
          <div className="flex-1 flex flex-col">
            {/* Editor Header */}
            <div className="p-4 border-b border-slate-600 bg-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Code className="w-5 h-5 text-violet-400" />
                    <span className="text-white font-medium">two-sum.py</span>
                  </div>

                  {/* Live Cursors Indicator */}
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {collaborators
                        .filter((c) => c.isOnline && c.cursor)
                        .map((collaborator) => (
                          <div
                            key={collaborator.id}
                            className={`w-6 h-6 rounded-full border-2 border-slate-800 flex items-center justify-center text-white text-xs font-bold ${getCursorColor(
                              collaborator.color,
                            )}`}
                          >
                            {collaborator.avatar}
                          </div>
                        ))}
                    </div>
                    <span className="text-slate-400 text-sm">
                      {
                        collaborators.filter((c) => c.isOnline && c.cursor)
                          .length
                      }{" "}
                      editing
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-violet-500 focus:outline-none">
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                  </select>

                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-white text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Play className="w-4 h-4" />
                      <span>Run</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="flex-1 relative">
              <Editor
                height="100%"
                language="python"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 14,
                  lineNumbers: "on",
                  renderLineHighlight: "line",
                  selectOnLineNumbers: true,
                  automaticLayout: true,
                  tabSize: 4,
                  insertSpaces: true,
                  wordWrap: "on",
                  cursorBlinking: "smooth",
                  cursorSmoothCaretAnimation: "on",
                }}
              />

              {/* Live Cursor Overlays */}
              <div className="absolute inset-0 pointer-events-none">
                {collaborators
                  .filter((c) => c.isOnline && c.cursor && c.id !== "1")
                  .map((collaborator) => (
                    <div key={collaborator.id}>
                      {/* Simulated cursor position */}
                      <div
                        className="absolute"
                        style={{
                          top: `${collaborator.cursor!.line * 1.4}em`,
                          left: `${collaborator.cursor!.column * 0.6}em`,
                        }}
                      >
                        <div
                          className={`w-0.5 h-5 ${getCursorColor(
                            collaborator.color,
                          )}`}
                        ></div>
                        <div
                          className={`absolute -top-6 left-0 px-2 py-1 rounded text-xs font-medium text-white whitespace-nowrap ${getCursorColor(
                            collaborator.color,
                          )}`}
                        >
                          {collaborator.name}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Output Panel */}
            <div className="h-48 border-t border-slate-600 bg-slate-800">
              <div className="p-4 border-b border-slate-600">
                <h3 className="text-lg font-semibold text-white">
                  Collaborative Output
                </h3>
              </div>
              <div className="p-4">
                <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm font-medium">
                      Execution Successful
                    </span>
                  </div>
                  <div className="font-mono text-sm text-slate-200">
                    Result: [0, 1]
                  </div>
                  <div className="text-xs text-slate-400 mt-2">
                    Runtime: 52ms • Memory: 15.2MB • Run by Sarah
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debug;
