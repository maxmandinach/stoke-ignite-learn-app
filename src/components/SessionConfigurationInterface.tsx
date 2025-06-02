
import React, { useState } from 'react';
import { Card, Button, Badge } from './ui/design-system';

interface SessionConfigurationInterfaceProps {
  selectedContentIds: string[];
  onStartSession: (config: { type: string; selectedContent: string[] }) => void;
  onBack: () => void;
}

const sessionTypes = [
  {
    id: 'read',
    title: 'Read Summaries',
    description: 'Browse key insights and concepts at your own pace',
    icon: '📖',
    estimatedTime: 0.3,
    cognitiveLoad: 'Low',
    benefits: ['Quick review', 'Passive learning', 'Easy to digest']
  },
  {
    id: 'test',
    title: 'Test Knowledge',
    description: 'Active recall with spaced repetition questions',
    icon: '🧠',
    estimatedTime: 0.8,
    cognitiveLoad: 'High',
    benefits: ['Deep retention', 'Active recall', 'Spaced repetition']
  },
  {
    id: 'both',
    title: 'Read + Test',
    description: 'Combined approach with summaries and questions',
    icon: '🚀',
    estimatedTime: 1.0,
    cognitiveLoad: 'Medium',
    benefits: ['Comprehensive', 'Balanced approach', 'Best retention']
  }
];

// Mock content data for display
const mockContentData = {
  '1': { title: 'The Psychology of Learning and Memory', questions: 45 },
  '2': { title: 'Building Habits That Last', questions: 32 },
  '3': { title: 'Introduction to Machine Learning', questions: 67 },
  '4': { title: 'The Science of Sleep Optimization', questions: 18 }
};

const SessionConfigurationInterface: React.FC<SessionConfigurationInterfaceProps> = ({
  selectedContentIds,
  onStartSession,
  onBack
}) => {
  const [selectedSessionType, setSelectedSessionType] = useState<string>('both');

  const selectedContent = selectedContentIds.map(id => mockContentData[id as keyof typeof mockContentData]).filter(Boolean);
  const totalQuestions = selectedContent.reduce((sum, item) => sum + item.questions, 0);
  
  const selectedSession = sessionTypes.find(type => type.id === selectedSessionType);
  const estimatedDuration = selectedSession ? selectedSession.estimatedTime * selectedContentIds.length : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Configure your session</h2>
        <p className="text-gray-600">Choose how you'd like to learn from your selected content</p>
      </div>

      {/* Selected Content Summary */}
      <Card className="p-6 mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Selected Content</h3>
        <div className="space-y-3">
          {selectedContent.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <h4 className="font-medium text-gray-800">{item.title}</h4>
              <Badge variant="default">{item.questions} questions</Badge>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Total questions:</span>
            <span className="font-semibold text-gray-900">{totalQuestions}</span>
          </div>
        </div>
      </Card>

      {/* Session Type Selection */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Session Type</h3>
        <div className="grid gap-4">
          {sessionTypes.map(type => (
            <Card
              key={type.id}
              onClick={() => setSelectedSessionType(type.id)}
              selected={selectedSessionType === type.id}
              className="p-6"
            >
              <div className="flex items-start space-x-4">
                <div className="text-2xl flex-shrink-0">
                  {type.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {type.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={type.cognitiveLoad === 'Low' ? 'green' : type.cognitiveLoad === 'High' ? 'orange' : 'blue'}
                        size="sm"
                      >
                        {type.cognitiveLoad} effort
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{type.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {type.benefits.map(benefit => (
                      <Badge key={benefit} variant="default" size="sm">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    ~{(type.estimatedTime * selectedContentIds.length).toFixed(1)} hours estimated
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Session Summary */}
      {selectedSession && (
        <Card className="p-6 mb-8 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-3">Session Preview</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Session type:</span>
              <p className="font-medium text-gray-900">{selectedSession.title}</p>
            </div>
            <div>
              <span className="text-gray-600">Estimated time:</span>
              <p className="font-medium text-gray-900">~{estimatedDuration.toFixed(1)} hours</p>
            </div>
            <div>
              <span className="text-gray-600">Content pieces:</span>
              <p className="font-medium text-gray-900">{selectedContentIds.length}</p>
            </div>
            <div>
              <span className="text-gray-600">Total questions:</span>
              <p className="font-medium text-gray-900">{totalQuestions}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          onClick={onBack}
        >
          Back to Content
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={() => onStartSession({ 
            type: selectedSessionType, 
            selectedContent: selectedContentIds 
          })}
        >
          Start Learning Session
        </Button>
      </div>
    </div>
  );
};

export default SessionConfigurationInterface;
