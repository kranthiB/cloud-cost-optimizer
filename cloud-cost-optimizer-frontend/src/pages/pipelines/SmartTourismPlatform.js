import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import mermaid from 'mermaid';
import ComputeGraphs from './analyze/ComputeGraphs'

const tourismArchitecture = [
  {
    title: 'Experience Layer',
    icon: '🌍',
    color: '#E8F0FE',
    services: [
      { name: 'Personalization Engine', details: ['Preference Analysis (real-time)', 'Experience Matching (<100ms)', 'Cultural Adaptation (dynamic)'] },
      { name: 'Location Services', details: ['Real-time Tracking (1s update)', 'POI Discovery (50m accuracy)', 'Route Optimization (real-time)'] },
      { name: 'Interactive Guides', details: ['AR Experiences (30fps)', 'Virtual Tours (4K quality)', 'Audio Guides (40 languages)'] },
    ],
  },
  {
    title: 'Real-time Services Layer',
    icon: '⚡',
    color: '#EAF8E6',
    services: [
      { name: 'Booking Engine', details: ['Accommodation (real-time)', 'Activities (<500ms confirm)', 'Transport Integration (live)'] },
      { name: 'Crowd Management', details: ['Occupancy Tracking (real-time)', 'Flow Prediction (15min ahead)', 'Capacity Alerts (instant)'] },
      { name: 'Event Services', details: ['Live Updates (real-time)', 'Ticket Management (instant)', 'Schedule Optimization (5min)'] },
    ],
  },
  {
    title: 'Data Management Layer',
    icon: '💾',
    color: '#F4EAFB',
    services: [
      { name: 'Tourist Profiles', details: ['Preferences (1PB)', 'Activity History (2PB)', 'Feedback Data (500TB)'] },
      { name: 'Content Store', details: ['Media Assets (1PB)', 'AR/VR Content (500TB)', 'Guides & Maps (200TB)'] },
      { name: 'Analytics Store', details: ['Behavioral Data (1PB)', 'Traffic Patterns (500TB)', 'Service Usage (200TB)'] },
    ],
  },
  {
    title: 'Integration Layer',
    icon: '🔗',
    color: '#FEF9E8',
    services: [
      { name: 'Travel Services', details: ['Transport APIs (real-time)', 'Hotel Systems (instant)', 'Tour Operators (5min sync)'] },
      { name: 'City Services', details: ['Emergency Services (instant)', 'Tourist Information (5min)', 'Public Transport (real-time)'] },
      { name: 'Partner Network', details: ['Attraction APIs (live)', 'Restaurant Systems (real-time)', 'Event Platforms (5min)'] },
    ],
  },
];

const SmartTourismPlatform = () => {
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
          🌍✈️ Smart Tourism Platform
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
              The platform enhances tourism experiences with AI-driven personalization, real-time booking, and seamless travel services.
            </Typography>

            {tourismArchitecture.map((layer, index) => (
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
                subgraph EL[Experience Layer]
                    PE[Personalization Engine] --> LS[Location Services]
                    LS --> IG[Interactive Guides]
                    UB[User Behavior] --> PE
                end

                subgraph RSL[Real-time Services]
                    BE[Booking Engine]
                    CM[Crowd Management]
                    ES[Event Services]
                    RA[Real-time Analytics]
                end

                subgraph DML[Data Management]
                    TP[(Tourist Profiles)]
                    CS[(Content Store)]
                    AS[(Analytics Store)]
                    FS[(Feature Store)]
                end

                subgraph IL[Integration Layer]
                    TS[Travel Services]
                    CY[City Services]
                    PN[Partner Network]
                    WS[Weather Services]
                end

                %% Experience Flows
                PE --> BE
                LS --> CM
                IG --> ES

                %% Data Flows
                UB --> TP
                TP --> PE
                CS --> IG
                AS --> RA
                RA --> CM

                %% Booking Flows
                BE --> TS
                BE --> PN
                ES --> PN

                %% Service Integration
                TS --> CM
                CY --> CM
                WS --> RA
                PN --> BE

                %% Analytics Flows
                CM --> AS
                BE --> AS
                ES --> AS
                FS --> PE

                %% Emergency Services
                CM --> CY
                LS --> CY

                classDef experience fill:#f0f0f0,stroke:#333,stroke-width:2px
                classDef services fill:#d4f1f4,stroke:#333
                classDef storage fill:#ffed99,stroke:#333
                classDef integration fill:#E8A87C,stroke:#333
                classDef user fill:#95DAC1,stroke:#333

                class EL experience
                class RSL services
                class DML storage
                class IL integration
                class UB user
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
            <ComputeGraphs pipelineName="Smart Tourism Platform" />
          </Paper>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default SmartTourismPlatform;
