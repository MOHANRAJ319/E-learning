import React from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CourseList = () => {
  const navigate = useNavigate();
  // Mock data - replace with API call later
  const courses = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      instructor: 'John Doe',
      description: 'Learn the basics of HTML, CSS, and JavaScript',
      image: 'https://source.unsplash.com/random/800x600/?coding',
      price: '$99.99'
    },
    {
      id: 2,
      title: 'Advanced React Programming',
      instructor: 'Jane Smith',
      description: 'Master React.js and its ecosystem',
      image: 'https://source.unsplash.com/random/800x600/?programming',
      price: '$149.99'
    },
    {
      id: 3,
      title: 'Cloud Computing Fundamentals',
      instructor: 'Mike Johnson',
      description: 'Introduction to cloud services and architecture',
      image: 'https://source.unsplash.com/random/800x600/?cloud',
      price: '$129.99'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Available Courses
      </Typography>
      <Grid container spacing={4}>
        {courses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={course.image}
                alt={course.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {course.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Instructor: {course.instructor}
                </Typography>
                <Typography variant="body2" paragraph>
                  {course.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    {course.price}
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CourseList;