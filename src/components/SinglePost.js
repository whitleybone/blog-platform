import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 900px; /* Narrow the blog width */
  margin: 0 auto;
  padding: 2rem;
  background-color: ${(props) => (props.theme === 'dark' ? '#2c2c2c' : '#f7e8d0')};
  color: ${(props) => (props.theme === 'dark' ? '#e0e0e0' : '#333')};
  min-height: 100vh;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  text-align: center;
  font-size: 3rem; /* Adjusted title size */
  color: ${(props) => (props.theme === 'dark' ? '#f1f1f1' : '#4D2D18')}; /* Charcoal for light, light for dark mode */
  margin-top: 1rem; /* Added margin to space title from image */
  margin-bottom: 3rem;
`;

const CardImage = styled.img`
  width: 100%; /* Ensure image takes the full width */
  height: 250px; /* Set the height for the image */
  object-fit: cover; /* Make sure the image covers the area */
  border-radius: 20px; /* Round all the edges of the image */
  margin-bottom: 2rem; /* Space below the image */
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardBody = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: ${(props) => (props.theme === 'dark' ? '#cccccc' : '#6c757d')}; /* Adjust body text color for dark mode */
  line-height: 1.6;
`;

const BackLink = styled(Link)`
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  background-color: ${(props) => (props.theme === 'dark' ? '#555' : '#d4a373')}; /* Button color changes in dark mode */
  padding: 0.5rem 1rem;
  border-radius: 40px; /* Pill-shaped button */
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.theme === 'dark' ? '#777' : '#b47c55')}; /* Hover effect changes in dark mode */
    transform: translateY(-3px);
  }
`;

// SinglePost Component
const SinglePost = ({ theme }) => {
  const { id } = useParams(); // To get the 'id' from the URL
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching posts.json and finding the single post based on the ID
    fetch(`${process.env.PUBLIC_URL}/posts.json`)
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

  if (error) {
    return (
      <Container theme={theme}>
        <Title theme={theme}>{error}</Title>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container theme={theme}>
        <Title theme={theme}>Loading...</Title>
      </Container>
    );
  }

  return (
    <Container theme={theme}>
      <CardImage
        src={post.image || 'https://via.placeholder.com/400'}
        alt={post.title}
      />
      <Title theme={theme}>{post.title}</Title>
      <CardContent>
        <CardBody theme={theme}>{post.content}</CardBody>
      </CardContent>
      <BackLink to="/" theme={theme}>
        Back to Blog List
      </BackLink>
    </Container>
  );
};

export default SinglePost;