import React from "react";
import { Link } from "react-router-dom";
import Icon from "components/AppIcon";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-light rounded-full mb-6">
            <Icon name="FileQuestion" size={48} color="var(--color-primary)" />
          </div>
          <h1 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
            404
          </h1>
          <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
            Page Not Found
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/main-code-input-screen"
            className="inline-flex items-center justify-center space-x-2 bg-primary hover:bg-primary-hover text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Icon name="Home" size={20} color="white" />
            <span>Go Home</span>
          </Link>
          
          <div className="flex justify-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors duration-200"
            >
              <Icon name="ArrowLeft" size={16} />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;