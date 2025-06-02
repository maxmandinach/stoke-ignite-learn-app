
import React, { useState } from 'react';
import { Card, Button, Badge, ProgressBar } from './ui/design-system';

// Mock data for demonstration
const mockContent = [
  {
    id: '1',
    title: 'The Psychology of Learning and Memory',
    source: 'Huberman Lab Podcast',
    duration_hours: 2.5,
    topics: ['Science', 'Personal Development'],
    questions: 45,
    mastery_percentage: 78,
    content_type: 'podcast'
  },
  {
    id: '2',
    title: 'Building Habits That Last',
    source: 'Atomic Habits Book',
    duration_hours: 1.8,
    topics: ['Personal Development'],
    questions: 32,
    mastery_percentage: 92,
    content_type: 'book'
  },
  {
    id: '3',
    title: 'Introduction to Machine Learning',
    source: 'MIT OpenCourseWare',
    duration_hours: 3.2,
    topics: ['Technology', 'Education'],
    questions: 67,
    mastery_percentage: 45,
    content_type: 'lecture'
  },
  {
    id: '4',
    title: 'The Science of Sleep Optimization',
    source: 'Sleep Foundation Article',
    duration_hours: 0.8,
    topics: ['Science', 'Personal Development'],
    questions: 18,
    mastery_percentage: 85,
    content_type: 'article'
  }
];

const topicColors = {
  'Science': 'blue',
  'Personal Development': 'green',
  'Technology': 'purple',
  'Education': 'orange'
} as const;

const contentTypeIcons = {
  podcast: '🎧',
  book: '📚',
  lecture: '🎓',
  article: '📄',
  video: '🎥'
} as const;

interface ContentSelectionInterfaceProps {
  onContinue: (selectedIds: string[]) => void;
}

const ContentSelectionInterface: React.FC<ContentSelectionInterfaceProps> = ({ onContinue }) => {
  const [selectedContent, setSelectedContent] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const allTopics = Array.from(new Set(mockContent.flatMap(item => item.topics)));

  const filteredContent = mockContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopics = selectedTopics.length === 0 || 
                         item.topics.some(topic => selectedTopics.includes(topic));
    return matchesSearch && matchesTopics;
  });

  const toggleContentSelection = (id: string) => {
    setSelectedContent(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleTopicFilter = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const getTotalQuestions = () => {
    return mockContent
      .filter(item => selectedContent.includes(item.id))
      .reduce((total, item) => total + item.questions, 0);
  };

  const getEstimatedTime = () => {
    return mockContent
      .filter(item => selectedContent.includes(item.id))
      .reduce((total, item) => total + item.duration_hours, 0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Search and Filters */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose your learning content</h2>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search content..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Topic Filters */}
        <div className="flex flex-wrap gap-2">
          {allTopics.map(topic => (
            <button
              key={topic}
              onClick={() => toggleTopicFilter(topic)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ${
                selectedTopics.includes(topic)
                  ? `bg-${topicColors[topic as keyof typeof topicColors]}-100 border-${topicColors[topic as keyof typeof topicColors]}-300 text-${topicColors[topic as keyof typeof topicColors]}-800`
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid gap-4 mb-8">
        {filteredContent.map(item => (
          <Card
            key={item.id}
            onClick={() => toggleContentSelection(item.id)}
            selected={selectedContent.includes(item.id)}
            className="p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">
                    {contentTypeIcons[item.content_type as keyof typeof contentTypeIcons]}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {item.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-3">{item.source}</p>
                
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-sm text-gray-500">
                    {item.duration_hours}h • {item.questions} questions
                  </span>
                  {item.topics.map(topic => (
                    <Badge
                      key={topic}
                      variant={topicColors[topic as keyof typeof topicColors]}
                      size="sm"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">
                        {item.mastery_percentage}%
                      </span>
                    </div>
                    <ProgressBar progress={item.mastery_percentage} size="sm" />
                  </div>
                </div>
              </div>
              
              <div className="ml-4 flex-shrink-0">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  selectedContent.includes(item.id)
                    ? 'bg-blue-600 border-blue-600'
                    : 'border-gray-300'
                }`}>
                  {selectedContent.includes(item.id) && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Selection Summary & Continue Button */}
      {selectedContent.length > 0 && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  {selectedContent.length} item{selectedContent.length !== 1 ? 's' : ''} selected
                </p>
                <p className="text-sm text-gray-600">
                  {getTotalQuestions()} questions • ~{getEstimatedTime().toFixed(1)}h estimated
                </p>
              </div>
              <Button
                variant="primary"
                size="lg"
                onClick={() => onContinue(selectedContent)}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentSelectionInterface;
