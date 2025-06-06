// src/components/ui/QuotaExceededModal.jsx
import React from 'react';
import Icon from '../AppIcon';

/**
 * Modal component to display when API quota is exceeded
 * @param {boolean} isOpen - Whether the modal is open
 * @param {Function} onClose - Function to close the modal
 * @param {string} errorMessage - The error message to display
 */
const QuotaExceededModal = ({ isOpen, onClose, errorMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark shadow-lg max-w-md w-full mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 dark:bg-opacity-30 rounded-full flex items-center justify-center">
              <Icon name="CreditCard" size={20} color="var(--color-warning)" />
            </div>
            <h2 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
              API Quota Exceeded
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            {errorMessage || 'Your OpenAI API quota has been exceeded. Please check your plan and billing details.'}
          </p>
          
          <div className="bg-orange-50 dark:bg-orange-900 dark:bg-opacity-20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
            <h3 className="text-sm font-medium text-orange-800 dark:text-orange-200 mb-2">
              What you can do:
            </h3>
            <ul className="text-xs text-orange-700 dark:text-orange-300 space-y-1">
              <li className="flex items-start space-x-2">
                <Icon name="CheckCircle" size={12} className="mt-0.5 flex-shrink-0" />
                <span>Check your OpenAI billing dashboard</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="CheckCircle" size={12} className="mt-0.5 flex-shrink-0" />
                <span>Upgrade your OpenAI plan if needed</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="CheckCircle" size={12} className="mt-0.5 flex-shrink-0" />
                <span>Wait for your quota to reset</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <a
            href="https://platform.openai.com/account/billing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            <Icon name="ExternalLink" size={16} />
            <span>Check Billing</span>
          </a>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuotaExceededModal;