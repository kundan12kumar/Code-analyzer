import React from 'react';
import Icon from '../../../components/AppIcon';

const AnalysisContent = ({ activeTab, explanationData, optimizationData, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Skeleton for title */}
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse w-1/3"></div>
        
        {/* Skeleton for content */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/6"></div>
        </div>
        
        {/* Skeleton for code blocks */}
        <div className="space-y-4">
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  const renderExplanationContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
          {explanationData.title}
        </h2>
        <div className="prose prose-lg max-w-none text-text-secondary-light dark:text-text-secondary-dark">
          <p className="whitespace-pre-line">{explanationData.content}</p>
        </div>
      </div>

      {explanationData.codeSnippets && explanationData.codeSnippets.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
            Code Breakdown
          </h3>
          
          {explanationData.codeSnippets.map((snippet, index) => (
            <div key={index} className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-border-light dark:border-border-dark">
                <h4 className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                  {snippet.title}
                </h4>
              </div>
              
              <div className="p-4 space-y-3">
                <pre className="bg-code-bg-light dark:bg-code-bg-dark p-3 rounded-lg overflow-x-auto text-sm font-mono border border-border-light dark:border-border-dark">
                  <code className="text-code-syntax-1">{snippet.code}</code>
                </pre>
                
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  {snippet.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderOptimizationContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
          {optimizationData.title}
        </h2>
        <div className="prose prose-lg max-w-none text-text-secondary-light dark:text-text-secondary-dark">
          <p className="whitespace-pre-line">{optimizationData.content}</p>
        </div>
      </div>

      {optimizationData.suggestions && optimizationData.suggestions.length > 0 && (
        <div className="space-y-6">
          {optimizationData.suggestions.map((suggestion, index) => (
            <div key={index} className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-gradient-to-r from-primary bg-opacity-5 to-transparent border-b border-border-light dark:border-border-dark">
                <div className="flex items-center space-x-2">
                  <div className="bg-primary bg-opacity-10 p-1.5 rounded-lg">
                    <Icon name="Lightbulb" size={16} color="var(--color-primary)" />
                  </div>
                  <h4 className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark">
                    {suggestion.title}
                  </h4>
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  {suggestion.description}
                </p>
                
                <pre className="bg-code-bg-light dark:bg-code-bg-dark p-4 rounded-lg overflow-x-auto text-sm font-mono border border-border-light dark:border-border-dark">
                  <code className="text-text-primary-light dark:text-text-primary-dark whitespace-pre">
                    {suggestion.code}
                  </code>
                </pre>
                
                <div className="flex items-center space-x-2 p-3 bg-success bg-opacity-10 rounded-lg">
                  <Icon name="TrendingUp" size={16} color="var(--color-success)" />
                  <span className="text-sm font-medium text-success">
                    Improvement: {suggestion.improvement}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {optimizationData.performanceMetrics && (
        <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4 flex items-center space-x-2">
            <Icon name="BarChart3" size={20} color="var(--color-primary)" />
            <span>Performance Comparison</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-error bg-opacity-10 rounded-lg border border-error border-opacity-20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="AlertTriangle" size={16} color="var(--color-error)" />
                <span className="text-sm font-medium text-error">Original Implementation</span>
              </div>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark font-mono">
                {optimizationData.performanceMetrics.original}
              </p>
            </div>
            
            <div className="p-4 bg-success bg-opacity-10 rounded-lg border border-success border-opacity-20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                <span className="text-sm font-medium text-success">Optimized Implementation</span>
              </div>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark font-mono">
                {optimizationData.performanceMetrics.optimized}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-background-light dark:bg-background-dark">
      <div className="max-w-none">
        {activeTab === 'explanation' ? renderExplanationContent() : renderOptimizationContent()}
      </div>
    </div>
  );
};

export default AnalysisContent;