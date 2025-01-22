import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
        py: 1,
        bgcolor: 'primary.main',
        color: 'white',
      }}
    >
      <Typography variant="body2">© {new Date().getFullYear()} Cloud Cost Optimizer. All Rights Reserved.</Typography>
    </Box>
  );
};

export default Footer;
