// src/services/historyService.js

/**
 * Service for managing analysis history using localStorage
 * In a production app, this would integrate with a backend API
 */

const STORAGE_KEY = 'code_analysis_history';
const MAX_HISTORY_ITEMS = 50;

/**
 * Saves an analysis to local storage history
 * @param {object} analysis - Analysis result to save
 * @returns {boolean} Success status
 */
export function saveAnalysisToHistory(analysis) {
  try {
    const history = getAnalysisHistory();
    
    const historyItem = {
      id: analysis.analysisId || generateId(),
      title: generateTitle(analysis.originalCode, analysis.language),
      codeSnippet: truncateCode(analysis.originalCode),
      language: analysis.language,
      submissionDate: new Date(analysis.timestamp || Date.now()),
      issuesFound: extractIssuesCount(analysis.optimization?.content || ''),
      optimizationSuggestions: analysis.optimization?.suggestions?.length || 0,
      fullAnalysis: analysis
    };
    
    // Add to beginning of history
    history.unshift(historyItem);
    
    // Limit history size
    if (history.length > MAX_HISTORY_ITEMS) {
      history.splice(MAX_HISTORY_ITEMS);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return true;
  } catch (error) {
    console.error('Error saving analysis to history:', error);
    return false;
  }
}

/**
 * Retrieves analysis history from local storage
 * @returns {Array} Array of analysis history items
 */
export function getAnalysisHistory() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const history = JSON.parse(stored);
    // Convert date strings back to Date objects
    return history.map(item => ({
      ...item,
      submissionDate: new Date(item.submissionDate)
    }));
  } catch (error) {
    console.error('Error retrieving analysis history:', error);
    return [];
  }
}

/**
 * Retrieves a specific analysis by ID
 * @param {string} analysisId - ID of the analysis to retrieve
 * @returns {object|null} Analysis data or null if not found
 */
export function getAnalysisById(analysisId) {
  try {
    const history = getAnalysisHistory();
    const item = history.find(analysis => analysis.id === analysisId);
    return item?.fullAnalysis || null;
  } catch (error) {
    console.error('Error retrieving analysis by ID:', error);
    return null;
  }
}

/**
 * Deletes an analysis from history
 * @param {string} analysisId - ID of the analysis to delete
 * @returns {boolean} Success status
 */
export function deleteAnalysisFromHistory(analysisId) {
  try {
    const history = getAnalysisHistory();
    const filteredHistory = history.filter(item => item.id !== analysisId);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredHistory));
    return true;
  } catch (error) {
    console.error('Error deleting analysis from history:', error);
    return false;
  }
}

/**
 * Clears all analysis history
 * @returns {boolean} Success status
 */
export function clearAnalysisHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing analysis history:', error);
    return false;
  }
}

/**
 * Filters analysis history based on search query
 * @param {string} query - Search query
 * @returns {Array} Filtered analysis history
 */
export function searchAnalysisHistory(query) {
  if (!query || query.trim() === '') {
    return getAnalysisHistory();
  }
  
  const history = getAnalysisHistory();
  const lowercaseQuery = query.toLowerCase();
  
  return history.filter(analysis => 
    analysis.language.toLowerCase().includes(lowercaseQuery) ||
    analysis.title.toLowerCase().includes(lowercaseQuery) ||
    analysis.codeSnippet.toLowerCase().includes(lowercaseQuery)
  );
}

/**
 * Helper function to generate a title for an analysis
 * @param {string} code - The analyzed code
 * @param {string} language - Programming language
 * @returns {string} Generated title
 */
function generateTitle(code, language) {
  // Extract function names, class names, or use language-specific patterns
  const lines = code.split('\n').filter(line => line.trim());
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Function detection
    const functionMatch = trimmed.match(/(?:function|def|public|private|static)\s+(\w+)/);
    if (functionMatch) {
      return `${functionMatch[1]} (${language})`;
    }
    
    // Class detection
    const classMatch = trimmed.match(/(?:class|interface)\s+(\w+)/);
    if (classMatch) {
      return `${classMatch[1]} Class (${language})`;
    }
  }
  
  // Fallback to language-based title with timestamp
  return `${language} Code Analysis`;
}

/**
 * Helper function to truncate code for display
 * @param {string} code - Full code
 * @returns {string} Truncated code
 */
function truncateCode(code) {
  const maxLength = 150;
  const lines = code.split('\n');
  
  let truncated = '';
  for (const line of lines) {
    if (truncated.length + line.length > maxLength) {
      break;
    }
    truncated += line + '\n';
  }
  
  return truncated.trim();
}

/**
 * Helper function to extract issues count from optimization content
 * @param {string} content - Optimization content
 * @returns {number} Estimated number of issues
 */
function extractIssuesCount(content) {
  const issueKeywords = ['issue', 'problem', 'error', 'bug', 'improvement', 'fix'];
  let count = 0;
  
  issueKeywords.forEach(keyword => {
    const regex = new RegExp(keyword, 'gi');
    const matches = content.match(regex);
    if (matches) count += matches.length;
  });
  
  return Math.min(count, 10); // Cap at 10 for reasonable display
}

/**
 * Helper function to generate unique IDs
 * @returns {string} Unique identifier
 */
function generateId() {
  return `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}