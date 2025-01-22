import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PipelineList from '../components/lists/PipelineList';

const businessPipelines = [
  {
    "name": "Global Media Streaming Platform",
    "description": "An AI-driven media analytics platform for content ingestion, streaming optimization, user insights, and intelligent recommendations.",
    "createdAt": new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    "path": "/pipelines/global-media-streaming-platform",
    "industry": "Media & Communications"
  },
  {
    "name": "Global Finance Data Processing Platform",
    "description": "A high-performance financial data processing platform that handles real-time market data, trading analytics, risk management, and compliance, ensuring low-latency and high-reliability data transactions.",
    "createdAt": new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    "path": "/pipelines/global-finance-data-processing-platform",
    "industry": "Banking, Financial Services & Insurance"
  },
  {
    "name": "IoT-Based Manufacturing Analytics Platform",
    "description": "A real-time IoT-driven manufacturing analytics platform enabling predictive maintenance, process optimization, and seamless enterprise integration.",
    "createdAt": new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
    "path": "/pipelines/iot-manufacturing-analytics-platform",
    "industry": "Technology & Consumer Electronics"
  },
  {
    "name": "Healthcare Data Exchange Platform",
    "description": "A secure, AI-powered healthcare data exchange platform enabling medical imaging, clinical analytics, and regulatory compliance.",
    "createdAt": new Date(Date.now() - 0.5 * 60 * 60 * 1000).toISOString(),
    "path": "/pipelines/healthcare-data-exchange-platform",
    "industry": "Healthcare"
  },
  {
    "name": "E-commerce Personalization Platform",
    "description": "An AI-driven e-commerce personalization platform that enhances user engagement through real-time recommendations, dynamic pricing, and behavioral analytics.",
    "createdAt": new Date(Date.now() - 1.75 * 60 * 60 * 1000).toISOString(),
    "path": "/pipelines/ecommerce-personalization-platform",
    "industry": "Retail & Ecommerce"
  },
  {
    "name": "Connected Vehicle Analytics Platform",
    "description": "An AI-powered platform enabling real-time vehicle data ingestion, analytics, predictive maintenance, and service integration for enhanced mobility insights.",
    "createdAt": new Date(Date.now() - 0.75 * 60 * 60 * 1000).toISOString(),
    "path": "/pipelines/connected-vehicle-analytics-platform",
    "industry": "Automotive"
  },
  {
    "name": "Smart Grid Analytics Platform",
    "description": "An AI-driven platform for real-time grid monitoring, demand analytics, and optimization of energy distribution, ensuring efficiency and stability.",
    "createdAt": new Date(Date.now() - 1.25 * 60 * 60 * 1000).toISOString(),
    "path": "/pipelines/smart-grid-analytics-platform",
    "industry": "Energy & Utilities"
  },
  {
    "name": "Smart City Operations Platform",
    "description": "A real-time platform for city-wide monitoring, traffic management, emergency response, and resource optimization, ensuring smarter urban operations.",
    "createdAt": new Date(Date.now() - 0.25 * 60 * 60 * 1000).toISOString(),
    "path": "/pipelines/smart-city-operations-platform",
    "industry": "Government & Public Sector"
  },
  {
    "name": "Smart Toursim Platform",
    "description": "An AI-driven tourism platform offering real-time recommendations, crowd management, and seamless integration with travel, city, and partner services.",
    "createdAt": new Date(Date.now() - 1.1 * 60 * 60 * 1000).toISOString(),
    "path": "/pipelines/smart-tourism-platform",
    "industry": "Travel, Transportation & Tourism"
  }
];

const Pipelines = () => {
  const navigate = useNavigate();

  const handleCreatePipeline = () => {
    navigate('/pipeline-architecture');
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header section with title and create button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Pipelines</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleCreatePipeline}
        >
          + Create Pipeline
        </Button>
      </Box>

      {/* Pipeline List */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <PipelineList pipelines={businessPipelines} />
      </Paper>
    </Box>
  );
};

export default Pipelines;
