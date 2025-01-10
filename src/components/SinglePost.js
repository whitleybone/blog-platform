import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const PostContainer = styled.div`
  max-width: 800px;
  margin: 3rem auto;
  padding: 2rem;
  background: #f7e8d0; /* Sand-colored background */
  border-radius: 20px; /* Softer edges */
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1); /* Subtle shadow */
`;

const CoverImage = styled.div`
  height: 300px;
  background-size: cover;
  background-position: center;
  background-image: url('https://via.placeholder.com/800'); /* Default fallback */
  border-radius: 20px;
  margin-bottom: 2rem;
`;

const PostTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: #333; /* Charcoal text */
  margin-bottom: 1.5rem;
  text-align: center;
`;

const PostMeta = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #8e6c5e; /* Muted brown */
  text-align: center;
  margin-bottom: 2rem;
`;

const PostContent = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  color: #333; /* Charcoal for text */
  line-height: 1.8;
  text-align: justify; /* Neat justification for text */
`;

const BackButton = styled.a`
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  color: #fff;
  background-color: #d4a373; /* Terracotta button */
  border: none;
  border-radius: 40px; /* Pill-shaped button */
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #b47c55; /* Darker terracotta on hover */
    transform: translateY(-3px);
  }
`;

const SinglePost = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/posts.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch posts');
        return response.json();
      })
      .then((data) => {
        const foundPost = data.find((p) => p.id === parseInt(id, 10));
        if (!foundPost) throw new Error('Post not found');
        setPost(foundPost);
      })
      .catch((error) => setError(error.message));
  }, [id]);

  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;
  if (!post) return <p style={{ textAlign: 'center' }}>Loading...</p>;

  return (
    <PostContainer>
      {/* Cover Image */}
      <CoverImage style={{ backgroundImage: `url(${post.image})` }} />
      
      {/* Title */}
      <PostTitle>{post.title}</PostTitle>
      
      {/* Metadata */}
      <PostMeta>
        By {post.author || 'Unknown Author'} on {post.date || 'Unknown Date'}
      </PostMeta>
      
      {/* Content */}
      <PostContent>{post.content || 'No content available.'}</PostContent>
      
      {/* Back Button */}
      <BackButton href="/">← Back to Blog List</BackButton>
    </PostContainer>
  );
};

export default SinglePost;