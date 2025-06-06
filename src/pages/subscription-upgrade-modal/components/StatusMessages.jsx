import React from "react";
import Icon from "components/AppIcon";

const StatusMessages = ({ type, message, onRetry }) => {
  const getStatusConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: "CheckCircle",
          color: "var(--color-success)",
          bgColor: "bg-success bg-opacity-10",
          borderColor: "border-success border-opacity-20"
        };
      case 'error':
        return {
          icon: "XCircle",
          color: "var(--color-error)",
          bgColor: "bg-error bg-opacity-10",
          borderColor: "border-error border-opacity-20"
        };
      default:
        return {
          icon: "Info",
          color: "var(--color-info)",
          bgColor: "bg-info bg-opacity-10",
          borderColor: "border-info border-opacity-20"
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`${config.bgColor} ${config.borderColor} border rounded-lg p-8 text-center`}>
      <div className="flex justify-center mb-4">
        <div className={`${config.bgColor} rounded-full p-3`}>
          <Icon name={config.icon} size={32} color={config.color} />
        </div>
      </div>
      
      <h3 className="text-heading-3 font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
        {type === 'success' ? 'Payment Successful!' : type === 'error' ? 'Payment Failed' : 'Information'}
      </h3>
      
      <p className="text-body text-text-secondary-light dark:text-text-secondary-dark mb-6 max-w-md mx-auto">
        {message}
      </p>

      {type === 'success' && (
        <div className="flex items-center justify-center space-x-2 text-body-small text-text-secondary-light dark:text-text-secondary-dark">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-success border-t-transparent"></div>
          <span>Redirecting to dashboard...</span>
        </div>
      )}

      {type === 'error' && onRetry && (
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xs mx-auto">
          <button
            onClick={onRetry}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <Icon name="RotateCcw" size={16} color="white" />
            <span>Try Again</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default StatusMessages;