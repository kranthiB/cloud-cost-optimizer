import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Grid, Card, CardContent, CircularProgress, Alert } from '@mui/material';
import { Info } from '@mui/icons-material';
import EnhancedGraphVisualization from './EnhancedGraphVisualization';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const ComputeGraphs = ({ pipelineName }) => {
  const [graphData, setGraphData] = useState(null);
  const [costData, setCostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [graphResponse, costResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/v1/pipelines/${pipelineName}/graph`),
          fetch(`${API_BASE_URL}/api/v1/pipelines/${pipelineName}/cost`)
        ]);

        if (!graphResponse.ok || !costResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const graphData = await graphResponse.json();
        const costData = await costResponse.json();

        setGraphData(graphData);
        setCostData(costData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (pipelineName) {
      fetchData();
    }
  }, [pipelineName]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" gap={1} mb={3}>
          <Info color="primary" />
          <Typography variant="h5">
            Infrastructure Graph for {pipelineName}
          </Typography>
        </Box>
        
        {/* Enhanced Graph Visualization */}
        <Box mb={4}>
          <EnhancedGraphVisualization graphData={graphData} />
        </Box>

        {/* Cost Comparison Table */}
        <CostComparisonTable data={costData} />
      </Paper>
    </Box>
  );
};

const CostComparisonTable = ({ data }) => {
  if (!data?.length) return null;

  const sortedData = [...data].sort((a, b) => a.totalCost - b.totalCost);
  
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Regional Cost Comparison
      </Typography>
      <Grid container spacing={3}>
        {sortedData.map((region, index) => (
          <Grid item xs={12} md={6} lg={4} key={region.region}>
            <Card 
              elevation={2}
              sx={{
                border: index === 0 ? 2 : 1,
                borderColor: index === 0 ? 'success.main' : 'divider'
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="subtitle1" color="text.secondary">
                    {region.region}
                  </Typography>
                  {index === 0 && (
                    <Box
                      sx={{
                        bgcolor: 'success.light',
                        color: 'success.dark',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.75rem'
                      }}
                    >
                      Best Option
                    </Box>
                  )}
                </Box>

                <Typography variant="h4" color="primary" gutterBottom>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(region.totalCost)}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary" mt={2} mb={1}>
                  Cost Breakdown
                </Typography>
                {Object.entries(region.costBreakdown).map(([service, cost]) => (
                  <Box
                    key={service}
                    display="flex"
                    justifyContent="space-between"
                    sx={{ mb: 0.5 }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {service}
                    </Typography>
                    <Typography variant="body2">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(cost)}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ComputeGraphs;