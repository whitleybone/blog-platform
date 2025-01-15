import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: ${(props) =>
    props.theme === 'dark' ? '#2c2c2c' : '#f7e8d0'}; /* Sand background for light mode, dark background for dark mode */
  color: ${(props) => (props.theme === 'dark' ? '#e0e0e0' : '#333')}; /* Text color based on theme */
  min-height: 100vh;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  text-align: center;
  font-size: 5rem;
  color: ${(props) => (props.theme === 'dark' ? '#f1f1f1' : '#4D2D18')}; /* Light text for dark mode */
  margin-bottom: 3rem;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const BlogCard = styled.div`
  background: ${(props) =>
    props.theme === 'dark' ? '#3e3e3e' : '#ffffff'}; /* Dark card background for dark mode */
  border-radius: 20px;
  box-shadow: ${(props) =>
    props.theme === 'dark'
      ? '0px 8px 20px rgba(255, 255, 255, 0.1)'
      : '0px 8px 20px rgba(0, 0, 0, 0.1)'}; /* Adjust shadow for dark mode */
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${(props) =>
      props.theme === 'dark'
        ? '0px 12px 30px rgba(255, 255, 255, 0.2)'
        : '0px 12px 30px rgba(0, 0, 0, 0.15)'}; /* Enhance shadow on hover */
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
  color: ${(props) => (props.theme === 'dark' ? '#f1f1f1' : '#333')}; /* Light text for dark mode */
  margin-bottom: 1rem;
  text-transform: uppercase;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) =>
      props.theme === 'dark' ? '#ffb07c' : '#b47c55'}; /* Terracotta hover effect */
  }
`;

const CardExcerpt = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: ${(props) =>
    props.theme === 'dark' ? '#cccccc' : '#6c757d'}; /* Adjust text color for dark mode */
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
  background-color: ${(props) =>
    props.theme === 'dark' ? '#555' : '#d4a373'}; /* Adjust button color for dark mode */
  padding: 0.5rem 1rem;
  border-radius: 40px;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.theme === 'dark' ? '#777' : '#b47c55'}; /* Darker hover effect for dark mode */
    transform: translateY(-3px);
  }
`;

// BlogList Component
const BlogList = ({ theme }) => {
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
      <Container theme={theme}>
        <Title theme={theme}>Error: {error}</Title>
      </Container>
    );
  }

  return (
    <Container theme={theme}>
      <Title theme={theme}>Aura & Artisan</Title>
      <BlogGrid>
        {posts.map((post) => (
          <BlogCard key={post.id} theme={theme}>
            <CardImage
              style={{
                backgroundImage: `url(${post.image || 'https://via.placeholder.com/400'})`, // Fallback to placeholder
              }}
            />
            <CardContent>
              <CardTitle theme={theme}>{post.title}</CardTitle>
              <CardExcerpt theme={theme}>{post.excerpt}</CardExcerpt>
              <ReadMore to={`/post/${post.id}`} theme={theme}>
                Read More
              </ReadMore>
            </CardContent>
          </BlogCard>
        ))}
      </BlogGrid>
    </Container>
  );
};

export default BlogList;