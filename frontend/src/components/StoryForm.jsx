import React from 'react';
import Button from './Button';
import StoryInput from './StoryInput';

const StoryForm = ({ formData, onInputChange, onSubmit, loading, isDarkMode }) => {
  return (
    <div className="space-y-6">
      {/* Grid for Genre, Perspective, and Format */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className={`block text-sm font-medium mb-2 font-['Lora'] ${
            isDarkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            Genre
          </label>
          <select
            name="genre"
            value={formData.genre}
            onChange={onInputChange}
            className={`w-full p-3 border-2 rounded-lg ${
              isDarkMode 
                ? 'bg-parchment-dark border-gray-600 text-gray-200' 
                : 'bg-white bg-opacity-50 border-gray-400 text-gray-800'
            } font-['Lora'] focus:outline-none focus:ring-2 focus:ring-gold-500 transition`}
          >
            <option value="fantasy">Fantasy</option>
            <option value="sci-fi">Science Fiction</option>
            <option value="mystery">Mystery</option>
            <option value="horror">Horror</option>
            <option value="adventure">Adventure</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 font-['Lora'] ${
            isDarkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            Perspective
          </label>
          <select
            name="perspective"
            value={formData.perspective}
            onChange={onInputChange}
            className={`w-full p-3 border-2 rounded-lg ${
              isDarkMode 
                ? 'bg-parchment-dark border-gray-600 text-gray-200' 
                : 'bg-white bg-opacity-50 border-gray-400 text-gray-800'
            } font-['Lora'] focus:outline-none focus:ring-2 focus:ring-gold-500 transition`}
          >
            <option value="first-person">First Person</option>
            <option value="second-person">Second Person</option>
            <option value="third-person">Third Person</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 font-['Lora'] ${
            isDarkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            Story Format
          </label>
          <select
            name="format"
            value={formData.format}
            onChange={onInputChange}
            className={`w-full p-3 border-2 rounded-lg ${
              isDarkMode 
                ? 'bg-parchment-dark border-gray-600 text-gray-200' 
                : 'bg-white bg-opacity-50 border-gray-400 text-gray-800'
            } font-['Lora'] focus:outline-none focus:ring-2 focus:ring-gold-500 transition`}
          >
            <option value="narrative">Narrative</option>
            <option value="dialogue">Dialogue</option>
          </select>
        </div>
      </div>

      {/* Full-width inputs */}
      <div>
        <label className={`block text-sm font-medium mb-2 font-['Lora'] ${
          isDarkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Main Plot
        </label>
        <StoryInput
          name="plot"
          value={formData.plot}
          onChange={onInputChange}
          placeholder="Describe the main plot..."
          rows={3}
          isDarkMode={isDarkMode}
        />
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 font-['Lora'] ${
          isDarkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Characters (comma separated)
        </label>
        <StoryInput
          name="characters"
          value={formData.characters}
          onChange={onInputChange}
          placeholder="e.g., John (brave knight), Sarah (wise mage)"
          rows={2}
          isDarkMode={isDarkMode}
        />
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 font-['Lora'] ${
          isDarkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Setting Description
        </label>
        <StoryInput
          name="setting"
          value={formData.setting}
          onChange={onInputChange}
          placeholder="Describe the world or environment..."
          rows={2}
          isDarkMode={isDarkMode}
        />
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onSubmit}
          disabled={loading || !formData.plot}
          color="purple"
          className="hover:scale-105 transform transition-transform"
        >
          {loading ? 'Generating...' : 'Generate Story'}
        </Button>
      </div>
    </div>
  );
};

export default StoryForm;