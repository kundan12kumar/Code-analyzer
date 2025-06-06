import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const MinimizedCodeView = ({ code, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getLanguageIcon = (lang) => {
    switch (lang?.toLowerCase()) {
      case 'javascript': case'js':
        return 'FileText';
      case 'python': case'py':
        return 'FileCode';
      case 'java':
        return 'Coffee';
      case 'cpp': case'c++':
        return 'Code';
      default:
        return 'FileText';
    }
  };

  const formatLanguage = (lang) => {
    switch (lang?.toLowerCase()) {
      case 'javascript': case'js':
        return 'JavaScript';
      case 'python': case'py':
        return 'Python';
      case 'java':
        return 'Java';
      case 'cpp': case'c++':
        return 'C++';
      default:
        return lang || 'Code';
    }
  };

  const getCodePreview = (code) => {
    const lines = code.split('\n');
    const firstLine = lines[0]?.trim() || '';
    const totalLines = lines.length;
    
    if (firstLine.length > 50) {
      return `${firstLine.substring(0, 50)}... (+${totalLines - 1} more lines)`;
    }
    
    if (totalLines > 1) {
      return `${firstLine} (+${totalLines - 1} more lines)`;
    }
    
    return firstLine;
  };

  return (
    <div className="mb-6">
      <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center space-x-3">
            <div className="bg-primary bg-opacity-10 p-2 rounded-lg">
              <Icon name={getLanguageIcon(language)} size={16} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                Original Code
              </h3>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                {formatLanguage(language)}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Collapse code view' : 'Expand code view'}
          >
            <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
            <Icon 
              name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
              size={16} 
              className="transition-transform duration-200"
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {isExpanded ? (
            <div className="space-y-4">
              <pre className="bg-code-bg-light dark:bg-code-bg-dark p-4 rounded-lg overflow-x-auto text-sm font-mono border border-border-light dark:border-border-dark">
                <code className="text-text-primary-light dark:text-text-primary-dark whitespace-pre">
                  {code}
                </code>
              </pre>
              
              <div className="flex items-center justify-between text-xs text-text-secondary-light dark:text-text-secondary-dark">
                <span>{code.split('\n').length} lines</span>
                <span>{code.length} characters</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark font-mono truncate">
                  {getCodePreview(code)}
                </p>
              </div>
              
              <div className="ml-4 flex items-center space-x-4 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                <span>{code.split('\n').length} lines</span>
                <div className="w-2 h-2 bg-success rounded-full" title="Analysis complete"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinimizedCodeView;