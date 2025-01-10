import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import SinglePost from './components/SinglePost';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Blog List */}
        <Route path="/" element={<BlogList />} />
        
        {/* Single Post */}
        <Route path="/post/:id" element={<SinglePost />} />
      </Routes>
    </Router>
  );
}

export default App;