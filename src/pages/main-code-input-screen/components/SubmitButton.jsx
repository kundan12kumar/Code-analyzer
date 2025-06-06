import React from 'react';
import Icon from '../../../components/AppIcon';

const SubmitButton = ({ 
  onClick, 
  isLoading = false, 
  disabled = false, 
  variant = 'primary',
  size = 'default',
  children,
  className = ''
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeClasses = {
    small: "px-3 py-2 text-sm",
    default: "px-6 py-3 text-sm",
    large: "px-8 py-4 text-base"
  };

  const variantClasses = {
    primary: "bg-primary hover:bg-primary-hover text-white focus:ring-primary disabled:hover:bg-primary",
    secondary: "bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-primary",
    success: "bg-success hover:bg-green-600 text-white focus:ring-success",
    danger: "bg-error hover:bg-red-600 text-white focus:ring-error"
  };

  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const defaultContent = (
    <>
      {isLoading ? (
        <>
          <div className="animate-spin mr-2">
            <Icon name="Loader2" size={18} />
          </div>
          <span>Analyzing...</span>
        </>
      ) : (
        <>
          <Icon name="Play" size={18} className="mr-2" />
          <span>Analyze Code</span>
        </>
      )}
    </>
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={buttonClasses}
      type="button"
    >
      {children || defaultContent}
    </button>
  );
};

export default SubmitButton;