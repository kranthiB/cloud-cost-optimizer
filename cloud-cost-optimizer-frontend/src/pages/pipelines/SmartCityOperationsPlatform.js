import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import mermaid from 'mermaid';
import ComputeGraphs from './analyze/ComputeGraphs'

const smartCityArchitecture = [
  {
    title: 'City Sensor Network Layer',
    icon: '🌍',
    color: '#E8F0FE',
    services: [
      { name: 'Environmental Monitoring', details: ['Air Quality (5min intervals)', 'Weather Stations (real-time)', 'Noise Levels (continuous)'] },
      { name: 'Traffic Monitoring', details: ['Traffic Flow (real-time)', 'Signal Status (100ms)', 'Parking Occupancy (1min)'] },
      { name: 'Infrastructure Sensors', details: ['Utility Networks (1min)', 'Building Systems (5min)', 'Public Transport (real-time)'] },
    ],
  },
  {
    title: 'Real-time Operations Layer',
    icon: '⚙️',
    color: '#EAF8E6',
    services: [
      { name: 'Emergency Response', details: ['Incident Detection (<1s)', 'Response Coordination (real-time)', 'Resource Dispatching (<30s)'] },
      { name: 'Traffic Management', details: ['Signal Optimization (5min)', 'Congestion Analysis (real-time)', 'Route Planning (1min update)'] },
      { name: 'Resource Optimization', details: ['Energy Management (15min)', 'Waste Collection (hourly)', 'Water Distribution (real-time)'] },
    ],
  },
  {
    title: 'Data Management Layer',
    icon: '💾',
    color: '#F4EAFB',
    services: [
      { name: 'Operational Data', details: ['Sensor Data (5PB)', 'Event Logs (2PB)', 'Service Records (1PB)'] },
      { name: 'Analytics Store', details: ['Historical Analysis (2PB)', 'Performance Metrics (500TB)', 'Prediction Models (200TB)'] },
      { name: 'City Knowledge Base', details: ['Infrastructure Maps (1PB)', 'Asset Information (500TB)', 'Service Catalogs (100TB)'] },
    ],
  },
  {
    title: 'Service Integration Layer',
    icon: '🔗',
    color: '#FEF9E8',
    services: [
      { name: 'Citizen Services', details: ['Mobile Apps (1M+ users)', 'Service Portals (real-time)', 'Information Systems (5min)'] },
      { name: 'Agency Integration', details: ['Emergency Services (real-time)', 'Municipal Departments (5min)', 'Utility Providers (15min)'] },
      { name: 'Command Center', details: ['Situation Awareness (real-time)', 'Decision Support (instant)', 'Resource Management (1min)'] },
    ],
  },
];

const SmartCityOperationsPlatform = () => {
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
          🌆📡 Smart City Operations Platform
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
              The platform enables real-time urban monitoring, predictive analytics, and smart resource management for efficient city operations.
            </Typography>

            {smartCityArchitecture.map((layer, index) => (
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
                subgraph SNL[Sensor Network Layer]
                    ES[Environmental Sensors] --> DC[Data Collection]
                    TS[Traffic Sensors] --> DC
                    IS[Infrastructure Sensors] --> DC
                    DC --> DV[Data Validation]
                end

                subgraph ROL[Real-time Operations]
                    ER[Emergency Response]
                    TM[Traffic Management]
                    RO[Resource Optimization]
                    PA[Predictive Analytics]
                end

                subgraph DML[Data Management]
                    OD[(Operational Data)]
                    AS[(Analytics Store)]
                    KB[(Knowledge Base)]
                    FS[(Feature Store)]
                end

                subgraph SIL[Service Integration]
                    CS[Citizen Services]
                    AI[Agency Integration]
                    CC[Command Center]
                    EM[Emergency Management]
                end

                %% Main Data Flows
                DV --> OD
                DV --> ER
                DV --> TM
                DV --> RO

                %% Analytics Flows
                OD --> PA
                PA --> ER
                PA --> TM
                PA --> RO

                %% Knowledge Base Flows
                OD --> KB
                AS --> KB
                KB --> CC

                %% Service Integration
                ER --> EM
                TM --> CS
                RO --> AI
                CC --> AI

                %% Historical Analysis
                OD --> AS
                PA --> AS
                AS --> FS
                FS --> PA

                %% Command & Control
                CC --> ER
                CC --> TM
                CC --> RO

                %% Public Services
                CS --> AI
                AI --> EM

                classDef sensors fill:#f0f0f0,stroke:#333,stroke-width:2px
                classDef operations fill:#d4f1f4,stroke:#333
                classDef storage fill:#ffed99,stroke:#333
                classDef services fill:#E8A87C,stroke:#333
                classDef collection fill:#95DAC1,stroke:#333

                class SNL sensors
                class ROL operations
                class DML storage
                class SIL services
                class DC,DV collection
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
            <ComputeGraphs pipelineName="Smart City Operations Platform" />
          </Paper>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default SmartCityOperationsPlatform;
