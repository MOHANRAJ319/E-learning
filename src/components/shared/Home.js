import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Welcome to E-Learning Platform
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Learn at Your Pace
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Access course materials anytime, anywhere. Learn at your own convenience.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Expert Instructors
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Learn from industry experts and experienced professionals.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Interactive Learning
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Engage with quizzes, assignments, and live discussions.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;