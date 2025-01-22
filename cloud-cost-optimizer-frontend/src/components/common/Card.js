import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const CustomCard = ({ title, value, icon }) => {
  return (
    <Card sx={{ minWidth: 250, textAlign: 'center', p: 2, boxShadow: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
          {icon}
        </Box>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;