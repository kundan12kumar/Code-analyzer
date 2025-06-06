import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "components/AppIcon";
import ModalOverlay from "./components/ModalOverlay";
import PricingTable from "./components/PricingTable";
import PaymentForm from "./components/PaymentForm";
import ActionButtons from "./components/ActionButtons";
import StatusMessages from "./components/StatusMessages";

const SubscriptionUpgradeModal = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // null, 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Mock payment processing
  const handlePayment = async (paymentData) => {
    setIsProcessing(true);
    setPaymentStatus(null);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock payment validation - use specific test card for success
      if (paymentData.cardNumber === "4242424242424242") {
        setPaymentStatus('success');
        setTimeout(() => {
          navigate('/main-code-input-screen');
        }, 2000);
      } else {
        throw new Error("Payment failed. Please check your card details and try again.");
      }
    } catch (error) {
      setPaymentStatus('error');
      setErrorMessage(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpgradeClick = () => {
    setShowPaymentForm(true);
  };

  const handleMaybeLater = () => {
    navigate('/main-code-input-screen');
  };

  const handleRetry = () => {
    setPaymentStatus(null);
    setErrorMessage("");
  };

  // Focus trap and keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleMaybeLater();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <ModalOverlay onClose={handleMaybeLater}>
        <div className="relative bg-surface-light dark:bg-surface-dark rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border-light dark:border-border-dark">
            <div>
              <h2 className="text-heading-2 font-semibold text-text-primary-light dark:text-text-primary-dark">
                Upgrade Your Plan
              </h2>
              <p className="text-body-small text-text-secondary-light dark:text-text-secondary-dark mt-1">
                Unlock unlimited code analysis and optimization
              </p>
            </div>
            <button
              onClick={handleMaybeLater}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              aria-label="Close modal"
            >
              <Icon name="X" size={20} color="currentColor" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {paymentStatus === 'success' ? (
              <StatusMessages 
                type="success" 
                message="Payment successful! Welcome to Code Optimizer Pro. Redirecting..."
              />
            ) : paymentStatus === 'error' ? (
              <StatusMessages 
                type="error" 
                message={errorMessage}
                onRetry={handleRetry}
              />
            ) : (
              <div className="space-y-8">
                {/* Pricing Comparison */}
                <PricingTable />

                {/* Payment Form or Action Buttons */}
                {showPaymentForm ? (
                  <PaymentForm 
                    onSubmit={handlePayment}
                    isProcessing={isProcessing}
                    onCancel={() => setShowPaymentForm(false)}
                  />
                ) : (
                  <ActionButtons 
                    onUpgrade={handleUpgradeClick}
                    onMaybeLater={handleMaybeLater}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </ModalOverlay>
    </div>
  );
};

export default SubscriptionUpgradeModal;