import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import mermaid from 'mermaid';
import ComputeGraphs from './analyze/ComputeGraphs'

const vehicleArchitecture = [
  {
    title: 'Vehicle Data Ingestion Layer',
    icon: '🚗',
    color: '#E8F0FE',
    services: [
      { name: 'Telemetry Processing', details: ['Sensor Data (1K signals/sec/car)', 'GPS Tracking (1Hz update)', 'Diagnostic Data (100Hz)'] },
      { name: 'Event Processing', details: ['Critical Alerts (<10ms)', 'System Warnings (real-time)', 'Behavior Events (50ms)'] },
      { name: 'Data Validation', details: ['Signal Validation (real-time)', 'Data Quality (99.999%)', 'Error Correction (5ms)'] },
    ],
  },
  {
    title: 'Real-time Analytics Layer',
    icon: '📊',
    color: '#EAF8E6',
    services: [
      { name: 'Vehicle Analytics', details: ['Performance Analysis (real-time)', 'Battery/Fuel Analytics (1min)', 'Emissions Monitoring (5min)'] },
      { name: 'Driver Analytics', details: ['Behavior Analysis (real-time)', 'Safety Scoring (5min update)', 'Route Optimization (real-time)'] },
      { name: 'Predictive Analytics', details: ['Maintenance Prediction (95% accuracy)', 'Component Life Analysis (hourly)', 'Risk Assessment (real-time)'] },
    ],
  },
  {
    title: 'Data Management Layer',
    icon: '💾',
    color: '#F4EAFB',
    services: [
      { name: 'Time Series Store', details: ['Telemetry Data (20PB)', 'Performance Metrics (10PB)', 'Event History (5PB)'] },
      { name: 'Analytics Store', details: ['Driver Profiles (1PB)', 'Vehicle Models (5PB)', 'ML Features (2PB)'] },
      { name: 'Operational Store', details: ['Maintenance Records (2PB)', 'Configuration Data (1PB)', 'OTA Updates (500TB)'] },
    ],
  },
  {
    title: 'Service Integration Layer',
    icon: '🔗',
    color: '#FEF9E8',
    services: [
      { name: 'Vehicle Services', details: ['OTA Updates (100K vehicles/day)', 'Remote Diagnostics (real-time)', 'Emergency Services (instant)'] },
      { name: 'API Services', details: ['REST APIs (<50ms)', 'MQTT (real-time)', 'Streaming (WebSocket)'] },
      { name: 'Integration Services', details: ['Dealer Systems (5min sync)', 'Service Centers (real-time)', 'Insurance APIs (hourly)'] },
    ],
  },
];

const ConnectedVehicleAnalyticsPlatform = () => {
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
          🚘📊 Connected Vehicles Analytics Platform
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
              The platform ingests high-frequency vehicle telemetry data, applies real-time analytics, and integrates predictive insights with service providers.
            </Typography>

            {vehicleArchitecture.map((layer, index) => (
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
                subgraph VDI[Vehicle Data Ingestion]
                    TS[Telemetry Sensors] --> EP[Event Processor]
                    GPS[GPS Data] --> EP
                    DG[Diagnostics] --> EP
                    EP --> DV[Data Validation]
                end

                subgraph RTA[Real-time Analytics]
                    VA[Vehicle Analytics]
                    DA[Driver Analytics]
                    PA[Predictive Analytics]
                    ML[ML Models]
                end

                subgraph DM[Data Management]
                    TSS[(Time Series Store)]
                    AS[(Analytics Store)]
                    OS[(Operational Store)]
                    FS[(Feature Store)]
                end

                subgraph SI[Service Integration]
                    OTA[OTA Updates]
                    API[API Services]
                    ES[Emergency Services]
                    DS[Dealer Services]
                end

                %% Data Flow Paths
                DV --> TSS
                DV --> VA
                DV --> DA

                %% Analytics Flows
                VA --> PA
                DA --> PA
                TSS --> ML
                ML --> PA
                
                %% Feature Engineering
                TSS --> FS
                AS --> FS
                FS --> ML

                %% Service Integration
                VA --> API
                PA --> OTA
                DA --> ES
                OS --> DS

                %% Feedback Loops
                PA --> OS
                ML --> AS
                API --> EP

                classDef ingestion fill:#f0f0f0,stroke:#333,stroke-width:2px
                classDef analytics fill:#d4f1f4,stroke:#333
                classDef storage fill:#ffed99,stroke:#333
                classDef services fill:#E8A87C,stroke:#333
                classDef sensors fill:#95DAC1,stroke:#333

                class VDI,RTA,DM,SI ingestion
                class VA,DA,PA,ML analytics
                class TSS,AS,OS,FS storage
                class OTA,API,ES,DS services
                class TS,GPS,DG sensors
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
            <ComputeGraphs />
          </Paper>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default ConnectedVehicleAnalyticsPlatform;
