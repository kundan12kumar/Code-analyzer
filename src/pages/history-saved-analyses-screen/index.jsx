import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import SearchBar from "./components/SearchBar";
import HistoryList from "./components/HistoryList";
import EmptyState from "./components/EmptyState";
import UpgradePrompt from "./components/UpgradePrompt";
import Icon from "../../components/AppIcon";
import {
  getAnalysisHistory,
  searchAnalysisHistory,
  getAnalysisById,
} from "../../services/historyService";

const HistorySavedAnalysesScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAnalyses, setFilteredAnalyses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock user data - in production this would come from authentication
  const mockUser = useMemo(() => ({ isPro: false }), []);
  const FREE_LIMIT = 5;
  const PAGE_SIZE = 10;

  // Load analysis history on component mount
  useEffect(() => {
    loadAnalysisHistory();
  }, []);

  // Filter analyses when search query changes
  const filterAnalyses = useCallback(() => {
    setFilteredAnalyses((prev) =>
      prev.filter((a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  useEffect(filterAnalyses, [searchQuery, filterAnalyses]);

  const loadAnalysisHistory = async () => {
    setIsLoading(true);
    try {
      const history = getAnalysisHistory();
      setFilteredAnalyses(history);

      // Update user's analysis count
      setHasMore(mockUser.isPro && history.length > PAGE_SIZE);
    } catch (error) {
      console.error("Error loading analysis history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreAnalyses = () => {
    if (!mockUser.isPro) return;

    setIsLoading(true);
    // Simulate API call for pagination
    setTimeout(() => {
      setCurrentPage((prev) => {
        const next = prev + 1;
        if (next * PAGE_SIZE >= filteredAnalyses.length) setHasMore(false);
        return next;
      });
      setIsLoading(false);
      // In real implementation, check if there are more items
      if (currentPage >= 3) {
        setHasMore(false);
      }
    }, 1000);
  };

  const handleAnalysisClick = (analysisId) => {
    // Retrieve the full analysis data
    const fullAnalysis = getAnalysisById(analysisId);
    if (fullAnalysis) {
      // Navigate to results screen with the analysis data
      navigate(`/analysis/${analysisResult.id}`);
    } else {
      console.error("Analysis not found:", analysisId);
    }
  };

  const analysesCount = filteredAnalyses.length;
  const showUpgradePrompt = !mockUser.isPro && analysesCount >= FREE_LIMIT;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />

      <main
        id="main-content"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-heading-1 font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                Analysis History
              </h1>
              <p className="text-body text-text-secondary-light dark:text-text-secondary-dark">
                View and manage your previous code analyses
              </p>
            </div>

            <Link
              to="/main-code-input-screen"
              className="btn-primary flex items-center space-x-2"
            >
              <Icon name="Plus" size={20} color="white" />
              <span>New Analysis</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-6 text-body-small text-text-secondary-light dark:text-text-secondary-dark">
            <div className="flex items-center space-x-2">
              <Icon name="FileText" size={16} />
              <span>{filteredAnalyses.length} analyses</span>
            </div>
            {!mockUser.isPro && (
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={16} />
                <span>Free plan: {mockUser.analysesCount}/5 used</span>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Upgrade Prompt for Free Users */}
        {showUpgradePrompt && (
          <div className="mb-6">
            <UpgradePrompt />
          </div>
        )}

        {/* Loading State */}
        {isLoading && filteredAnalyses.length === 0 ? (
          <div className="flex justify-center items-center py-16">
            <div className="flex items-center space-x-3 text-text-secondary-light dark:text-text-secondary-dark">
              <Icon name="Loader2" size={24} className="animate-spin" />
              <span>Loading analysis history...</span>
            </div>
          </div>
        ) : (
          /* Content */
          <div>
            {filteredAnalyses.length === 0 ? (
              <EmptyState
                hasSearchQuery={!!searchQuery.trim()}
                searchQuery={searchQuery}
              />
            ) : (
              <div className="space-y-6">
                <HistoryList
                  analyses={filteredAnalyses}
                  isLoading={isLoading}
                  hasMore={hasMore && mockUser.isPro}
                  onLoadMore={loadMoreAnalyses}
                  onAnalysisClick={handleAnalysisClick}
                />
              </div>
            )}

            {/* Load More Button for Pro Users */}
            {mockUser.isPro && hasMore && filteredAnalyses.length > 0 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMoreAnalyses}
                  disabled={isLoading}
                  className="btn-secondary flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" size={20} className="animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="ChevronDown" size={20} />
                      <span>Load More</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default HistorySavedAnalysesScreen;
