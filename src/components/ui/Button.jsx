import React from 'react';
import Icon from '../AppIcon';

const Button = ({ 
  variant = 'primary', 
  size = 'medium',
  children, 
  icon, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-hover text-white focus:ring-primary shadow-sm hover:shadow-md',
    secondary: 'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-primary',
    ghost: 'text-text-primary-light dark:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-primary',
    success: 'bg-success hover:bg-emerald-600 text-white focus:ring-success shadow-sm hover:shadow-md',
    warning: 'bg-warning hover:bg-amber-600 text-white focus:ring-warning shadow-sm hover:shadow-md',
    error: 'bg-error hover:bg-rose-600 text-white focus:ring-error shadow-sm hover:shadow-md',
    info: 'bg-info hover:bg-sky-600 text-white focus:ring-info shadow-sm hover:shadow-md'
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base'
  };

  const iconSizes = {
    small: 16,
    medium: 18,
    large: 20
  };

  const handleClick = (e) => {
    if (disabled || loading) return;
    onClick?.(e);
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const renderIcon = (iconName, position) => {
    if (!iconName) return null;
    
    const iconSize = iconSizes[size];
    const iconClasses = position === 'left' ? 'mr-2' : 'ml-2';
    
    return (
      <Icon 
        name={iconName} 
        size={iconSize} 
        className={children ? iconClasses : ''} 
      />
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <Icon name="Loader2" size={iconSizes[size]} className={`animate-spin ${children ? 'mr-2' : ''}`} />
          {children && <span>Loading...</span>}
        </>
      );
    }

    if (icon && !children) {
      // Icon-only button
      return renderIcon(icon, 'left');
    }

    return (
      <>
        {icon && iconPosition === 'left' && renderIcon(icon, 'left')}
        {children && <span>{children}</span>}
        {icon && iconPosition === 'right' && renderIcon(icon, 'right')}
      </>
    );
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={!children && icon ? `${icon} button` : undefined}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;