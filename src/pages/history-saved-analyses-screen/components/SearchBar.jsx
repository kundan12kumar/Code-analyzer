import React from 'react';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="relative max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon 
          name="Search" 
          size={20} 
          className="text-text-secondary-light dark:text-text-secondary-dark" 
        />
      </div>
      
      <input
        type="text"
        placeholder="Search by language, title, or code content..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="input-field pl-10 pr-4 py-3 w-full"
        aria-label="Search analyses"
      />
      
      {searchQuery && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors duration-200"
          aria-label="Clear search"
        >
          <Icon name="X" size={20} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;