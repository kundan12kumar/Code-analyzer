// src/services/codeAnalysisService.js
import { chatCompletion } from "./hfClient";
// import openai from "./openaiClient";

/**
 * Custom error class for API quota exceeded errors
 */
class QuotaExceededError extends Error {
  constructor(message, retryAfter = null) {
    super(message);
    this.name = "QuotaExceededError";
    this.retryAfter = retryAfter;
  }
}

/**
 * Custom error class for API rate limit errors
 */
class RateLimitError extends Error {
  constructor(message, retryAfter = null) {
    super(message);
    this.name = "RateLimitError";
    this.retryAfter = retryAfter;
  }
}

/**
 * Handles OpenAI API errors and provides user-friendly messages
 * @param {Error} error - The original error from OpenAI API
 * @throws {QuotaExceededError|RateLimitError|Error} Appropriate error type
 */
function handleOpenAIError(error) {
  console.error("OpenAI API Error:", error);

  // Check if it's a quota exceeded error (HTTP 429)
  if (error.status === 429) {
    const retryAfter = error.headers?.["retry-after"] || null;

    if (
      error.message?.includes("quota") ||
      error.message?.includes("billing")
    ) {
      throw new QuotaExceededError(
        "Your OpenAI API quota has been exceeded. Please check your plan and billing details at https://platform.openai.com/account/billing",
        retryAfter
      );
    } else {
      throw new RateLimitError(
        "API rate limit exceeded. Please wait a moment before trying again.",
        retryAfter
      );
    }
  }

  // Check for authentication errors
  if (error.status === 401) {
    throw new Error(
      "Invalid API key. Please check your OpenAI API key configuration."
    );
  }

  // Check for other API errors
  if (error.status === 400) {
    throw new Error(
      "Invalid request. Please check your code input and try again."
    );
  }

  if (error.status === 403) {
    throw new Error(
      "Access forbidden. Your API key may not have the required permissions."
    );
  }

  if (error.status === 500) {
    throw new Error(
      "OpenAI service is temporarily unavailable. Please try again later."
    );
  }

  // Default error handling
  throw new Error(
    error.message || "An unexpected error occurred while analyzing your code."
  );
}

/**
 * Implements exponential backoff retry mechanism
 * @param {Function} apiCall - The API call function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise} The result of the API call
 */
async function retryWithBackoff(apiCall, maxRetries = 3, baseDelay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      // Don't retry quota exceeded errors
      if (error instanceof QuotaExceededError) {
        throw error;
      }

      // Don't retry on the last attempt
      if (attempt === maxRetries) {
        throw error;
      }

      // Only retry on rate limit or server errors
      if (error instanceof RateLimitError || error.status >= 500) {
        const delay =
          baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000;
        console.log(
          `Retrying API call in ${delay}ms (attempt ${attempt}/${maxRetries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}

/**
 * Analyzes code and provides explanation using OpenAI API
 * @param {string} code - The code to analyze
 * @param {string} language - Programming language of the code
 * @returns {Promise<object>} Analysis result with explanation
 */
export async function analyzeCodeExplanation(code, language) {
  try {
    // const apiCall = async () => {
    //   const response = await openai.chat.completions.create({
    //     model: 'gpt-3.5-turbo',
    //     messages: [
    //       {
    //         role: 'system',
    //         content: `You are an expert code reviewer and educator. Analyze the provided ${language} code and provide a comprehensive explanation. Focus on:
    //         1. What the code does and how it works
    //         2. Key concepts and patterns used
    //         3. Step-by-step breakdown of logic
    //         4. Explain any algorithms or data structures used

    //         Format your response as clear, educational content suitable for developers learning or reviewing code.`
    //       },
    //       {
    //         role: 'user',
    //         content: `Please analyze and explain this ${language} code:\n\n${code}`
    //       }
    //     ],
    //     temperature: 0.3,
    //     max_tokens: 1500,
    //   });
    //   return response;
    // };

    // const response = await retryWithBackoff(apiCall);
    const apiCall = async () => {
      const content = await chatCompletion({
        messages: [
          { role: "system", content: `You are an expert code reviewer …` },
          {
            role: "user",
            content: `Please analyze and explain this ${language} code:\n\n${code}`,
          },
        ],
        max_tokens: 1200,
      });
      return content;
    };
    const content = await retryWithBackoff(apiCall);
    return {
      title: "Code Explanation",
      // content: response.choices[0].message.content,
      content,
      codeSnippets: extractCodeSnippets(code, language),
    };
  } catch (error) {
    handleOpenAIError(error);
  }
}

/**
 * Analyzes code and provides optimization suggestions using OpenAI API
 * @param {string} code - The code to analyze
 * @param {string} language - Programming language of the code
 * @returns {Promise<object>} Analysis result with optimization suggestions
 */
export async function analyzeCodeOptimization(code, language) {
  try {
    // const apiCall = async () => {
    //   const response = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //       {
    //         role: "system",
    //         content: `You are an expert code optimizer and performance specialist. Analyze the provided ${language} code and provide optimization suggestions. Focus on:
    //         1. Performance improvements and time/space complexity
    //         2. Best practices and code quality improvements
    //         3. Security considerations
    //         4. Maintainability and readability enhancements
    //         5. Provide specific code examples for improvements

    //         Structure your response with clear sections for different types of optimizations.`,
    //       },
    //       {
    //         role: "user",
    //         content: `Please analyze this ${language} code for optimization opportunities and provide specific improvements:\n\n${code}`,
    //       },
    //     ],
    //     temperature: 0.3,
    //     max_tokens: 2000,
    //   });
    //   return response;
    // };
    const apiCall = async () => {
      const content = await chatCompletion({
        messages: [
          { role: "system", content: `You are an expert code optimizer …` },
          {
            role: "user",
            content: `Please analyze this ${language} code …\n\n${code}`,
          },
        ],
        max_tokens: 1500,
      });
      return content;
    };

    // const response = await retryWithBackoff(apiCall);
    const content = await retryWithBackoff(apiCall);

    return {
      title: "Optimization Suggestions",
      // content: response.choices[0].message.content,
      content,
      suggestions: await generateOptimizationSuggestions(code, language),
      performanceMetrics: await analyzePerformanceMetrics(code, language),
    };
  } catch (error) {
    handleOpenAIError(error);
  }
}

/**
 * Generates structured optimization suggestions
 * @param {string} code - The code to analyze
 * @param {string} language - Programming language
 * @returns {Promise<Array>} Array of optimization suggestions
 */
async function generateOptimizationSuggestions(code, language) {
  try {
    // const apiCall = async () => {
    //   const response = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //       {
    //         role: "system",
    //         content: `Generate specific, actionable optimization suggestions for ${language} code. For each suggestion, provide:
    //         1. Title (brief description)
    //         2. Description (what the optimization does)
    //         3. Code example (improved version)
    //         4. Improvement explanation (benefits gained)

    //         Focus on the most impactful optimizations. Respond in JSON format with an array of suggestions.`,
    //       },
    //       {
    //         role: "user",
    //         content: `Analyze this ${language} code and provide 2-4 specific optimization suggestions:\n\n${code}`,
    //       },
    //     ],
    //     temperature: 0.2,
    //     max_tokens: 1500,
    //     response_format: { type: "json_object" },
    //   });
    //   return response;
    // };
    const apiCall = async () => {
      const plain = await chatCompletion({
        messages: [
          {
            role: "system",
            content: `Analyze the time and space complexity …`,
          },
          {
            role: "user",
            content: `Analyze the complexity of this ${language} code:\n\n${code}`,
          },
        ],
        max_tokens: 350,
      });
      return plain;
    };
    const plain = await retryWithBackoff(apiCall);
    return [
      {
        title: "AI suggestion",
        description: plain,
        code: "",
        improvement: "",
      },
    ];
    // const response = await retryWithBackoff(apiCall);
    // const result = JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("Error generating optimization suggestions:", error);
    // Return fallback suggestions if API fails
    return [
      {
        title: "General Optimization",
        description:
          "Consider reviewing code structure and performance patterns.",
        code: "// Optimized code examples would be provided here",
        improvement: "Improved maintainability and performance",
      },
    ];
  }
}

/**
 * Analyzes performance metrics of the code
 * @param {string} code - The code to analyze
 * @param {string} language - Programming language
 * @returns {Promise<object>} Performance metrics
 */
async function analyzePerformanceMetrics(code, language) {
  try {
    // const apiCall = async () => {
    //   const response = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //       {
    //         role: "system",
    //         content: `Analyze the time and space complexity of the provided ${language} code. Provide:
    //         1. Current time complexity (Big O notation)
    //         2. Current space complexity (Big O notation)
    //         3. Potential optimized time complexity
    //         4. Potential optimized space complexity

    //         Respond in JSON format with 'original' and 'optimized' objects containing 'time' and 'space' properties.`,
    //       },
    //       {
    //         role: "user",
    //         content: `Analyze the complexity of this ${language} code:\n\n${code}`,
    //       },
    //     ],
    //     temperature: 0.1,
    //     max_tokens: 500,
    //     response_format: { type: "json_object" },
    //   });
    //   return response;
    // };
    // const apiCall = async () => {
    //   const jsonText = await chatCompletion({
    //     messages: [
    //       {
    //         role: "system",
    //         content: `Analyze the time and space complexity …`,
    //       },
    //       {
    //         role: "user",
    //         content: `Analyze the complexity of this ${language} code:\n\n${code}`,
    //       },
    //     ],
    //     max_tokens: 350,
    //   });
    //   return JSON.parse(jsonText);
    // };
    const apiCall = async () =>
      chatCompletion({
        messages: [
          {
            role: "system",
            content:
              "Analyze the time- and space-complexity of the code the user will send.",
          },
          {
            role: "user",
            content: `Analyze the complexity of this ${language} code:\n\n${code}`,
          },
        ],
        max_tokens: 350,
      });

    const metricsText = await retryWithBackoff(apiCall);
    return {
      original: metricsText,
      optimized: "See above",
    };
  } catch (error) {
    console.error("Error analyzing performance metrics:", error);
    // Return fallback metrics if API fails
    return {
      original: "Analysis unavailable",
      optimized: "Optimization potential varies",
    };
  }
}

/**
 * Extracts important code snippets for explanation
 * @param {string} code - The full code
 * @param {string} language - Programming language
 * @returns {Array} Array of code snippets with explanations
 */
function extractCodeSnippets(code, language) {
  // Basic extraction of key code patterns
  const lines = code.split("\n").filter((line) => line.trim());
  const snippets = [];

  // Extract function declarations, loops, conditionals, etc.
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (
      trimmed.includes("function") ||
      trimmed.includes("def ") ||
      trimmed.includes("class ") ||
      trimmed.includes("if ") ||
      trimmed.includes("for ") ||
      trimmed.includes("while ")
    ) {
      snippets.push({
        title: `Line ${index + 1}`,
        code: trimmed,
        explanation: "Key code structure",
      });
    }
  });

  return snippets.slice(0, 3); // Limit to 3 snippets
}

/**
 * Performs complete code analysis with both explanation and optimization
 * @param {string} code - The code to analyze
 * @param {string} language - Programming language
 * @returns {Promise<object>} Complete analysis result
 */
export async function performCompleteAnalysis(code, language) {
  try {
    const [explanation, optimization] = await Promise.all([
      analyzeCodeExplanation(code, language),
      analyzeCodeOptimization(code, language),
    ]);

    return {
      originalCode: code,
      language: language,
      explanation,
      optimization,
      timestamp: new Date().toISOString(),
      analysisId: generateAnalysisId(),
    };
  } catch (error) {
    console.error("Error in complete analysis:", error);
    throw error;
  }
}

/**
 * Generates a unique analysis ID
 * @returns {string} Unique identifier
 */
function generateAnalysisId() {
  return `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Export error classes for use in other components
export { QuotaExceededError, RateLimitError };
