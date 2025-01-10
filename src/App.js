import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import SinglePost from './components/SinglePost';
import './styles/global.css';

function App() {
  return (
    <Router basename="/blog-platform"> {/* Configure basename for GitHub Pages */}
      <Routes>
        {/* Blog List Route */}
        <Route path="/" element={<BlogList />} />
        
        {/* Single Post Route */}
        <Route path="/post/:id" element={<SinglePost />} />
      </Routes>
    </Router>
  );
}

export default App;