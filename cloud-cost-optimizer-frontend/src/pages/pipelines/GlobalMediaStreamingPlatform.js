import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import mermaid from 'mermaid';
import ComputeGraphs from './analyze/ComputeGraphs'

const mediaArchitecture = [
  {
    title: 'Content Management Layer',
    icon: '🎬',
    color: '#E8F0FE',
    services: [
      { name: 'Ingestion Pipeline', details: ['Content Upload (50TB/day)', 'Quality Validation (real-time)', 'Metadata Extraction (auto)'] },
      { name: 'Transcoding Farm', details: ['Multi-format Encoding (8K)', 'Multi-bitrate Outputs (20)', 'DRM Integration (real-time)'] },
      { name: 'Content Processing', details: ['Scene Detection (ML)', 'Content Tagging (auto)', 'Subtitle Processing (100 langs)'] },
    ],
  },
  {
    title: 'Streaming Service Layer',
    icon: '📡',
    color: '#EAF8E6',
    services: [
      { name: 'Streaming Engine', details: ['Adaptive Bitrate (<100ms)', 'Multi-protocol Support (all)', 'Quality Monitoring (real-time)'] },
      { name: 'CDN Management', details: ['Global Edge Network (200+)', 'Cache Optimization (95% hit)', 'Load Balancing (automatic)'] },
      { name: 'Session Management', details: ['User Authentication (10ms)', 'DRM License (instant)', 'Quality Metrics (real-time)'] },
    ],
  },
  {
    title: 'Data Management Layer',
    icon: '💾',
    color: '#F4EAFB',
    services: [
      { name: 'Content Store', details: ['Master Content (50PB)', 'Encoded Variants (30PB)', 'Metadata Store (5PB)'] },
      { name: 'User Data Store', details: ['Profiles (500M+)', 'Viewing History (10PB)', 'Preferences (2PB)'] },
      { name: 'Analytics Store', details: ['Streaming Analytics (5PB)', 'Performance Data (2PB)', 'ML Features (1PB)'] },
    ],
  },
  {
    title: 'Intelligence Layer',
    icon: '🤖',
    color: '#FEF9E8',
    services: [
      { name: 'Recommendation Engine', details: ['Content Matching (50ms)', 'Personalization (real-time)', 'Trend Analysis (hourly)'] },
      { name: 'Quality Engine', details: ['Experience Monitoring', 'Network Analysis (live)', 'Performance Optimization'] },
      { name: 'Content Intelligence', details: ['Popularity Prediction', 'Content Analysis (ML)', 'Engagement Analytics'] },
    ],
  },
];

const GlobalMediaAnalyticsPlatform = () => {
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
          📡🌎 Global Media Streaming Platform
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
              The platform enhances media streaming with AI-driven content management, intelligent recommendations, and real-time user insights.
            </Typography>

            {mediaArchitecture.map((layer, index) => (
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
                subgraph CML[Content Management]
                    CI[Content Ingestion] --> QV[Quality Validation]
                    QV --> TF[Transcoding Farm]
                    TF --> CP[Content Processing]
                    CP --> DRM[DRM Encryption]
                end

                subgraph SSL[Streaming Service]
                    SE[Streaming Engine]
                    CDN[CDN Management]
                    SM[Session Management]
                    QE[Quality Engine]
                end

                subgraph DML[Data Management]
                    CS[(Content Store)]
                    US[(User Store)]
                    AS[(Analytics Store)]
                    MS[(Metadata Store)]
                end

                subgraph IL[Intelligence Layer]
                    RE[Recommendation Engine]
                    PA[Performance Analytics]
                    CA[Content Analytics]
                    ML[ML Models]
                end

                %% Content Flow
                DRM --> CS
                CS --> CDN
                CDN --> SE
                SE --> SM

                %% User Flow
                SM --> US
                US --> RE
                RE --> SE

                %% Analytics Flow
                SE --> AS
                AS --> PA
                PA --> QE
                QE --> SE

                %% Intelligence Flow
                AS --> ML
                ML --> RE
                ML --> CA
                CA --> RE

                %% Metadata Flow
                CP --> MS
                MS --> RE
                MS --> CA

                classDef content fill:#f0f0f0,stroke:#333,stroke-width:2px
                classDef streaming fill:#d4f1f4,stroke:#333
                classDef storage fill:#ffed99,stroke:#333
                classDef intelligence fill:#E8A87C,stroke:#333
                classDef processing fill:#95DAC1,stroke:#333

                class CML content
                class SSL streaming
                class DML storage
                class IL intelligence
                class CI,QV,TF,CP processing
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
            <ComputeGraphs pipelineName="Global Media Streaming Platform" />
          </Paper>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default GlobalMediaAnalyticsPlatform;
