import React from 'react';
import HistoryItem from './HistoryItem';
import Icon from '../../../components/AppIcon';

const HistoryList = ({ 
  analyses, 
  isLoading, 
  hasMore, 
  onLoadMore, 
  onAnalysisClick 
}) => {
  return (
    <div className="space-y-4">
      {/* Analysis Items */}
      {analyses.map((analysis) => (
        <HistoryItem 
          key={analysis.id} 
          analysis={analysis}
          onClick={() => onAnalysisClick(analysis.id)}
        />
      ))}

      {/* Loading More Indicator */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="flex items-center space-x-3 text-text-secondary-light dark:text-text-secondary-dark">
            <Icon name="Loader2" size={20} className="animate-spin" />
            <span>Loading more analyses...</span>
          </div>
        </div>
      )}

      {/* No More Items Message */}
      {!hasMore && analyses.length > 10 && (
        <div className="text-center py-8 text-text-secondary-light dark:text-text-secondary-dark">
          <Icon name="Check" size={20} className="mx-auto mb-2" />
          <p className="text-sm">You've seen all your analyses</p>
        </div>
      )}
    </div>
  );
};

export default HistoryList;