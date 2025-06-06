import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const UpgradePrompt = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary-hover rounded-lg p-6 text-white">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Crown" size={24} color="white" />
            <h3 className="text-heading-3 font-semibold">
              Upgrade to Pro
            </h3>
          </div>
          
          <p className="text-white text-opacity-90 mb-4 max-w-2xl">
            You've reached the 5 analysis limit for free users. Upgrade to Pro for unlimited code analyses, advanced features, and priority support.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center space-x-2 text-white text-opacity-90">
              <Icon name="Check" size={16} color="white" />
              <span className="text-sm">Unlimited analyses</span>
            </div>
            <div className="flex items-center space-x-2 text-white text-opacity-90">
              <Icon name="Check" size={16} color="white" />
              <span className="text-sm">Advanced optimization tips</span>
            </div>
            <div className="flex items-center space-x-2 text-white text-opacity-90">
              <Icon name="Check" size={16} color="white" />
              <span className="text-sm">Priority support</span>
            </div>
            <div className="flex items-center space-x-2 text-white text-opacity-90">
              <Icon name="Check" size={16} color="white" />
              <span className="text-sm">Export results</span>
            </div>
          </div>
        </div>
        
        <button
          className="ml-4 p-2 text-white text-opacity-70 hover:text-opacity-100 transition-opacity duration-200"
          aria-label="Dismiss upgrade prompt"
        >
          <Icon name="X" size={20} color="white" />
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <Link
          to="/subscription-upgrade-modal"
          className="bg-white text-primary hover:bg-gray-50 font-medium px-6 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary flex items-center space-x-2"
        >
          <Icon name="Sparkles" size={20} className="text-primary" />
          <span>Upgrade Now</span>
        </Link>
        
        <button className="text-white text-opacity-90 hover:text-opacity-100 font-medium text-sm transition-opacity duration-200 flex items-center space-x-2">
          <Icon name="Info" size={16} color="white" />
          <span>Learn More</span>
        </button>
        
        <div className="text-white text-opacity-75 text-sm">
          Starting at $9.99/month
        </div>
      </div>
    </div>
  );
};

export default UpgradePrompt;