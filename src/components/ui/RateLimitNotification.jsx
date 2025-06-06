// src/components/ui/RateLimitNotification.jsx
import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

/**
 * Notification component for rate limit warnings
 * @param {boolean} isVisible - Whether the notification is visible
 * @param {Function} onClose - Function to close the notification
 * @param {number} retryAfter - Seconds to wait before retrying
 * @param {Function} onRetry - Function to call when retrying
 */
const RateLimitNotification = ({ isVisible, onClose, retryAfter, onRetry }) => {
  const [countdown, setCountdown] = useState(retryAfter || 5);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    if (!isVisible || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, countdown]);

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await onRetry();
      onClose();
    } catch (error) {
      console.error('Retry failed:', error);
    } finally {
      setIsRetrying(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 border border-yellow-200 dark:border-yellow-800 rounded-lg shadow-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-30 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Clock" size={16} color="var(--color-warning)" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
              Rate Limited
            </h3>
            <p className="text-xs text-yellow-700 dark:text-yellow-300 mb-3">
              API rate limit exceeded. {countdown > 0 ? `Retry available in ${countdown}s` : 'You can retry now.'}
            </p>
            
            <div className="flex items-center space-x-2">
              {countdown > 0 ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                  <span className="text-xs text-yellow-700 dark:text-yellow-300">
                    Waiting {countdown}s
                  </span>
                </div>
              ) : (
                <button
                  onClick={handleRetry}
                  disabled={isRetrying}
                  className="flex items-center space-x-1 px-3 py-1 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-400 text-white rounded text-xs font-medium transition-colors duration-200"
                >
                  {isRetrying ? (
                    <>
                      <Icon name="Loader" size={12} className="animate-spin" />
                      <span>Retrying...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="RotateCcw" size={12} />
                      <span>Retry</span>
                    </>
                  )}
                </button>
              )}
              
              <button
                onClick={onClose}
                className="p-1 text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200 transition-colors duration-200"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitNotification;