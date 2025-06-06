import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const EmptyState = ({ hasSearchQuery, searchQuery }) => {
  if (hasSearchQuery) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
          <Icon name="Search" size={32} className="text-text-secondary-light dark:text-text-secondary-dark" />
        </div>
        
        <h3 className="text-heading-3 font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
          No results found
        </h3>
        
        <p className="text-body text-text-secondary-light dark:text-text-secondary-dark mb-6 max-w-md mx-auto">
          We couldn't find any analyses matching "{searchQuery}". Try adjusting your search terms or browse all analyses.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="btn-secondary flex items-center space-x-2"
          >
            <Icon name="RotateCcw" size={20} />
            <span>Clear Search</span>
          </button>
          
          <Link
            to="/main-code-input-screen"
            className="btn-primary flex items-center space-x-2"
          >
            <Icon name="Plus" size={20} color="white" />
            <span>New Analysis</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-light rounded-full mb-6">
        <Icon name="FileText" size={40} className="text-primary" />
      </div>
      
      <h3 className="text-heading-2 font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
        No analyses yet
      </h3>
      
      <p className="text-body text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-md mx-auto">
        Start analyzing your code to see detailed explanations, identify issues, and get optimization suggestions. Your analysis history will appear here.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <Link
          to="/main-code-input-screen"
          className="btn-primary flex items-center space-x-2"
        >
          <Icon name="Code" size={20} color="white" />
          <span>Analyze Your First Code</span>
        </Link>
        
        <button className="btn-ghost flex items-center space-x-2">
          <Icon name="HelpCircle" size={20} />
          <span>Learn More</span>
        </button>
      </div>
      
      {/* Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-success bg-opacity-10 rounded-lg mb-3">
            <Icon name="Zap" size={24} className="text-success" />
          </div>
          <h4 className="text-subtitle font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
            Instant Analysis
          </h4>
          <p className="text-body-small text-text-secondary-light dark:text-text-secondary-dark">
            Get detailed code explanations and suggestions in seconds
          </p>
        </div>
        
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-warning bg-opacity-10 rounded-lg mb-3">
            <Icon name="AlertTriangle" size={24} className="text-warning" />
          </div>
          <h4 className="text-subtitle font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
            Issue Detection
          </h4>
          <p className="text-body-small text-text-secondary-light dark:text-text-secondary-dark">
            Identify potential bugs and code quality issues
          </p>
        </div>
        
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-info bg-opacity-10 rounded-lg mb-3">
            <Icon name="TrendingUp" size={24} className="text-info" />
          </div>
          <h4 className="text-subtitle font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
            Optimization Tips
          </h4>
          <p className="text-body-small text-text-secondary-light dark:text-text-secondary-dark">
            Receive actionable suggestions to improve performance
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;