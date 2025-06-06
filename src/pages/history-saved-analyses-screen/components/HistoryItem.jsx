import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import Icon from '../../../components/AppIcon';

const HistoryItem = ({ analysis, onClick }) => {
  const formatDate = (date) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch (error) {
      return 'Unknown date';
    }
  };

  const getLanguageIcon = (language) => {
    const languageIcons = {
      javascript: 'FileCode',
      python: 'FileCode',
      java: 'FileCode',
      cpp: 'FileCode',
      typescript: 'FileCode',
      html: 'FileCode',
      css: 'FileCode',
      sql: 'Database'
    };
    return languageIcons[language.toLowerCase()] || 'FileCode';
  };

  const getLanguageColor = (language) => {
    const colors = {
      javascript: '#f7df1e',
      python: '#3776ab',
      java: '#ed8b00',
      cpp: '#00599c',
      typescript: '#3178c6',
      html: '#e34f26',
      css: '#1572b6',
      sql: '#336791'
    };
    return colors[language.toLowerCase()] || 'var(--color-primary)';
  };

  return (
    <div 
      className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-6 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-primary"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${getLanguageColor(analysis.language)}20` }}>
              <Icon 
                name={getLanguageIcon(analysis.language)} 
                size={20} 
                color={getLanguageColor(analysis.language)} 
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-1">
              {analysis.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
              <span className="font-medium" style={{ color: getLanguageColor(analysis.language) }}>
                {analysis.language}
              </span>
              <span>•</span>
              <span>{formatDate(analysis.submissionDate)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-text-secondary-light dark:text-text-secondary-dark">
          {analysis.issuesFound > 0 && (
            <div className="flex items-center space-x-1">
              <Icon name="AlertCircle" size={16} color="var(--color-warning)" />
              <span>{analysis.issuesFound} issues</span>
            </div>
          )}
          {analysis.optimizationSuggestions > 0 && (
            <div className="flex items-center space-x-1">
              <Icon name="Zap" size={16} color="var(--color-success)" />
              <span>{analysis.optimizationSuggestions} optimizations</span>
            </div>
          )}
        </div>
      </div>

      {/* Code Preview */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
        <pre className="text-sm text-text-primary-light dark:text-text-primary-dark font-mono overflow-hidden">
          <code>{analysis.codeSnippet}</code>
        </pre>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-text-secondary-light dark:text-text-secondary-dark">
          <Icon name="Clock" size={14} />
          <span>Analyzed {formatDate(analysis.submissionDate)}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-primary hover:text-primary-hover transition-colors duration-200">
          <span className="text-sm font-medium">View Analysis</span>
          <Icon name="ChevronRight" size={16} />
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;