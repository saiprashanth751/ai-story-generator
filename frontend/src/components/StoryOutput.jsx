import React from 'react';
import { FaScroll } from 'react-icons/fa';

const StoryOutput = ({ story, loading, isDarkMode }) => {
  const formatStoryContent = (content) => {
    if (!content) return [];
    // Split by newlines and filter out empty lines
    const lines = content.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    return lines;
  };

  const storyLines = formatStoryContent(story);

  return (
    <div className="relative h-full">
      <div className="absolute top-0 left-0 text-gold-600 text-2xl animate-fade-in">
        <FaScroll />
      </div>
      
      <div className="h-full flex flex-col pl-8">
        <h2 className={`text-xl font-semibold mb-4 font-['MedievalSharp'] ${
          isDarkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Generated Story
        </h2>
        
        <div className="flex-1 overflow-y-auto pr-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold-600"></div>
            </div>
          ) : storyLines.length > 0 ? (
            <div className={`space-y-2 leading-relaxed animate-fade-in ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {storyLines.map((line, index) => (
                <p 
                  key={index}
                  className={`${line.includes(':') ? 'font-semibold' : ''} text-justify`}
                >
                  {line}
                </p>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className={`italic text-center ${
                isDarkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                Your generated story will appear here...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryOutput;