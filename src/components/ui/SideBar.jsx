import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const SideBar = ({ variant = 'expanded' }) => {
  const [isCollapsed, setIsCollapsed] = useState(variant === 'collapsed');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const navigationItems = [
    {
      path: '/main-code-input-screen',
      label: 'Code Input',
      icon: 'Code',
      description: 'Analyze your code'
    },
    {
      path: '/code-analysis-results-screen',
      label: 'Analysis Results',
      icon: 'FileText',
      description: 'View analysis results'
    },
    {
      path: '/history-saved-analyses-screen',
      label: 'History',
      icon: 'History',
      description: 'Saved analyses'
    },
    {
      path: '/subscription-upgrade-modal',
      label: 'Upgrade',
      icon: 'Crown',
      description: 'Upgrade subscription'
    }
  ];

  const SidebarContent = ({ isMobile = false }) => (
    <div className={`flex flex-col h-full ${isMobile ? 'p-4' : ''}`}>
      {/* Header */}
      <div className={`flex items-center ${isCollapsed && !isMobile ? 'justify-center' : 'justify-between'} p-4 border-b border-border-light dark:border-border-dark`}>
        {(!isCollapsed || isMobile) && (
          <div className="flex items-center space-x-2">
            <div className="bg-primary p-2 rounded-lg">
              <Icon name="Code" size={20} color="white" />
            </div>
            <span className="font-bold text-text-primary-light dark:text-text-primary-dark">
              CodeAnalyzer
            </span>
          </div>
        )}
        {!isMobile && (
          <button
            onClick={toggleCollapse}
            className="p-1 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
          </button>
        )}
        {isMobile && (
          <button
            onClick={toggleMobile}
            className="p-1 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close sidebar"
          >
            <Icon name="X" size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => isMobile && setIsMobileOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary group ${
                    isActive
                      ? 'bg-primary-light text-primary' :'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                  title={isCollapsed && !isMobile ? item.label : undefined}
                >
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={`flex-shrink-0 ${isActive ? 'text-primary' : ''}`}
                  />
                  {(!isCollapsed || isMobile) && (
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.label}</div>
                      <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate">
                        {item.description}
                      </div>
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className={`p-4 border-t border-border-light dark:border-border-dark ${isCollapsed && !isMobile ? 'text-center' : ''}`}>
        <div className={`text-xs text-text-secondary-light dark:text-text-secondary-dark ${isCollapsed && !isMobile ? 'hidden' : ''}`}>
          <div className="mb-2">Usage: 5/10 requests</div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>
        {isCollapsed && !isMobile && (
          <div className="w-6 h-6 bg-primary rounded-full mx-auto" title="Usage: 5/10 requests"></div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Open sidebar"
      >
        <Icon name="Menu" size={20} />
      </button>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleMobile}
            aria-hidden="true"
          ></div>
          <aside className="relative flex flex-col w-64 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark">
            <SidebarContent isMobile={true} />
          </aside>
        </div>
      )}
    </>
  );
};

export default SideBar;