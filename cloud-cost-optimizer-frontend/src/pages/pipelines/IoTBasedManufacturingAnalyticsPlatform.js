import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import mermaid from 'mermaid';
import ComputeGraphs from './analyze/ComputeGraphs'

const iotArchitecture = [
  {
    title: 'Edge Processing Layer',
    icon: '🔗',
    color: '#E8F0FE',
    services: [
      { name: 'Sensor Integration', details: ['Device Management (1M devices)', 'Data Collection (10K readings/sec)', 'Edge Filtering (<10ms latency)'] },
      { name: 'Edge Analytics', details: ['Real-time Processing (1ms SLA)', 'Local ML Inference (100ms)', 'Anomaly Detection (real-time)'] },
      { name: 'Edge Storage', details: ['Local Cache (1TB/device)', 'Data Buffering (24h retention)', 'Sync Management (5min cycles)'] },
    ],
  },
  {
    title: 'Core Processing Layer',
    icon: '⚙️',
    color: '#EAF8E6',
    services: [
      { name: 'Stream Processing', details: ['Data Ingestion (1GB/s)', 'Real-time Analytics (100ms)', 'Pattern Detection (5s window)'] },
      { name: 'Predictive Analytics', details: ['ML Model Training (hourly)', 'Failure Prediction (95% accuracy)', 'Performance Optimization (real-time)'] },
      { name: 'Process Optimization', details: ['Quality Control (real-time)', 'Resource Planning (15min updates)', 'Workflow Optimization (hourly)'] },
    ],
  },
  {
    title: 'Data Management Layer',
    icon: '💾',
    color: '#F4EAFB',
    services: [
      { name: 'Time Series Store', details: ['Sensor Data (2PB)', 'Performance Metrics (1PB)', 'Event History (500TB)'] },
      { name: 'Analytics Store', details: ['ML Models (100TB)', 'Analytics Results (500TB)', 'Historical Patterns (200TB)'] },
      { name: 'Operational Store', details: ['Process Parameters (100TB)', 'Quality Metrics (200TB)', 'Maintenance Records (100TB)'] },
    ],
  },
  {
    title: 'Integration Layer',
    icon: '🔗',
    color: '#FEF9E8',
    services: [
      { name: 'Enterprise Integration', details: ['ERP Integration (real-time)', 'MES Integration (5min sync)', 'SCM Integration (hourly)'] },
      { name: 'API Services', details: ['REST APIs (<100ms)', 'Real-time Events (WebSocket)', 'Batch Processing (15min)'] },
      { name: 'Visualization Services', details: ['Real-time Dashboards (1s refresh)', 'Analytics Reports (5min updates)', 'Alert Management (<1s)'] },
    ],
  },
];

const IoTBasedManufacturingAnalyticsPlatform = () => {
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
          🏭🔗 IoT-Based Manufacturing Platform
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
              The platform enables real-time data processing, predictive analytics, and seamless enterprise integration to optimize manufacturing operations.
            </Typography>

            {iotArchitecture.map((layer, index) => (
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
                subgraph EL[Edge Layer]
                    Sensors[IoT Sensors] --> EF[Edge Filtering]
                    EF --> EA[Edge Analytics]
                    EA --> ES[Edge Storage]
                    EA --> AD[Anomaly Detection]
                end

                subgraph PL[Processing Layer]
                    SP[Stream Processing]
                    PA[Predictive Analytics]
                    PO[Process Optimization]
                    ML[ML Training]
                end

                subgraph DM[Data Management]
                    TS[(Time Series Store)]
                    AS[(Analytics Store)]
                    OS[(Operational Store)]
                end

                subgraph IL[Integration Layer]
                    EI[Enterprise Integration]
                    API[API Services]
                    VS[Visualization Services]
                end

                %% Edge to Processing Flow
                ES --> SP
                AD --> SP
                SP --> PA
                SP --> PO
                
                %% Processing to Storage Flow
                PA --> AS
                PO --> OS
                SP --> TS
                ML --> AS
                
                %% ML Training Flow
                TS --> ML
                AS --> ML
                OS --> ML
                
                %% Integration Flow
                TS --> API
                AS --> API
                OS --> API
                
                API --> EI
                API --> VS
                
                %% Real-time Alerts
                AD --> VS
                PA --> VS
                PO --> VS

                classDef edge fill:#f0f0f0,stroke:#333,stroke-width:2px
                classDef process fill:#d4f1f4,stroke:#333
                classDef storage fill:#ffed99,stroke:#333
                classDef integration fill:#E8A87C,stroke:#333
                classDef sensors fill:#95DAC1,stroke:#333

                class EL,PL,DM,IL edge
                class SP,PA,PO,ML,EA,AD process
                class TS,AS,OS storage
                class EI,API,VS integration
                class Sensors,EF,ES sensors
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

export default IoTBasedManufacturingAnalyticsPlatform;
