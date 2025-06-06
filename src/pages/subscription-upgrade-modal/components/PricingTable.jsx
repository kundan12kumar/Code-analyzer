import React from "react";
import Icon from "components/AppIcon";

const PricingTable = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        { text: "5 code analyses per day", included: true },
        { text: "Basic optimization tips", included: true },
        { text: "Standard response time", included: true },
        { text: "Community support", included: true },
        { text: "Advanced AI insights", included: false },
        { text: "Priority processing", included: false },
        { text: "Unlimited analyses", included: false },
        { text: "Export capabilities", included: false }
      ],
      current: true
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      features: [
        { text: "Unlimited code analyses", included: true },
        { text: "Advanced AI insights", included: true },
        { text: "Priority processing", included: true },
        { text: "Export to multiple formats", included: true },
        { text: "Advanced optimization tips", included: true },
        { text: "Email support", included: true },
        { text: "Code history tracking", included: true },
        { text: "Custom analysis templates", included: true }
      ],
      popular: true
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`relative rounded-xl border-2 p-6 ${
            plan.popular
              ? "border-primary bg-primary-light bg-opacity-10" :"border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark"
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-caption font-medium">
                Recommended
              </span>
            </div>
          )}

          {plan.current && (
            <div className="absolute -top-3 right-4">
              <span className="bg-success text-white px-3 py-1 rounded-full text-caption font-medium">
                Current Plan
              </span>
            </div>
          )}

          <div className="text-center mb-6">
            <h3 className="text-heading-3 font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
              {plan.name}
            </h3>
            <div className="flex items-baseline justify-center">
              <span className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark">
                {plan.price}
              </span>
              <span className="text-body-small text-text-secondary-light dark:text-text-secondary-dark ml-2">
                {plan.period}
              </span>
            </div>
          </div>

          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  <Icon
                    name={feature.included ? "Check" : "X"}
                    size={16}
                    color={feature.included ? "var(--color-success)" : "var(--color-error)"}
                  />
                </div>
                <span
                  className={`text-body-small ${
                    feature.included
                      ? "text-text-primary-light dark:text-text-primary-dark" :"text-text-secondary-light dark:text-text-secondary-dark line-through"
                  }`}
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PricingTable;