import React from 'react';
import { Grid, Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MovieIcon from '@mui/icons-material/Movie';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MemoryIcon from '@mui/icons-material/Memory';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BoltIcon from '@mui/icons-material/Bolt';
import BusinessIcon from '@mui/icons-material/Business';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const industryIcons = {
  "Media & Communications": <MovieIcon fontSize="large" sx={{ color: '#FF5722' }} />,
  "Banking, Financial Services & Insurance": <AttachMoneyIcon fontSize="large" sx={{ color: '#4CAF50' }} />,
  "Technology & Consumer Electronics": <MemoryIcon fontSize="large" sx={{ color: '#2196F3' }} />,
  "Healthcare": <LocalHospitalIcon fontSize="large" sx={{ color: '#E91E63' }} />,
  "Retail & Ecommerce": <ShoppingCartIcon fontSize="large" sx={{ color: '#9C27B0' }} />,
  "Automotive": <DirectionsCarIcon fontSize="large" sx={{ color: '#FF9800' }} />,
  "Energy & Utilities": <BoltIcon fontSize="large" sx={{ color: '#607D8B' }} />,
  "Government & Public Sector": <BusinessIcon fontSize="large" sx={{ color: '#3F51B5' }} />,
  "Travel, Transportation & Tourism": <FlightTakeoffIcon fontSize="large" sx={{ color: '#00BCD4' }} />
};

const PipelineList = ({ pipelines }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" textAlign="center" gutterBottom>
        Business Pipelines
      </Typography>
      <Grid container spacing={3}>
        {pipelines.map((pipeline, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{ 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                minHeight: 300,  // Ensures cards have equal height but flexible for text
                p: 2,
                borderRadius: 2,
                boxShadow: 3,
                transition: '0.3s',
                '&:hover': { boxShadow: 6, cursor: 'pointer' }
              }}
              onClick={() => navigate(pipeline.path)}
            >
              <IconButton>
                {industryIcons[pipeline.industry] || <BusinessIcon fontSize="large" />}
              </IconButton>
              <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {pipeline.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="textSecondary"
                  sx={{ wordWrap: 'break-word', whiteSpace: 'normal' }} // Allows full text visibility
                >
                  {pipeline.description}
                </Typography>
              </CardContent>
              <Typography variant="caption" display="block" color="gray" sx={{ mt: 1 }}>
                Created: {new Date(pipeline.createdAt).toLocaleString()}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PipelineList;
