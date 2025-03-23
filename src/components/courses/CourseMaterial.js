import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const CourseMaterial = ({ material }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/material/${material.id}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = material.title;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading material:', error);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6">{material.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {material.fileType}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<FileDownloadIcon />}
            onClick={handleDownload}
          >
            Download
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseMaterial;