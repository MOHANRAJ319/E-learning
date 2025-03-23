import React from 'react';
import { Container, Grid, Paper, Typography, Box, LinearProgress, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';

const Dashboard = () => {
  // Mock user data - replace with actual user data later
  const userData = {
    name: 'John Doe',
    enrolledCourses: [
      {
        id: 1,
        title: 'Introduction to Web Development',
        progress: 60,
        nextLesson: 'CSS Flexbox'
      },
      {
        id: 2,
        title: 'Advanced React Programming',
        progress: 30,
        nextLesson: 'Redux State Management'
      }
    ],
    achievements: [
      'Completed HTML Basics',
      'JavaScript Fundamentals Badge',
      'First Project Submission'
    ]
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome back, {userData.name}!
      </Typography>
      
      <Grid container spacing={3}>
        {/* Progress Overview */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your Courses
            </Typography>
            {userData.enrolledCourses.map((course) => (
              <Box key={course.id} sx={{ mb: 3 }}>
                <Typography variant="subtitle1">{course.title}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant="determinate" value={course.progress} />
                  </Box>
                  <Typography variant="body2">{course.progress}%</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Next Lesson: {course.nextLesson}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Achievements */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Achievements
              </Typography>
              <List>
                {userData.achievements.map((achievement, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={achievement} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;