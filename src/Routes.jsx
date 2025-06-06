import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import MainCodeInputScreen from "pages/main-code-input-screen";
import SubscriptionUpgradeModal from "pages/subscription-upgrade-modal";
import HistorySavedAnalysesScreen from "pages/history-saved-analyses-screen";
import CodeAnalysisResultsScreen from "pages/code-analysis-results-screen";
import NotFound from "pages/NotFound";
import { Navigate } from "react-router-dom";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />x
        <RouterRoutes>
          <Route path="/" element={<MainCodeInputScreen />} />x
          <Route
            path="/main-code-input-screen"
            element={<MainCodeInputScreen />}
          />
          <Route
            path="/subscription-upgrade-modal"
            element={<SubscriptionUpgradeModal />}
          />
          <Route
            path="/history-saved-analyses-screen"
            element={<HistorySavedAnalysesScreen />}
          />
          <Route path="/analysis/:id" element={<CodeAnalysisResultsScreen />} />
          <Route
            path="/code-analysis-results-screen"
            element={<Navigate to="/main-code-input-screen" replace />}
          />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
