import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Box, List, ListItem, ListItemButton, ListItemText, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VideoPlayer from './VideoPlayer';
import CourseMaterial from './CourseMaterial';

const CourseDetail = () => {
  const { id } = useParams();
  const [currentModule, setCurrentModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    setCourse({
      id: id,
      title: 'Introduction to Web Development',
      instructor: 'John Doe',
      description: 'A comprehensive course covering all aspects of web development from basics to advanced concepts.',
      price: '$99.99',
      duration: '12 weeks',
      level: 'Beginner',
      modules: [
        {
          title: 'Module 1: HTML Fundamentals',
          lessons: [
            {
              title: 'Basic Structure',
              videoUrl: 'https://example.com/video1',
              materials: [
                { id: 1, title: 'HTML Basics PDF', fileType: 'PDF' },
                { id: 2, title: 'Exercise Files', fileType: 'ZIP' }
              ]
            }
          ]
        }
      ]
    });
    setLoading(false);
  }, [id]);

  const handleLessonClick = (moduleIndex, lessonIndex) => {
    setCurrentModule(moduleIndex);
    setCurrentLesson(lessonIndex);
  };

  if (loading) {
    return <Container><Typography>Loading...</Typography></Container>;
  }

  const currentLessonData = course?.modules[currentModule]?.lessons[currentLesson];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>{course.title}</Typography>
          <Typography variant="subtitle1" gutterBottom>
            Instructor: {course.instructor} | Level: {course.level} | Duration: {course.duration}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <VideoPlayer 
            url={currentLessonData?.videoUrl} 
            title={currentLessonData?.title} 
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Box sx={{ mt: 2 }}>
            {course.modules.map((module, moduleIndex) => (
              <Accordion 
                key={moduleIndex}
                expanded={currentModule === moduleIndex}
                onChange={() => setCurrentModule(moduleIndex)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">{module.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {module.lessons.map((lesson, lessonIndex) => (
                      <ListItem key={lessonIndex} disablePadding>
                        <ListItemButton 
                          selected={currentModule === moduleIndex && currentLesson === lessonIndex}
                          onClick={() => handleLessonClick(moduleIndex, lessonIndex)}
                        >
                          <ListItemText primary={lesson.title} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>Course Materials</Typography>
          {currentLessonData?.materials?.map((material, index) => (
            <CourseMaterial key={index} material={material} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseDetail;