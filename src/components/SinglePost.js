import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Add Link here
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 900px; /* Narrow the blog width */
  margin: 0 auto;
  padding: 2rem;
  background-color: #f7e8d0; /* Sand background */
  min-height: 100vh;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  text-align: center;
  font-size: 3rem; /* Adjusted title size */
  color: #4D2D18; /* Charcoal text */
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
  color: #6c757d; /* Muted gray for the body */
  line-height: 1.6;
`;

const BackLink = styled(Link)`
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

const SinglePost = () => {
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
    return <Container><Title>{error}</Title></Container>;
  }

  if (!post) {
    return <Container><Title>Loading...</Title></Container>;
  }

  return (
    <Container>
      <CardImage src={post.image || 'https://via.placeholder.com/400'} alt={post.title} />
      <Title>{post.title}</Title>
      <CardContent>
        <CardBody>{post.content}</CardBody>
      </CardContent>
      <BackLink to="/">Back to Blog List</BackLink>
    </Container>
  );
};

export default SinglePost;