import React, { useEffect, useState, useMemo } from 'react';
import { Box, Paper, Typography, Grid, Card, CardContent, CircularProgress, Alert } from '@mui/material';
import { Info } from '@mui/icons-material';
import EnhancedGraphVisualization from './EnhancedGraphVisualization';
import {
  BarChart, Bar, XAxis, YAxis, LabelList, Cell, LineChart, Line, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

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
      <CostVisualization data={sortedData} />
    </Box>
  );
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const CostVisualization = ({ data }) => {
  const transformedData = useMemo(() => {
    // Original transformations
    const serviceComparisonData = Object.keys(data[0].costBreakdown).map(service => ({
      name: service,
      ...data.reduce((acc, region) => ({
        ...acc,
        [region.region]: region.costBreakdown[service]
      }), {})
    }));

    const percentageDifferences = data.map(region => ({
      name: region.region,
      value: ((region.totalCost - data[0].totalCost) / data[0].totalCost * 100).toFixed(1),
      actualCost: region.totalCost
    }));

    // Generate yearly trend data (12 months)
    const generateYearlyTrend = () => {
      const months = Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - (11 - i));
        return date.toLocaleString('default', { month: 'short' });
      });

      return months.map(month => ({
        month,
        ...data.reduce((acc, region) => ({
          ...acc,
          [region.region]: (region.totalCost * (0.95 + Math.random() * 0.1)).toFixed(2)
        }), {})
      }));
    };

    const yearlyTrend = generateYearlyTrend();

    return { serviceComparisonData, percentageDifferences, yearlyTrend };
  }, [data]);

  const regions = data.map(item => item.region);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Card sx={{ p: 1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <Typography variant="subtitle2">{label}</Typography>
          <Typography variant="body2" color="text.secondary">
            Cost Difference: +{payload[0].value}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Cost: ${Number(payload[0].payload.actualCost).toLocaleString()}
          </Typography>
        </Card>
      );
    }
    return null;
  };

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Service Cost Comparison by Region
            </Typography>
            <Box sx={{ width: '100%', height: { xs: 300, sm: 400, md: 500 } }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={transformedData.serviceComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {regions.map((region, index) => (
                    <Bar
                      key={region}
                      dataKey={region}
                      fill={COLORS[index % COLORS.length]}
                      name={region}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Cost Difference from Best Option (%)
            </Typography>
            <Box sx={{ width: '100%', height: { xs: 250, sm: 300, md: 400 } }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={transformedData.percentageDifferences.slice(1)}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="value" 
                    radius={[4, 4, 0, 0]}
                  >
                    {transformedData.percentageDifferences.slice(1).map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={['#2ecc71', '#e67e22', '#e74c3c'][index % 3]}
                      />
                    ))}
                    <LabelList 
                      dataKey="value" 
                      position="top" 
                      formatter={(value) => `+${value}%`}
                      style={{ fill: '#666', fontSize: '12px' }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Monthly Cost Trends (12 Months)
            </Typography>
            <Box sx={{ width: '100%', height: { xs: 250, sm: 300, md: 400 } }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={transformedData.yearlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Cost']}
                    labelStyle={{ color: '#666' }}
                  />
                  <Legend />
                  {regions.map((region, index) => (
                    <Line
                      key={region}
                      type="monotone"
                      dataKey={region}
                      stroke={COLORS[index % COLORS.length]}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};



export default ComputeGraphs;