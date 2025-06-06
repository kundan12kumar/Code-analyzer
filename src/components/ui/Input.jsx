import React, { useState, forwardRef } from 'react';
import Icon from '../AppIcon';

const Input = forwardRef(({ 
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  success,
  disabled = false,
  required = false,
  icon,
  iconPosition = 'left',
  variant = 'default',
  size = 'medium',
  className = '',
  id,
  name,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const isTextarea = variant === 'textarea';
  const hasError = !!error;
  const hasSuccess = !!success;
  const isPassword = type === 'password';

  const baseClasses = 'w-full transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeClasses = {
    small: isTextarea ? 'px-3 py-2 text-sm' : 'px-3 py-1.5 text-sm',
    medium: isTextarea ? 'px-3 py-2 text-base' : 'px-3 py-2 text-base',
    large: isTextarea ? 'px-4 py-3 text-lg' : 'px-4 py-3 text-lg'
  };

  const stateClasses = hasError 
    ? 'border-error focus:ring-error focus:border-error' 
    : hasSuccess 
    ? 'border-success focus:ring-success focus:border-success' :'border-border-light dark:border-border-dark focus:ring-primary focus:border-primary';

  const inputClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${stateClasses}
    bg-background-light dark:bg-background-dark
    text-text-primary-light dark:text-text-primary-dark
    placeholder-text-secondary-light dark:placeholder-text-secondary-dark
    border rounded-lg
    focus:ring-2 focus:ring-offset-0
    ${icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : ''}
    ${isPassword ? 'pr-10' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const iconSize = size === 'small' ? 16 : size === 'large' ? 20 : 18;

  const InputComponent = isTextarea ? 'textarea' : 'input';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="space-y-1">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark"
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className={`absolute inset-y-0 ${iconPosition === 'left' ? 'left-0' : 'right-0'} flex items-center ${iconPosition === 'left' ? 'pl-3' : 'pr-3'} pointer-events-none`}>
            <Icon 
              name={icon} 
              size={iconSize} 
              className={`${hasError ? 'text-error' : hasSuccess ? 'text-success' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
            />
          </div>
        )}
        
        <InputComponent
          ref={ref}
          id={inputId}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={inputClasses}
          rows={isTextarea ? 4 : undefined}
          {...props}
        />
        
        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors duration-200"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={iconSize} />
          </button>
        )}
      </div>
      
      {(error || success) && (
        <div className={`flex items-center space-x-1 text-sm ${hasError ? 'text-error' : 'text-success'}`}>
          <Icon 
            name={hasError ? 'AlertCircle' : 'CheckCircle'} 
            size={14} 
          />
          <span>{error || success}</span>
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;