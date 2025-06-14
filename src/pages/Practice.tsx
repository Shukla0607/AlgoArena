import React, { useState } from "react";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import {
  Play,
  RotateCcw,
  Settings,
  Terminal,
  CheckCircle,
  XCircle,
  Code,
} from "lucide-react";
import Navigation from "../components/Navigation";

const Practice = () => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  const starterCode = {
    python: `# Welcome to AlgoArena Practice Mode!
# Write any code you want to test here

def solution():
    # Your code here
    return "Hello, AlgoArena!"

# Test your function
if __name__ == "__main__":
    result = solution()
    print(result)`,
    javascript: `// Welcome to AlgoArena Practice Mode!
// Write any code you want to test here

function solution() {
    // Your code here
    return "Hello, AlgoArena!";
}

// Test your function
console.log(solution());`,
    cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Welcome to AlgoArena Practice Mode!
// Write any code you want to test here

string solution() {
    // Your code here
    return "Hello, AlgoArena!";
}

int main() {
    cout << solution() << endl;
    return 0;
}`,
    java: `import java.util.*;

// Welcome to AlgoArena Practice Mode!
// Write any code you want to test here

public class Solution {
    public static String solution() {
        // Your code here
        return "Hello, AlgoArena!";
    }

    public static void main(String[] args) {
        System.out.println(solution());
    }
}`,
  };

  React.useEffect(() => {
    setCode(starterCode[language as keyof typeof starterCode]);
  }, [language]);

  const runCode = async () => {
    setIsRunning(true);
    setShowOutput(true);

    // Simulate code execution
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock output based on language
    const mockOutputs = {
      python: "Hello, AlgoArena!\n",
      javascript: "Hello, AlgoArena!\n",
      cpp: "Hello, AlgoArena!\n",
      java: "Hello, AlgoArena!\n",
    };

    setOutput(mockOutputs[language as keyof typeof mockOutputs]);
    setIsRunning(false);
  };

  const resetCode = () => {
    setCode(starterCode[language as keyof typeof starterCode]);
    setOutput("");
    setShowOutput(false);
  };

  const getLanguageConfig = (lang: string) => {
    const configs = {
      python: { language: "python", theme: "vs-dark" },
      javascript: { language: "javascript", theme: "vs-dark" },
      cpp: { language: "cpp", theme: "vs-dark" },
      java: { language: "java", theme: "vs-dark" },
    };
    return configs[lang as keyof typeof configs] || configs.python;
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />

      <div className="pt-20">
        <div className="h-screen flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate/20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl font-bold text-white mb-2">
                Practice{" "}
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  Playground
                </span>
              </h1>
              <p className="text-slate-300">
                Free-form coding environment. Test algorithms, experiment with
                code, or just practice your skills.
              </p>
            </motion.div>
          </div>

          {/* Editor Section */}
          <div className="flex-1 flex">
            {/* Code Editor */}
            <div className="w-2/3 flex flex-col">
              {/* Editor Header */}
              <div className="p-4 border-b border-slate-600 border-r border-slate-600 bg-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Language Selector */}
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="bg-slate-700 border border-slate-500 rounded-lg px-3 py-2 text-white text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    >
                      <option value="python">Python</option>
                      <option value="javascript">JavaScript</option>
                      <option value="cpp">C++</option>
                      <option value="java">Java</option>
                    </select>

                    {/* Settings */}
                    <button className="p-2 text-slate-400 hover:text-violet-400 transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>

                    {/* Reset */}
                    <button
                      onClick={resetCode}
                      className="p-2 text-text-muted hover:text-primary-light transition-colors"
                      title="Reset to starter code"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Run Button */}
                  <button
                    onClick={runCode}
                    disabled={isRunning}
                    className="flex items-center space-x-2 bg-gradient-to-r from-success to-emerald-500 hover:from-emerald-600 hover:to-emerald-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isRunning ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Running...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Run Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code Editor */}
              <div className="flex-1 border-r border-slate/20">
                <Editor
                  height="100%"
                  {...getLanguageConfig(language)}
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
              </div>
            </div>

            {/* Output Panel */}
            <div className="w-1/3 flex flex-col bg-slate-800">
              {/* Output Header */}
              <div className="p-4 border-b border-slate-600">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-5 h-5 text-slate-300" />
                  <h3 className="text-lg font-semibold text-white">Output</h3>
                </div>
              </div>
              {/* Output Content */}
              <div className="flex-1 p-4 overflow-y-auto">
                {isRunning ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mx-auto mb-2" />
                      <p className="text-slate-400">Executing code...</p>
                    </div>
                  </div>
                ) : showOutput ? (
                  <div className="space-y-4">
                    <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 text-sm font-medium">
                          Execution Successful
                        </span>
                      </div>
                      <div className="font-mono text-sm text-slate-200 whitespace-pre-wrap">
                        {output}
                      </div>
                    </div>

                    <div className="text-xs text-text-muted space-y-1">
                      <div>Runtime: ~0.1s</div>
                      <div>Memory: ~5.2MB</div>
                      <div>
                        Language:{" "}
                        {language.charAt(0).toUpperCase() + language.slice(1)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Terminal className="w-12 h-12 text-text-muted mx-auto mb-4" />
                    <p className="text-text-muted">
                      Run your code to see the output here
                    </p>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="p-4 border-t border-card-border">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-text-secondary">
                    Quick Actions
                  </h4>
                  <div className="space-y-2">
                    <button className="w-full text-left p-2 text-sm text-text-muted hover:text-primary-light hover:bg-darker-bg rounded-lg transition-all duration-200">
                      📚 Algorithm Templates
                    </button>
                    <button className="w-full text-left p-2 text-sm text-text-muted hover:text-primary-light hover:bg-darker-bg rounded-lg transition-all duration-200">
                      🔧 Code Snippets
                    </button>
                    <button className="w-full text-left p-2 text-sm text-text-muted hover:text-primary-light hover:bg-darker-bg rounded-lg transition-all duration-200">
                      📝 Save to Drafts
                    </button>
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

export default Practice;
