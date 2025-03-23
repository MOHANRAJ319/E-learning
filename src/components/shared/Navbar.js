import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          E-Learning Platform
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/courses')}>Courses</Button>
          <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;