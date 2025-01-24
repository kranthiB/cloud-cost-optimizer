import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import mermaid from 'mermaid';
import ComputeGraphs from './analyze/ComputeGraphs'

const smartGridArchitecture = [
  {
    title: 'Grid Data Collection Layer',
    icon: '⚡',
    color: '#E8F0FE',
    services: [
      { name: 'Smart Meter Integration', details: ['Consumption Data (15min intervals)', 'Power Quality (1min samples)', 'Load Profiles (real-time)'] },
      { name: 'Grid Sensors', details: ['Voltage Monitoring (1sec)', 'Current Measurements (1sec)', 'Frequency Data (100ms)'] },
      { name: 'Renewable Integration', details: ['Solar Production (5min)', 'Wind Generation (real-time)', 'Storage Status (1min)'] },
    ],
  },
  {
    title: 'Real-time Analytics Layer',
    icon: '📊',
    color: '#EAF8E6',
    services: [
      { name: 'Grid Analytics', details: ['Load Balancing (real-time)', 'Power Quality Analysis (1min)', 'Fault Detection (<100ms)'] },
      { name: 'Demand Analytics', details: ['Load Forecasting (15min ahead)', 'Peak Prediction (hourly)', 'Consumption Patterns (daily)'] },
      { name: 'Optimization Engine', details: ['Resource Allocation (5min)', 'Grid Stability (real-time)', 'Cost Optimization (hourly)'] },
    ],
  },
  {
    title: 'Data Management Layer',
    icon: '💾',
    color: '#F4EAFB',
    services: [
      { name: 'Time Series Store', details: ['Meter Data (10PB)', 'Grid Metrics (5PB)', 'Event History (2PB)'] },
      { name: 'Analytics Store', details: ['Consumption Patterns (2PB)', 'Prediction Models (500TB)', 'Performance Data (1PB)'] },
      { name: 'Operational Store', details: ['Grid Configuration (100TB)', 'Asset Information (200TB)', 'Maintenance Records (100TB)'] },
    ],
  },
  {
    title: 'Integration & Control Layer',
    icon: '🔗',
    color: '#FEF9E8',
    services: [
      { name: 'Grid Control', details: ['Load Distribution (real-time)', 'Storage Management (1min)', 'Emergency Response (<10ms)'] },
      { name: 'External Integration', details: ['Weather Services (5min)', 'Market Data (real-time)', 'Regulatory Reporting (daily)'] },
      { name: 'Customer Services', details: ['Usage Portals (5min refresh)', 'Billing Integration (hourly)', 'Demand Response (real-time)'] },
    ],
  },
];

const SmartGridAnalyticsPlatform = () => {
  const [expanded, setExpanded] = useState('approach');
  const [mermaidRendered, setMermaidRendered] = useState(true);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });

    setTimeout(() => {
      mermaid.contentLoaded();
      setMermaidRendered(true);
    }, 500);
  }, []);

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <Container maxWidth="lg">
      {/* Title Section */}
      <Box sx={{ textAlign: 'center', my: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" fontWeight="bold">
          ⚡📊 Smart Grid Analytics Platform
        </Typography>
      </Box>

      {/* Approach Section */}
      <Accordion expanded={expanded === 'approach'} onChange={handleExpand('approach')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">Approach</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper sx={{ p: 3, width: '100%' }}>
            <Typography variant="body1" gutterBottom>
              The platform enables real-time monitoring, demand analytics, and smart grid optimization to enhance energy distribution and grid stability.
            </Typography>

            {smartGridArchitecture.map((layer, index) => (
              <Box key={index} sx={{ mt: 3 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                  {layer.icon} {layer.title}
                </Typography>
                <Paper sx={{ p: 2, backgroundColor: layer.color }}>
                  <Grid container spacing={2}>
                    {layer.services.map((service, idx) => (
                      <Grid item xs={12} sm={4} key={idx}>
                        <Paper sx={{ p: 2 }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {service.name}
                          </Typography>
                          {service.details.map((detail, i) => (
                            <Typography key={i} variant="body2" color="textSecondary">
                              {detail}
                            </Typography>
                          ))}
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Box>
            ))}
          </Paper>
        </AccordionDetails>
      </Accordion>

      {/* Architecture Section */}
      <Accordion expanded={expanded === 'architecture'} onChange={handleExpand('architecture')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">Architecture</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper sx={{ p: 3, width: '100%' }}>
            <div className="mermaid">
              {`
              flowchart TD
                subgraph DCL[Data Collection Layer]
                    SM[Smart Meters] --> DC[Data Collector]
                    GS[Grid Sensors] --> DC
                    RE[Renewable Sources] --> DC
                    DC --> DV[Data Validation]
                end

                subgraph RAL[Real-time Analytics]
                    GA[Grid Analytics]
                    DA[Demand Analytics]
                    OE[Optimization Engine]
                    ML[ML Models]
                end

                subgraph DML[Data Management]
                    TS[(Time Series Store)]
                    AS[(Analytics Store)]
                    OS[(Operational Store)]
                    FS[(Feature Store)]
                end

                subgraph ICL[Integration & Control]
                    GC[Grid Control]
                    EI[External Integration]
                    CS[Customer Services]
                    EM[Emergency Management]
                end

                %% Data Flow Paths
                DV --> TS
                DV --> GA
                DV --> DA

                %% Analytics Flows
                GA --> OE
                DA --> OE
                TS --> ML
                ML --> OE
                
                %% Feature Engineering
                TS --> FS
                AS --> FS
                FS --> ML

                %% Control & Integration
                OE --> GC
                GA --> EM
                DA --> CS
                EI --> DA

                %% Historical Analysis
                TS --> AS
                GA --> AS
                DA --> AS

                %% External Integrations
                EI --> OE
                CS --> DA
                GC --> EM

                classDef collection fill:#f0f0f0,stroke:#333,stroke-width:2px
                classDef analytics fill:#d4f1f4,stroke:#333
                classDef storage fill:#ffed99,stroke:#333
                classDef integration fill:#E8A87C,stroke:#333
                classDef sensors fill:#95DAC1,stroke:#333

                class DCL,RAL,DML,ICL collection
                class GA,DA,OE,ML analytics
                class TS,AS,OS,FS storage
                class GC,EI,CS,EM integration
                class SM,GS,RE,DC sensors
              `}
            </div>
          </Paper>
        </AccordionDetails>
      </Accordion>

      {/* Analyze Section */}
      <Accordion expanded={expanded === 'analyze'} onChange={handleExpand('analyze')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">Graph Analysis</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="Smart Grid Analytics Platform" />
          </Paper>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default SmartGridAnalyticsPlatform;
