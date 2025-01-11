import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList'; // Import the BlogList component
import SinglePost from './components/SinglePost'; // Import the SinglePost component
import ScrollingQuotes from './components/ScrollingQuotes'; // Import the ScrollingQuotes component
import './styles/global.css';

const App = () => {
  return (
    <Router basename="/blog-platform">
      <div>
        {/* Add the ScrollingQuotes component */}
        <ScrollingQuotes />
        <Routes>
          {/* Blog List Route */}
          <Route path="/" element={<BlogList />} />

          {/* Single Post Route */}
          <Route path="/post/:id" element={<SinglePost />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;