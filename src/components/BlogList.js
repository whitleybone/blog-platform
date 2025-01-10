import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f7e8d0; /* Sand background */
  min-height: 100vh;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  text-align: center;
  font-size: 5rem;
  color: #4D2D18; /* Charcoal text */
  margin-bottom: 3rem;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const BlogCard = styled.div`
  background: #ffffff; /* White card background */
  border-radius: 20px; /* Softer edges */
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.15); /* Enhance shadow on hover */
  }
`;

const CardImage = styled.div`
  height: 200px;
  background-size: cover;
  background-position: center;
  background-image: url('https://via.placeholder.com/400'); /* Placeholder image */
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: #333; /* Charcoal text */
  margin-bottom: 1rem;
  text-transform: uppercase;
  transition: color 0.3s ease;

  &:hover {
    color: #b47c55; /* Terracotta hover effect */
  }
`;

const CardExcerpt = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #6c757d; /* Muted gray for excerpts */
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ReadMore = styled(Link)`
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  background-color: #d4a373; /* Terracotta button */
  padding: 0.5rem 1rem;
  border-radius: 40px; /* Pill-shaped button */
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #b47c55; /* Darker terracotta hover effect */
    transform: translateY(-3px);
  }
`;

// BlogList Component
const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/posts.json`)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch posts');
        return response.json();
      })
      .then((data) => setPosts(data)) // Set posts directly from the fetched data
      .catch((error) => setError(error.message)); // Set error state
  }, []);

  if (error) {
    return (
      <Container>
        <Title>Error: {error}</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Aura & Artisan</Title>
      <BlogGrid>
        {posts.map((post) => (
          <BlogCard key={post.id}>
            <CardImage
              style={{
                backgroundImage: `url(${post.image || 'https://via.placeholder.com/400'})`, // Fallback to placeholder
              }}
            />
            <CardContent>
              <CardTitle>{post.title}</CardTitle>
              <CardExcerpt>{post.excerpt}</CardExcerpt>
              <ReadMore to={`/post/${post.id}`}>Read More</ReadMore>
            </CardContent>
          </BlogCard>
        ))}
      </BlogGrid>
    </Container>
  );
};

export default BlogList;