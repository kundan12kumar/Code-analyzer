import React, { useState } from "react";
import Icon from "components/AppIcon";

const PaymentForm = ({ onSubmit, isProcessing, onCancel }) => {
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number
    if (name === "cardNumber") {
      formattedValue = value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    }

    // Format expiry date
    if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
    }

    // Format CVV
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.cardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (formData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Please enter a valid card number";
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Please enter a valid expiry date (MM/YY)";
    }

    if (!formData.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = "Please enter a valid CVV";
    }

    if (!formData.cardholderName) {
      newErrors.cardholderName = "Cardholder name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        cardNumber: formData.cardNumber.replace(/\s/g, "")
      });
    }
  };

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-heading-3 font-semibold text-text-primary-light dark:text-text-primary-dark">
          Payment Details
        </h3>
        <div className="flex items-center space-x-2 text-body-small text-text-secondary-light dark:text-text-secondary-dark">
          <Icon name="Shield" size={16} color="var(--color-success)" />
          <span>Secure Payment</span>
        </div>
      </div>

      {/* Test Card Info */}
      <div className="bg-info bg-opacity-10 border border-info border-opacity-20 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} color="var(--color-info)" className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-body-small font-medium text-text-primary-light dark:text-text-primary-dark mb-1">
              Test Payment
            </p>
            <p className="text-caption text-text-secondary-light dark:text-text-secondary-dark">
              Use card number: <span className="font-mono font-medium">4242 4242 4242 4242</span> for successful payment
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-body-small font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`input-field ${errors.email ? "border-error" : ""}`}
            placeholder="your@email.com"
            disabled={isProcessing}
          />
          {errors.email && (
            <p className="text-caption text-error mt-1">{errors.email}</p>
          )}
        </div>

        {/* Card Number */}
        <div>
          <label className="block text-body-small font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
            Card Number
          </label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            className={`input-field ${errors.cardNumber ? "border-error" : ""}`}
            placeholder="1234 5678 9012 3456"
            disabled={isProcessing}
          />
          {errors.cardNumber && (
            <p className="text-caption text-error mt-1">{errors.cardNumber}</p>
          )}
        </div>

        {/* Expiry and CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-body-small font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className={`input-field ${errors.expiryDate ? "border-error" : ""}`}
              placeholder="MM/YY"
              disabled={isProcessing}
            />
            {errors.expiryDate && (
              <p className="text-caption text-error mt-1">{errors.expiryDate}</p>
            )}
          </div>
          <div>
            <label className="block text-body-small font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
              CVV
            </label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              className={`input-field ${errors.cvv ? "border-error" : ""}`}
              placeholder="123"
              disabled={isProcessing}
            />
            {errors.cvv && (
              <p className="text-caption text-error mt-1">{errors.cvv}</p>
            )}
          </div>
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="block text-body-small font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
            Cardholder Name
          </label>
          <input
            type="text"
            name="cardholderName"
            value={formData.cardholderName}
            onChange={handleInputChange}
            className={`input-field ${errors.cardholderName ? "border-error" : ""}`}
            placeholder="John Doe"
            disabled={isProcessing}
          />
          {errors.cardholderName && (
            <p className="text-caption text-error mt-1">{errors.cardholderName}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={isProcessing}
            className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Icon name="CreditCard" size={16} color="white" />
                <span>Pay $19/month</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isProcessing}
            className="flex-1 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;