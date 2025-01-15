import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import SinglePost from './components/SinglePost';
import ScrollingQuotes from './components/ScrollingQuotes';
import './styles/global.css';

const App = () => {
  const [theme, setTheme] = useState('light'); // Default to light theme

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router basename="/blog-platform">
      <div className={`app-container ${theme}`}>
        <header>
          <h1>Aura & Artisan</h1>
          <button onClick={toggleTheme}>
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </header>
        <ScrollingQuotes theme={theme} />
        <Routes>
          <Route path="/" element={<BlogList theme={theme} />} />
          <Route path="/post/:id" element={<SinglePost theme={theme} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;