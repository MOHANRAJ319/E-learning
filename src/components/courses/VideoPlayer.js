import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Box, Typography, LinearProgress } from '@mui/material';

const VideoPlayer = ({ url, title }) => {
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);

  const handleProgress = (state) => {
    setProgress(state.played * 100);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '960px', margin: '0 auto' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
          controls
          playing={playing}
          onProgress={handleProgress}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default VideoPlayer;