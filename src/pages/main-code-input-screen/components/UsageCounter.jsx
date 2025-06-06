import React, { useMemo } from "react";
import Icon from "../../../components/AppIcon";

const UsageCounter = ({
  current = 0,
  max = 5,
  onUpgrade,
  variant = "default",
  showUpgrade = true,
}) => {
  const percentage = max ? (current / max) * 100 : 0;
  const remaining = max - current;
  const isNearLimit = remaining <= 1;
  const isAtLimit = current >= max;

  const { statusColor, progressColor, statusIcon } = useMemo(() => {
    if (isAtLimit)
      return {
        statusColor: "text-error",
        progressColor: "bg-error",
        statusIcon: "AlertCircle",
      };
    if (isNearLimit)
      return {
        statusColor: "text-warning",
        progressColor: "bg-warning",
        statusIcon: "AlertTriangle",
      };
    return {
      statusColor: "text-success",
      progressColor: "bg-success",
      statusIcon: "CheckCircle",
    };
  }, [isAtLimit, isNearLimit]);

  if (variant === "compact") {
    return (
      <div className="flex items-center space-x-2">
                <Icon name={statusIcon} size={16} className={`${statusColor} stroke-current`} />
        <span className={`text-sm font-medium ${statusColor}`}>

          {remaining}/{max}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={18} color="var(--color-primary)" />
          <span className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
            Usage Today
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name={statusIcon} size={16} className={`${statusColor} stroke-current`} />
          <span className={`text-sm font-semibold ${statusColor}`}>
            {current}/{max}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
          className={`h-2 rounded-full transition-all duration-300 ${progressColor}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
            role="progressbar"
           aria-valuenow={current}
            aria-valuemin={0}
            aria-valuemax={max}
          />
        </div>
      </div>

      {/* Status Message */}
      <div className="mb-3">
        {isAtLimit ? (
          <p className="text-xs text-error">You've reached your daily limit</p>
        ) : isNearLimit ? (
          <p className="text-xs text-warning">
          {remaining} {remaining === 1 ? 'analysis' : 'analyses'} remaining today
          </p>
        ) : (
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
          {remaining} {remaining === 1 ? 'analysis' : 'analyses'} remaining today
          </p>
        )}
      </div>

      {/* Upgrade Button */}
      {showUpgrade && (isAtLimit || isNearLimit) && onUpgrade && (
        <button
          onClick={onUpgrade}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
        >
          <Icon name="Crown" size={14} />
          <span>Upgrade to Pro</span>
        </button>
      )}

      {/* Free Plan Info */}
      {!isAtLimit && (
        <div className="mt-3 pt-3 border-t border-border-light dark:border-border-dark">
          <div className="flex items-center justify-between text-xs text-text-secondary-light dark:text-text-secondary-dark">
            <span>Free Plan</span>
            <span>Resets daily</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsageCounter;
