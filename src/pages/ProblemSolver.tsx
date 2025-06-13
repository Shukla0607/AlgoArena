import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import {
  Play,
  RotateCcw,
  Settings,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Terminal,
  Eye,
  EyeOff,
  Lightbulb,
  Code,
} from "lucide-react";
import Navigation from "../components/Navigation";
import { getProblemById, type Problem, type TestCase } from "../data/problems";

const ProblemSolver = () => {
  const { id } = useParams<{ id: string }>();
  const [language, setLanguage] =
    useState<keyof Problem["starterCode"]>("python");
  const [code, setCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "description" | "hints" | "submissions"
  >("description");
  const [testResults, setTestResults] = useState<TestCase[]>([]);
  const [showTestOutput, setShowTestOutput] = useState(false);

  // Get problem data
  const problem = getProblemById(parseInt(id || "1"));

  if (!problem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-midnight via-midnight to-slate-900 flex items-center justify-center">
        <Navigation />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-light mb-4">
            Problem Not Found
          </h1>
          <Link
            to="/problems"
            className="text-cyan hover:text-cyan/80 transition-colors"
          >
            ← Back to Problems
          </Link>
        </div>
      </div>
    );
  }

  useEffect(() => {
    setCode(problem.starterCode[language]);
  }, [language, problem]);

  const runCode = async () => {
    setIsRunning(true);
    setShowTestOutput(true);

    // Simulate code execution
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock test results
    const results = problem.testCases.map((testCase) => ({
      ...testCase,
      actualOutput: Math.random() > 0.3 ? testCase.expectedOutput : "[1,0]", // 70% pass rate
      passed: Math.random() > 0.3,
    }));

    setTestResults(results);
    setIsRunning(false);
  };

  const resetCode = () => {
    setCode(problem.starterCode[language]);
    setTestResults([]);
    setShowTestOutput(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "Medium":
        return "text-highlight bg-highlight/10 border-highlight/20";
      case "Hard":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-light/60 bg-slate/10 border-slate/20";
    }
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

  const passedTests = testResults.filter((test) => test.passed).length;
  const totalTests = testResults.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight via-midnight to-slate-900">
      <Navigation />

      <div className="pt-20">
        <div className="h-screen flex">
          {/* Left Panel - Problem Description */}
          <div className="w-1/2 border-r border-slate/20 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-slate/20">
              <div className="flex items-center justify-between mb-4">
                <Link
                  to="/problems"
                  className="flex items-center space-x-2 text-light/70 hover:text-cyan transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Problems</span>
                </Link>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-3 py-1 border rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}
                  >
                    {problem.difficulty}
                  </span>
                </div>
              </div>

              <h1 className="text-2xl font-bold text-light mb-2">
                {problem.id}. {problem.title}
              </h1>

              {/* Tabs */}
              <div className="flex space-x-4">
                {[
                  { key: "description", label: "Description", icon: Code },
                  { key: "hints", label: "Hints", icon: Lightbulb },
                  {
                    key: "submissions",
                    label: "Submissions",
                    icon: CheckCircle,
                  },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        activeTab === tab.key
                          ? "bg-cyan/20 text-cyan"
                          : "text-light/70 hover:text-cyan hover:bg-cyan/10"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === "description" && (
                <div className="space-y-6">
                  {/* Problem Description */}
                  <div className="prose prose-invert max-w-none">
                    <div className="text-light/80 leading-relaxed whitespace-pre-line">
                      {problem.description}
                    </div>
                  </div>

                  {/* Examples */}
                  <div>
                    <h3 className="text-lg font-semibold text-light mb-4">
                      Examples
                    </h3>
                    <div className="space-y-4">
                      {problem.examples.map((example, index) => (
                        <div
                          key={index}
                          className="bg-slate/20 border border-slate/30 rounded-lg p-4"
                        >
                          <div className="font-semibold text-light mb-2">
                            Example {index + 1}:
                          </div>
                          <div className="font-mono text-sm space-y-1">
                            <div>
                              <span className="text-light/60">Input: </span>
                              <span className="text-cyan">{example.input}</span>
                            </div>
                            <div>
                              <span className="text-light/60">Output: </span>
                              <span className="text-green-400">
                                {example.output}
                              </span>
                            </div>
                            {example.explanation && (
                              <div>
                                <span className="text-light/60">
                                  Explanation:{" "}
                                </span>
                                <span className="text-light/80">
                                  {example.explanation}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Constraints */}
                  <div>
                    <h3 className="text-lg font-semibold text-light mb-4">
                      Constraints
                    </h3>
                    <ul className="space-y-2">
                      {problem.constraints.map((constraint, index) => (
                        <li
                          key={index}
                          className="text-light/80 font-mono text-sm"
                        >
                          • {constraint}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "hints" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-light">Hints</h3>
                    <button
                      onClick={() => setShowHints(!showHints)}
                      className="flex items-center space-x-2 text-cyan hover:text-cyan/80 transition-colors"
                    >
                      {showHints ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                      <span className="text-sm">
                        {showHints ? "Hide" : "Show"} Hints
                      </span>
                    </button>
                  </div>

                  {showHints ? (
                    <div className="space-y-3">
                      {problem.hints.map((hint, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-highlight/10 border border-highlight/20 rounded-lg p-4"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex items-center justify-center w-6 h-6 bg-highlight/20 rounded-full text-highlight text-sm font-medium">
                              {index + 1}
                            </div>
                            <div className="text-light/80">{hint}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Lightbulb className="w-12 h-12 text-light/30 mx-auto mb-4" />
                      <p className="text-light/60">
                        Click "Show Hints" to reveal helpful tips
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "submissions" && (
                <div className="text-center py-8">
                  <Terminal className="w-12 h-12 text-light/30 mx-auto mb-4" />
                  <p className="text-light/60">
                    No submissions yet. Run your code to see results!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="w-1/2 flex flex-col">
            {/* Editor Header */}
            <div className="p-4 border-b border-slate/20 bg-midnight/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Language Selector */}
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                    className="bg-slate/20 border border-slate/30 rounded-lg px-3 py-2 text-light text-sm focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/20"
                  >
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                  </select>

                  {/* Settings */}
                  <button className="p-2 text-light/60 hover:text-cyan transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>

                  {/* Reset */}
                  <button
                    onClick={resetCode}
                    className="p-2 text-light/60 hover:text-cyan transition-colors"
                    title="Reset to starter code"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Run Button */}
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRunning ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Running...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Run</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Editor */}
            <div className="flex-1">
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

            {/* Test Results Panel */}
            {showTestOutput && (
              <div className="h-64 border-t border-slate/20 bg-midnight/30">
                <div className="p-4 border-b border-slate/20">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-light">
                      Test Results
                    </h3>
                    {testResults.length > 0 && (
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          passedTests === totalTests
                            ? "bg-green-400/20 text-green-400"
                            : "bg-red-400/20 text-red-400"
                        }`}
                      >
                        {passedTests}/{totalTests} Passed
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 overflow-y-auto max-h-48">
                  {isRunning ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-center">
                        <div className="w-8 h-8 border-2 border-cyan/30 border-t-cyan rounded-full animate-spin mx-auto mb-2" />
                        <p className="text-light/60">Running test cases...</p>
                      </div>
                    </div>
                  ) : testResults.length > 0 ? (
                    <div className="space-y-3">
                      {testResults.map((test) => (
                        <div
                          key={test.id}
                          className={`border rounded-lg p-3 ${
                            test.passed
                              ? "border-green-400/30 bg-green-400/10"
                              : "border-red-400/30 bg-red-400/10"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-light/80 font-medium">
                              Test Case {test.id}
                              {test.hidden && (
                                <span className="ml-2 text-xs text-light/50">
                                  (Hidden)
                                </span>
                              )}
                            </span>
                            {test.passed ? (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-400" />
                            )}
                          </div>
                          <div className="font-mono text-sm space-y-1">
                            {!test.hidden && (
                              <div>
                                <span className="text-light/60">Input: </span>
                                <span className="text-cyan">{test.input}</span>
                              </div>
                            )}
                            <div>
                              <span className="text-light/60">Expected: </span>
                              <span className="text-green-400">
                                {test.expectedOutput}
                              </span>
                            </div>
                            {test.actualOutput && (
                              <div>
                                <span className="text-light/60">Actual: </span>
                                <span
                                  className={
                                    test.passed
                                      ? "text-green-400"
                                      : "text-red-400"
                                  }
                                >
                                  {test.actualOutput}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Clock className="w-8 h-8 text-light/30 mx-auto mb-2" />
                      <p className="text-light/60">
                        Run your code to see test results
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolver;
