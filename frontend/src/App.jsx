import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StoryForm from './components/StoryForm';
import StoryOutput from './components/StoryOutput';
import { FaSun, FaMoon } from 'react-icons/fa';

function App() {
  const [formData, setFormData] = useState({
    genre: 'fantasy',
    plot: '',
    perspective: 'third-person',
    characters: '',
    setting: '',
    format: 'narrative'
  });
  const [story, setStory] = useState('Your story will appear here');
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [lastRequest, setLastRequest] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // API Client with base URL
  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    timeout: 25000
  });

  const cacheStory = (key, content) => {
    localStorage.setItem(`story_${key}`, content);
  };

  const getCachedStory = (key) => {
    return localStorage.getItem(`story_${key}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addNotification = (message, type = 'error') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== id));
    }, 5000);
  };

  const generateStory = async () => {
    const now = Date.now();
    if (now - lastRequest < 30000) {
      addNotification("Please wait 30 seconds between requests");
      return;
    }

    setLoading(true);
    setLastRequest(now);

    try {
      const cacheKey = JSON.stringify(formData);
      const cached = getCachedStory(cacheKey);
      if (cached) {
        setStory(cached);
        addNotification("Loaded from cache", "success");
        return;
      }

      const response = await apiClient.post('/story/generate', {
        ...formData,
        characters: formData.characters.split(',').map(c => c.trim()).filter(c => c)
      });

      if (response.data?.story) {
        setStory(response.data.story);
        cacheStory(cacheKey, response.data.story);
        addNotification("Story generated successfully", "success");
      } else {
        throw new Error('Empty response from server');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
                         (err.code === 'ECONNABORTED' ? 'Request timed out' : 
                         err.message || 'Failed to generate story');
      addNotification(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-parchment-dark text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
      <header className={`${isDarkMode ? 'bg-parchment-light' : 'bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold font-['MedievalSharp']">
            AI Story Generator
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <FaSun className="text-gold-600" /> : <FaMoon className="text-gray-600" />}
          </button>
        </div>
      </header>

      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(({ id, message, type }) => (
          <div
            key={id}
            className={`px-4 py-2 rounded-lg shadow-md animate-fade-in-out ${
              type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
            }`}
          >
            {message}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 h-full">
          <div className={`${
            isDarkMode ? 'bg-parchment-light' : 'bg-white'
          } rounded-xl shadow-lg p-6 lg:col-span-2 h-fit lg:h-[calc(100vh-180px)] lg:sticky lg:top-8 transition-colors`}>
            <StoryForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={generateStory}
              loading={loading}
              isDarkMode={isDarkMode}
            />
          </div>

          <div className={`${
            isDarkMode ? 'bg-parchment-light' : 'bg-white'
          } rounded-xl shadow-lg p-6 lg:col-span-3 lg:h-[calc(100vh-180px)] transition-colors`}>
            <StoryOutput story={story} loading={loading} isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;