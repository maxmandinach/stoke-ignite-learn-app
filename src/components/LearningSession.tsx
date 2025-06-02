
import React, { useState } from 'react';
import { Card, Button, ProgressBar } from './ui/design-system';

interface LearningSessionProps {
  sessionConfig: { type: string; selectedContent: string[] };
  onComplete: () => void;
  onBack: () => void;
}

// Mock learning data
const mockQuestions = [
  {
    id: '1',
    question: 'What are the key principles of spaced repetition for optimal learning retention?',
    content: 'The Psychology of Learning and Memory',
    type: 'recall'
  },
  {
    id: '2',
    question: 'According to Atomic Habits, what is the 1% rule and how does it compound over time?',
    content: 'Building Habits That Last',
    type: 'application'
  },
  {
    id: '3',
    question: 'What is the difference between supervised and unsupervised learning in machine learning?',
    content: 'Introduction to Machine Learning',
    type: 'conceptual'
  }
];

const mockSummaries = [
  {
    id: '1',
    title: 'Key Learning Principles',
    content: 'Spaced repetition leverages the psychological spacing effect, where information is reviewed at increasing intervals to optimize long-term retention. The optimal intervals follow a pattern of 1 day, 3 days, 1 week, 2 weeks, and 1 month.',
    source: 'The Psychology of Learning and Memory'
  },
  {
    id: '2',
    title: 'The Power of 1% Improvements',
    content: 'Small, consistent improvements compound over time. Getting 1% better each day means you end up 37x better after one year. This principle applies to habit formation and skill development.',
    source: 'Building Habits That Last'
  }
];

const LearningSession: React.FC<LearningSessionProps> = ({ sessionConfig, onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showingSummaries, setShowingSummaries] = useState(sessionConfig.type === 'read');
  const [currentSummaryIndex, setCurrentSummaryIndex] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);

  const isTestSession = sessionConfig.type === 'test' || sessionConfig.type === 'both';
  const isReadSession = sessionConfig.type === 'read' || sessionConfig.type === 'both';

  const handleQuestionResponse = (gotIt: boolean) => {
    console.log(`Question ${currentQuestionIndex + 1} answered: ${gotIt ? 'Got it' : 'Revisit'}`);
    
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (isReadSession && sessionConfig.type === 'both') {
      setShowingSummaries(true);
      setCurrentSummaryIndex(0);
    } else {
      setSessionComplete(true);
    }
  };

  const handleNextSummary = () => {
    if (currentSummaryIndex < mockSummaries.length - 1) {
      setCurrentSummaryIndex(prev => prev + 1);
    } else {
      setSessionComplete(true);
    }
  };

  const handlePreviousSummary = () => {
    if (currentSummaryIndex > 0) {
      setCurrentSummaryIndex(prev => prev - 1);
    }
  };

  const getProgress = () => {
    if (showingSummaries) {
      const summaryProgress = ((currentSummaryIndex + 1) / mockSummaries.length) * 100;
      return sessionConfig.type === 'both' ? 50 + (summaryProgress * 0.5) : summaryProgress;
    } else {
      const questionProgress = ((currentQuestionIndex + 1) / mockQuestions.length) * 100;
      return sessionConfig.type === 'both' ? questionProgress * 0.5 : questionProgress;
    }
  };

  if (sessionComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Session Complete!</h2>
          <p className="text-gray-600 mb-6">
            Great work! You've completed your learning session. Your progress has been saved and 
            spaced repetition schedules have been updated.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="secondary" onClick={onBack}>
              Back to Library
            </Button>
            <Button variant="primary" onClick={onComplete}>
              Start New Session
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">
            {showingSummaries ? 'Reading Summaries' : 'Testing Knowledge'}
          </h2>
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ProgressBar progress={getProgress()} />
        <p className="text-sm text-gray-600 mt-2">
          {showingSummaries 
            ? `Summary ${currentSummaryIndex + 1} of ${mockSummaries.length}`
            : `Question ${currentQuestionIndex + 1} of ${mockQuestions.length}`
          }
        </p>
      </div>

      {/* Content */}
      {showingSummaries ? (
        <Card className="p-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {mockSummaries[currentSummaryIndex].title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              From: {mockSummaries[currentSummaryIndex].source}
            </p>
          </div>
          
          <div className="prose prose-lg text-gray-700 mb-8">
            <p>{mockSummaries[currentSummaryIndex].content}</p>
          </div>
          
          <div className="flex justify-between">
            <Button
              variant="secondary"
              onClick={handlePreviousSummary}
              disabled={currentSummaryIndex === 0}
            >
              Previous
            </Button>
            <Button
              variant="primary"
              onClick={handleNextSummary}
            >
              {currentSummaryIndex === mockSummaries.length - 1 ? 'Complete' : 'Next'}
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="p-8">
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-4">
              From: {mockQuestions[currentQuestionIndex].content}
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-900 leading-relaxed">
              {mockQuestions[currentQuestionIndex].question}
            </h3>
          </div>
          
          <div className="flex space-x-4">
            <Button
              variant="danger"
              size="lg"
              className="flex-1"
              onClick={() => handleQuestionResponse(false)}
            >
              Need to revisit
            </Button>
            <Button
              variant="success"
              size="lg"
              className="flex-1"
              onClick={() => handleQuestionResponse(true)}
            >
              Got it!
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default LearningSession;
