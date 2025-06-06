import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const Dropdown = ({ 
  trigger,
  children,
  variant = 'selection',
  position = 'bottom-left',
  disabled = false,
  closeOnSelect = true,
  className = '',
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleItemClick = (callback) => {
    return (e) => {
      if (callback) {
        callback(e);
      }
      if (closeOnSelect) {
        closeDropdown();
      }
    };
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const positionClasses = {
    'bottom-left': 'top-full left-0 mt-1',
    'bottom-right': 'top-full right-0 mt-1',
    'top-left': 'bottom-full left-0 mb-1',
    'top-right': 'bottom-full right-0 mb-1'
  };

  const dropdownClasses = `
    absolute z-50 min-w-48 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg shadow-lg py-1
    ${positionClasses[position]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div ref={dropdownRef} className="relative inline-block" {...props}>
      <div
        ref={triggerRef}
        onClick={toggleDropdown}
        className={disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
      </div>

      {isOpen && (
        <div className={dropdownClasses}>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                onClick: handleItemClick(child.props.onClick)
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
};

// Dropdown Item Component
export const DropdownItem = ({ 
  children,
  onClick,
  disabled = false,
  icon,
  variant = 'default',
  className = '',
  ...props 
}) => {
  const variantClasses = {
    default: 'text-text-primary-light dark:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700',
    danger: 'text-error hover:bg-red-50 dark:hover:bg-red-900/20',
    success: 'text-success hover:bg-green-50 dark:hover:bg-green-900/20'
  };

  const itemClasses = `
    flex items-center space-x-2 px-3 py-2 text-sm cursor-pointer transition-colors duration-200
    ${disabled ? 'opacity-50 cursor-not-allowed' : variantClasses[variant]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <div className={itemClasses} onClick={handleClick} {...props}>
      {icon && <Icon name={icon} size={16} />}
      <span>{children}</span>
    </div>
  );
};

// Dropdown Divider Component
export const DropdownDivider = () => (
  <div className="border-t border-border-light dark:border-border-dark my-1" />
);

// Selection Dropdown Component
export const SelectDropdown = ({ 
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  searchable = false,
  className = '',
  ...props 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = searchable 
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (option) => {
    onChange?.(option.value);
    setIsOpen(false);
    setSearchTerm('');
  };

  const trigger = (
    <div className={`
      flex items-center justify-between w-full px-3 py-2 text-left bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg transition-colors duration-200
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'}
      ${className}
    `}>
      <span className={selectedOption ? 'text-text-primary-light dark:text-text-primary-dark' : 'text-text-secondary-light dark:text-text-secondary-dark'}>
        {selectedOption ? selectedOption.label : placeholder}
      </span>
      <Icon name="ChevronDown" size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
    </div>
  );

  return (
    <Dropdown
      trigger={trigger}
      variant="selection"
      disabled={disabled}
      closeOnSelect={false}
      className="w-full"
      {...props}
    >
      {searchable && (
        <>
          <div className="px-3 py-2">
            <input
              type="text"
              placeholder="Search options..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-2 py-1 text-sm bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded focus:outline-none focus:ring-1 focus:ring-primary"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <DropdownDivider />
        </>
      )}
      
      {filteredOptions.length > 0 ? (
        filteredOptions.map((option) => (
          <DropdownItem
            key={option.value}
            onClick={() => handleSelect(option)}
            icon={option.icon}
            className={value === option.value ? 'bg-primary-light text-primary' : ''}
          >
            {option.label}
          </DropdownItem>
        ))
      ) : (
        <div className="px-3 py-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
          No options found
        </div>
      )}
    </Dropdown>
  );
};

// Action Menu Dropdown Component
export const ActionMenuDropdown = ({ 
  actions = [],
  trigger,
  disabled = false,
  className = '',
  ...props 
}) => {
  const defaultTrigger = (
    <button className="p-2 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary">
      <Icon name="MoreVertical" size={16} />
    </button>
  );

  return (
    <Dropdown
      trigger={trigger || defaultTrigger}
      variant="action"
      disabled={disabled}
      className={className}
      {...props}
    >
      {actions.map((action, index) => (
        <React.Fragment key={index}>
          {action.divider ? (
            <DropdownDivider />
          ) : (
            <DropdownItem
              onClick={action.onClick}
              icon={action.icon}
              variant={action.variant}
              disabled={action.disabled}
            >
              {action.label}
            </DropdownItem>
          )}
        </React.Fragment>
      ))}
    </Dropdown>
  );
};

export default Dropdown;