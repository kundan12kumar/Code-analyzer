import React from "react";
import Icon from "components/AppIcon";

const ActionButtons = ({ onUpgrade, onMaybeLater }) => {
  return (
    <div className="text-center space-y-4">
      <div className="bg-primary-light bg-opacity-20 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-primary bg-opacity-10 rounded-full p-3">
            <Icon name="Zap" size={24} color="var(--color-primary)" />
          </div>
        </div>
        <h3 className="text-heading-3 font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
          Ready to unlock unlimited potential?
        </h3>
        <p className="text-body text-text-secondary-light dark:text-text-secondary-dark">
          Join thousands of developers who have upgraded to Pro for unlimited code analysis and advanced AI insights.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <button
          onClick={onUpgrade}
          className="flex-1 btn-primary flex items-center justify-center space-x-2 py-3"
        >
          <Icon name="Crown" size={18} color="white" />
          <span>Upgrade to Pro</span>
        </button>
        <button
          onClick={onMaybeLater}
          className="flex-1 btn-ghost py-3"
        >
          Maybe Later
        </button>
      </div>

      <div className="flex items-center justify-center space-x-4 text-caption text-text-secondary-light dark:text-text-secondary-dark mt-6">
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={14} color="var(--color-success)" />
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="RotateCcw" size={14} color="var(--color-info)" />
          <span>Cancel Anytime</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={14} color="var(--color-warning)" />
          <span>Instant Access</span>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;