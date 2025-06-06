import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import CodeEditor from "./components/CodeEditor";
import ThemeToggle from "./components/ThemeToggle";
import SubmitButton from "./components/SubmitButton";
import UsageCounter from "./components/UsageCounter";
import Icon from "../../components/AppIcon";
import {
  performCompleteAnalysis,
  QuotaExceededError,
  RateLimitError,
} from "../../services/codeAnalysisService";
import { saveAnalysisToHistory } from "../../services/historyService";

const MainCodeInputScreen = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [usageCount, setUsageCount] = useState(() =>
    Number(localStorage.getItem("usage") ?? 0)
  );
  const maxUsage = 5;
  const editorRef = useRef(null);

  // Mock user data
  const userData = {
    isAuthenticated: true,
    name: "John Doe",
    email: "john.doe@example.com",
    plan: "free",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  };

  const supportedLanguages = [
    { value: "javascript", label: "JavaScript", icon: "FileCode" },
    { value: "python", label: "Python", icon: "FileCode" },
    { value: "java", label: "Java", icon: "FileCode" },
    { value: "cpp", label: "C++", icon: "FileCode" },
    { value: "typescript", label: "TypeScript", icon: "FileCode" },
    { value: "html", label: "HTML", icon: "FileCode" },
    { value: "css", label: "CSS", icon: "FileCode" },
    { value: "sql", label: "SQL", icon: "Database" },
  ];

  const handleCodeChange = useCallback((newCode) => {
    setCode(newCode);
    setError("");
  }, []);

  const handleLanguageChange = useCallback((newLanguage) => {
    setLanguage(newLanguage);
  }, []);

  const validateSubmission = () => {
    if (!code.trim()) {
      setError("Please enter some code to analyze");
      return false;
    }

    // Check for API key

    if (
      !import.meta.env.VITE_OPENAI_API_KEY ||
      import.meta.env.VITE_OPENAI_API_KEY === "your_vite_openai_api_key"
    ) {
      setError(
        "OpenAI API key is not configured. Please check your environment variables."
      );
      return false;
    }

    if (usageCount >= maxUsage) {
      setError(
        "You have reached your free usage limit. Please upgrade to continue."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateSubmission()) return;

    setIsLoading(true);
    setError("");

    try {
      // Use OpenAI service for actual code analysis
      const analysisResult = await performCompleteAnalysis(code, language);

      // Save analysis to history
      saveAnalysisToHistory(analysisResult);

      // Update usage count
      setUsageCount((prev) => {
        const next = prev + 1;
        localStorage.setItem("usage", next);
        return next;
      });
      // Navigate to results screen with actual analysis data
      navigate(`/analysis/${analysisResult.id}`);
    } catch (err) {
      console.error("Analysis error:", err);

      // Handle different types of errors
      const msg = err.message?.toLowerCase() ?? "";
      if (err instanceof QuotaExceededError) {
        setError(
          "Your OpenAI API quota has been exceeded. Please check your billing details or upgrade your plan at https://platform.openai.com/account/billing"
        );
      } else if (err instanceof RateLimitError) {
        setError(
          `API rate limit exceeded. ${
            err.retryAfter
              ? `Please wait ${err.retryAfter} seconds before trying again.`
              : "Please wait a moment before trying again."
          }`
        );
      } else if (msg.includes("api key")) {
        setError(
          "OpenAI API key is not configured properly. Please check your environment variables."
        );
      } else {
        setError(err.message || "Failed to analyze code. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError("");
    handleSubmit();
  };

  const handleUpgrade = () => {
    navigate("/subscription-upgrade-modal");
  };

  const placeholderCode = React.useMemo(
    () => ({
      javascript: `// Enter your JavaScript code here
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
      python: `# Enter your Python code here
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))`,
      java: `// Enter your Java code here
public class Fibonacci {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        System.out.println(fibonacci(10));
    }
}`,
      cpp: `// Enter your C++ code here
#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    cout << fibonacci(10) << endl;
    return 0;
}`,
    }),
    []
  );

  useEffect(() => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const id = setTimeout(() => {
      localStorage.removeItem("usage");
      setUsageCount(0);
    }, midnight - now);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />

      <main
        id="main-content"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Top Controls Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
              Code Analyzer
            </h1>
            {/* <div className="hidden sm:block">
              <UsageCounter
                current={usageCount}
                max={maxUsage}
                onUpgrade={handleUpgrade}
              />
            </div> */}
          </div>

          {/* <div className="flex items-center space-x-4">
            <ThemeToggle />
            {userData.isAuthenticated && (
              <div className="flex items-center space-x-2 px-3 py-2 bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark">
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                  {userData.name}
                </span>
                <span className="text-xs px-2 py-1 bg-primary-light text-primary rounded-full">
                  {userData.plan}
                </span>
              </div>
            )}
          </div> */}
        </div>

        {/* Mobile Usage Counter */}
        {/* <div className="sm:hidden mb-6">
          <UsageCounter
            current={usageCount}
            max={maxUsage}
            onUpgrade={handleUpgrade}
          />
        </div> */}

        {/* Language Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-3">
            Programming Language
          </label>
          <div className="flex flex-wrap gap-2">
            {supportedLanguages.map((lang) => (
              <button
                key={lang.value}
                onClick={() => handleLanguageChange(lang.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                  language === lang.value
                    ? "bg-primary text-white border-primary"
                    : "bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark hover:border-primary"
                }`}
              >
                <Icon name={lang.icon} size={16} />
                <span className="text-sm font-medium">{lang.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Code Editor - Takes up 2/3 on desktop */}
          <div className="lg:col-span-2">
            <div className="bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border-light dark:border-border-dark">
                <div className="flex items-center space-x-2">
                  <Icon name="Code" size={20} color="var(--color-primary)" />
                  <span className="font-medium text-text-primary-light dark:text-text-primary-dark">
                    Code Editor
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    {language.toUpperCase()}
                  </span>
                  <button
                    onClick={() => setCode("")}
                    className="p-1 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors duration-200"
                    title="Clear code"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>
              </div>

              <CodeEditor
                ref={editorRef}
                value={code}
                onChange={handleCodeChange}
                language={language}
                placeholder={
                  placeholderCode[language] || placeholderCode.javascript
                }
                height="500px"
              />
            </div>

            {/* Error Display */}
            {error && (
              <div
                className={`mt-4 p-4 rounded-lg border ${
                  error.includes("quota") || error.includes("billing")
                    ? "bg-orange-50 dark:bg-orange-900 dark:bg-opacity-20 border-orange-200 dark:border-orange-800"
                    : error.includes("rate limit")
                    ? "bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 border-yellow-200 dark:border-yellow-800"
                    : "bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border-red-200 dark:border-red-800"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Icon
                    name={
                      error.includes("quota") || error.includes("billing")
                        ? "CreditCard"
                        : error.includes("rate limit")
                        ? "Clock"
                        : "AlertCircle"
                    }
                    size={20}
                    color={
                      error.includes("quota") || error.includes("billing")
                        ? "var(--color-warning)"
                        : error.includes("rate limit")
                        ? "var(--color-warning)"
                        : "var(--color-error)"
                    }
                  />
                  <div className="flex-1">
                    <p
                      className={`text-sm ${
                        error.includes("quota") || error.includes("billing")
                          ? "text-orange-700 dark:text-orange-300"
                          : error.includes("rate limit")
                          ? "text-yellow-700 dark:text-yellow-300"
                          : "text-red-700 dark:text-red-300"
                      }`}
                    >
                      {error}
                    </p>
                    {error.includes("Failed to analyze") && (
                      <button
                        onClick={handleRetry}
                        className="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 underline"
                      >
                        Try again
                      </button>
                    )}
                    {error.includes("quota") && (
                      <div className="mt-3 space-y-2">
                        <a
                          href="https://platform.openai.com/account/billing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-sm text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200 underline"
                        >
                          <Icon name="ExternalLink" size={14} />
                          <span>Check billing details</span>
                        </a>
                      </div>
                    )}
                    {error.includes("rate limit") && (
                      <div className="mt-2">
                        <button
                          onClick={() => {
                            setError("");
                            setTimeout(() => {
                              handleSubmit();
                            }, 5000);
                          }}
                          className="text-sm text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200 underline"
                        >
                          Retry in 5 seconds
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Submit Section */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark p-6">
              <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
                Analyze Code
              </h3>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-6">
                Get detailed explanations, identify issues, and receive
                optimization suggestions for your code using AI.
              </p>

              <SubmitButton
                onClick={handleSubmit}
                isLoading={isLoading}
                disabled={!code.trim() || usageCount >= maxUsage}
              />

              {usageCount >= maxUsage && (
                <div className="mt-4 p-3 bg-warning bg-opacity-10 border border-warning border-opacity-20 rounded-lg">
                  <p className="text-sm text-warning mb-2">
                    Usage limit reached
                  </p>
                  <button
                    onClick={handleUpgrade}
                    className="text-sm text-primary hover:text-primary-hover underline"
                  >
                    Upgrade to Pro
                  </button>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark p-6">
              <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/history-saved-analyses-screen")}
                  className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <Icon
                    name="History"
                    size={20}
                    color="var(--color-text-secondary-light)"
                  />
                  <div>
                    <div className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                      View History
                    </div>
                    <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      See past analyses
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    const examples =
                      placeholderCode[language] || placeholderCode.javascript;
                    setCode(examples);
                  }}
                  className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <Icon
                    name="FileCode"
                    size={20}
                    color="var(--color-text-secondary-light)"
                  />
                  <div>
                    <div className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                      Load Example
                    </div>
                    <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      Try sample code
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark p-6">
              <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
                Tips
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                <li className="flex items-start space-x-2">
                  <Icon
                    name="CheckCircle"
                    size={16}
                    color="var(--color-success)"
                    className="mt-0.5 flex-shrink-0"
                  />
                  <span>
                    Paste complete functions or classes for better analysis
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon
                    name="CheckCircle"
                    size={16}
                    color="var(--color-success)"
                    className="mt-0.5 flex-shrink-0"
                  />
                  <span>Include comments to get context-aware suggestions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon
                    name="CheckCircle"
                    size={16}
                    color="var(--color-success)"
                    className="mt-0.5 flex-shrink-0"
                  />
                  <span>Select the correct language for accurate analysis</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainCodeInputScreen;
