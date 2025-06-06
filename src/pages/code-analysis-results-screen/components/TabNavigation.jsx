import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'explanation',
      label: 'Explanation',
      icon: 'BookOpen',
      description: 'Detailed code breakdown and explanation'
    },
    {
      id: 'optimization',
      label: 'Optimization Tips',
      icon: 'Zap',
      description: 'Performance improvements and best practices'
    }
  ];

  return (
    <div className="mb-6">
      <div className="border-b border-border-light dark:border-border-dark">
        <nav className="flex space-x-8" aria-label="Analysis tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`group relative flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              <Icon 
                name={tab.icon} 
                size={18} 
                color={activeTab === tab.id ? 'var(--color-primary)' : 'currentColor'}
              />
              <span>{tab.label}</span>
              
              {/* Keyboard shortcut indicator */}
              <span className="hidden sm:inline-flex items-center justify-center w-5 h-5 text-xs bg-gray-100 dark:bg-gray-700 text-text-secondary-light dark:text-text-secondary-dark rounded border ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {tab.id === 'explanation' ? '1' : '2'}
              </span>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                {tab.description}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
              </div>
            </button>
          ))}
        </nav>
      </div>
      
      {/* Keyboard shortcuts hint */}
      <div className="mt-2 text-xs text-text-secondary-light dark:text-text-secondary-dark">
        <span className="hidden sm:inline">
          Use <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl+1</kbd> or <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl+2</kbd> to switch tabs
        </span>
      </div>
    </div>
  );
};

export default TabNavigation;