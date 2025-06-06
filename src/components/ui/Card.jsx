import React, { useState } from 'react';
import Icon from '../AppIcon';

const Card = ({ 
  variant = 'default',
  children,
  title,
  subtitle,
  icon,
  actions,
  onClick,
  className = '',
  padding = 'default',
  ...props 
}) => {
  const isInteractive = !!onClick;
  const isCode = variant === 'code';
  const isResponse = variant === 'response';

  const baseClasses = 'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg shadow-sm transition-all duration-200';
  
  const variantClasses = {
    default: '',
    interactive: 'hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
    code: 'bg-code-bg-light dark:bg-code-bg-dark font-mono',
    response: 'border-l-4 border-l-primary'
  };

  const paddingClasses = {
    none: '',
    small: 'p-4',
    default: 'p-6',
    large: 'p-8'
  };

  const cardClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${isInteractive ? variantClasses.interactive : ''}
    ${paddingClasses[padding]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  const handleKeyDown = (e) => {
    if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.(e);
    }
  };

  const CardContent = () => (
    <>
      {(title || subtitle || icon || actions) && (
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3 flex-1">
            {icon && (
              <div className={`flex-shrink-0 ${isResponse ? 'text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>
                <Icon name={icon} size={20} />
              </div>
            )}
            <div className="flex-1 min-w-0">
              {title && (
                <h3 className={`font-semibold text-text-primary-light dark:text-text-primary-dark ${isCode ? 'font-mono text-sm' : 'text-lg'}`}>
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className={`text-text-secondary-light dark:text-text-secondary-dark ${isCode ? 'font-mono text-xs' : 'text-sm'} ${title ? 'mt-1' : ''}`}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {actions && (
            <div className="flex items-center space-x-2 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      )}
      
      <div className={isCode ? 'font-mono text-sm' : ''}>
        {children}
      </div>
    </>
  );

  if (isInteractive) {
    return (
      <div
        className={cardClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={typeof title === 'string' ? `Click to interact with ${title}` : 'Interactive card'}
        {...props}
      >
        <CardContent />
      </div>
    );
  }

  return (
    <div className={cardClasses} {...props}>
      <CardContent />
    </div>
  );
};

// Code Card specific component
export const CodeCard = ({ 
  language = 'javascript',
  code,
  title,
  copyable = true,
  lineNumbers = true,
  className = '',
  ...props 
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (code) {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    }
  };

  const actions = copyable ? (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Copy code to clipboard"
    >
      <Icon name={copied ? 'Check' : 'Copy'} size={16} />
    </button>
  ) : null;

  return (
    <Card
      variant="code"
      title={title}
      subtitle={language}
      icon="Code"
      actions={actions}
      padding="default"
      className={className}
      {...props}
    >
      <div className="relative">
        {lineNumbers && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-editor-gutter-light dark:bg-editor-gutter-dark border-r border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark text-xs leading-5 text-right pr-2 py-2">
            {code?.split('\n').map((_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>
        )}
        <pre className={`overflow-x-auto text-sm leading-5 ${lineNumbers ? 'pl-10' : ''}`}>
          <code className="text-text-primary-light dark:text-text-primary-dark">
            {code}
          </code>
        </pre>
      </div>
    </Card>
  );
};

// Response Card specific component
export const ResponseCard = ({ 
  type = 'explanation',
  content,
  title,
  downloadable = true,
  className = '',
  ...props 
}) => {
  const [downloading, setDownloading] = React.useState(false);

  const handleDownload = async () => {
    if (content) {
      setDownloading(true);
      try {
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title || 'response'}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error('Failed to download response:', err);
      } finally {
        setDownloading(false);
      }
    }
  };

  const typeIcons = {
    explanation: 'FileText',
    optimization: 'Zap',
    error: 'AlertTriangle',
    suggestion: 'Lightbulb'
  };

  const actions = downloadable ? (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="p-1.5 rounded text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
      aria-label="Download response"
    >
      <Icon name={downloading ? 'Loader2' : 'Download'} size={16} className={downloading ? 'animate-spin' : ''} />
    </button>
  ) : null;

  return (
    <Card
      variant="response"
      title={title}
      icon={typeIcons[type]}
      actions={actions}
      padding="default"
      className={className}
      {...props}
    >
      <div className="prose prose-sm dark:prose-invert max-w-none">
        {typeof content === 'string' ? (
          <div className="whitespace-pre-wrap text-text-primary-light dark:text-text-primary-dark">
            {content}
          </div>
        ) : (
          content
        )}
      </div>
    </Card>
  );
};

export default Card;