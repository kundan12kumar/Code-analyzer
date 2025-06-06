import React from 'react';
import Icon from '../../../components/AppIcon';

const ActionBar = ({ onCopy, onDownload, copySuccess, downloadSuccess }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="bg-surface-light dark:bg-surface-dark bg-opacity-90 backdrop-blur-md border border-border-light dark:border-border-dark rounded-lg shadow-lg p-2">
        <div className="flex items-center space-x-2">
          {/* Copy Button */}
          <button
            onClick={onCopy}
            disabled={copySuccess}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              copySuccess
                ? 'bg-success text-white cursor-not-allowed' :'bg-primary hover:bg-primary-hover text-white hover:shadow-md active:scale-95'
            }`}
            title="Copy analysis (Ctrl+C)"
            aria-label="Copy analysis to clipboard"
          >
            <Icon 
              name={copySuccess ? 'Check' : 'Copy'} 
              size={16} 
              color="white"
              className={copySuccess ? 'animate-pulse' : ''}
            />
            <span>{copySuccess ? 'Copied!' : 'Copy'}</span>
          </button>

          {/* Download Button */}
          <button
            onClick={onDownload}
            disabled={downloadSuccess}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              downloadSuccess
                ? 'bg-success text-white cursor-not-allowed' :'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md active:scale-95'
            }`}
            title="Download analysis (Ctrl+S)"
            aria-label="Download analysis as text file"
          >
            <Icon 
              name={downloadSuccess ? 'Check' : 'Download'} 
              size={16} 
              color={downloadSuccess ? 'white' : 'currentColor'}
              className={downloadSuccess ? 'animate-pulse' : ''}
            />
            <span>{downloadSuccess ? 'Downloaded!' : 'Download'}</span>
          </button>
        </div>

        {/* Keyboard shortcuts hint */}
        <div className="mt-2 pt-2 border-t border-border-light dark:border-border-dark">
          <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary-light dark:text-text-secondary-dark">
            <div className="flex items-center space-x-1">
              <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">C</kbd>
              <span>Copy</span>
            </div>
            <div className="flex items-center space-x-1">
              <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">S</kbd>
              <span>Save</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;