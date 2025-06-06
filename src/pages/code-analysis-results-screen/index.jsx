import React, { useState, useEffect } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { getAnalysisById } from '../../services/historyService';
import Header from '../../components/ui/Header';
import MinimizedCodeView from './components/MinimizedCodeView';
import TabNavigation from './components/TabNavigation';
import AnalysisContent from './components/AnalysisContent';
import ActionBar from './components/ActionBar';
import Icon from '../../components/AppIcon';

const CodeAnalysisResultsScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('explanation');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Get analysis data from navigation state (passed from main input screen)
  const { id } = useParams();
const analysisData = id ? getAnalysisById(id) : null;

  // Redirect if no analysis data is available

  if (!analysisData) {
      /* Invalid id or user deleted history → back to input */
      return <Navigate to="/main-code-input-screen" replace />;
    }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'c':
            event.preventDefault();
            handleCopy();
            break;
          case 's':
            event.preventDefault();
            handleDownload();
            break;
          case '1':
            event.preventDefault();
            setActiveTab('explanation');
            break;
          case '2':
            event.preventDefault();
            setActiveTab('optimization');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopy = async () => {
    try {
      const content = activeTab === 'explanation' 
        ? analysisData.explanation.content 
        : analysisData.optimization.content;
      
      await navigator.clipboard.writeText(content);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    try {
      const content = activeTab === 'explanation' 
        ? analysisData.explanation.content 
        : analysisData.optimization.content;
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `code-${activeTab}-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } catch (err) {
      console.error('Failed to download:', err);
    }
  };

  const handleRetry = () => {
    navigate('/main-code-input-screen');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <Header variant="compact" />
        <main id="main-content" className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="text-center max-w-md">
            <div className="bg-error bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Icon name="AlertTriangle" size={32} color="var(--color-error)" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
              Analysis Error
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
              There was an error displaying the analysis results.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleRetry}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <Icon name="ArrowLeft" size={16} color="white" />
                <span>Back to Input</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header variant="compact" />
      
      <main id="main-content" className="flex-1">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Minimized Code View */}
          <MinimizedCodeView 
            code={analysisData.originalCode}
            language={analysisData.language}
          />

          {/* Tab Navigation */}
          <TabNavigation 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Analysis Content */}
          <AnalysisContent 
            activeTab={activeTab}
            explanationData={analysisData.explanation}
            optimizationData={analysisData.optimization}
            isLoading={isLoading}
          />

          {/* Floating Action Bar */}
          <ActionBar 
            onCopy={handleCopy}
            onDownload={handleDownload}
            copySuccess={copySuccess}
            downloadSuccess={downloadSuccess}
          />
        </div>
      </main>

      {/* Success Notifications */}
      {(copySuccess || downloadSuccess) && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-success text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-pulse">
            <Icon name="Check" size={16} color="white" />
            <span className="text-sm font-medium">
              {copySuccess ? 'Copied to clipboard!' : 'Downloaded successfully!'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeAnalysisResultsScreen;