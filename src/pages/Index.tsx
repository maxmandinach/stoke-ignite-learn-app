
import React, { useState } from 'react';
import Header from '../components/Header';
import ContentSelectionInterface from '../components/ContentSelectionInterface';
import SessionConfigurationInterface from '../components/SessionConfigurationInterface';
import LearningSession from '../components/LearningSession';

type AppState = 'content-selection' | 'session-configuration' | 'learning-session';

interface SessionConfig {
  type: string;
  selectedContent: string[];
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('content-selection');
  const [selectedContentIds, setSelectedContentIds] = useState<string[]>([]);
  const [sessionConfig, setSessionConfig] = useState<SessionConfig | null>(null);

  const handleContentSelection = (contentIds: string[]) => {
    setSelectedContentIds(contentIds);
    setCurrentState('session-configuration');
  };

  const handleSessionStart = (config: SessionConfig) => {
    setSessionConfig(config);
    setCurrentState('learning-session');
  };

  const handleBackToContent = () => {
    setCurrentState('content-selection');
    setSelectedContentIds([]);
  };

  const handleBackToConfig = () => {
    setCurrentState('session-configuration');
  };

  const handleSessionComplete = () => {
    setCurrentState('content-selection');
    setSelectedContentIds([]);
    setSessionConfig(null);
  };

  const getHeaderTitle = () => {
    switch (currentState) {
      case 'session-configuration':
        return 'Session Setup';
      case 'learning-session':
        return 'Learning Session';
      default:
        return '';
    }
  };

  const getShowBack = () => {
    return currentState !== 'content-selection';
  };

  const getBackHandler = () => {
    switch (currentState) {
      case 'session-configuration':
        return handleBackToContent;
      case 'learning-session':
        return handleBackToConfig;
      default:
        return undefined;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title={getHeaderTitle()}
        showBack={getShowBack()}
        onBack={getBackHandler()}
      />
      
      <main>
        {currentState === 'content-selection' && (
          <ContentSelectionInterface onContinue={handleContentSelection} />
        )}
        
        {currentState === 'session-configuration' && (
          <SessionConfigurationInterface
            selectedContentIds={selectedContentIds}
            onStartSession={handleSessionStart}
            onBack={handleBackToContent}
          />
        )}
        
        {currentState === 'learning-session' && sessionConfig && (
          <LearningSession
            sessionConfig={sessionConfig}
            onComplete={handleSessionComplete}
            onBack={handleBackToConfig}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
