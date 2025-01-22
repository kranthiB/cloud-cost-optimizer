import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import mermaid from 'mermaid';
import ComputeGraphs from './analyze/ComputeGraphs'

const ecommerceArchitecture = [
  {
    title: 'User Interaction Layer',
    icon: '🛒',
    color: '#E8F0FE',
    services: [
      { name: 'Session Management', details: ['User Tracking (1M concurrent)', 'Behavior Analysis (real-time)', 'Journey Mapping (<50ms)'] },
      { name: 'Event Processing', details: ['Click Stream (100K events/sec)', 'Search Patterns (50K/sec)', 'Cart Actions (10K/sec)'] },
      { name: 'Context Engine', details: ['Location Awareness (real-time)', 'Device Context (100% coverage)', 'Time-based Analysis (24/7)'] },
    ],
  },
  {
    title: 'Personalization Engine',
    icon: '🎯',
    color: '#EAF8E6',
    services: [
      { name: 'Real-time Recommendations', details: ['Product Suggestions (<100ms)', 'Cross-sell Analysis (real-time)', 'Basket Analysis (95% accuracy)'] },
      { name: 'ML Models', details: ['Collaborative Filtering (hourly)', 'Content-based (daily)', 'Hybrid Models (real-time)'] },
      { name: 'Dynamic Pricing', details: ['Price Optimization (5min)', 'Inventory Analysis (real-time)', 'Competitor Tracking (hourly)'] },
    ],
  },
  {
    title: 'Data Management Layer',
    icon: '💾',
    color: '#F4EAFB',
    services: [
      { name: 'User Profiles', details: ['Profile Store (500M users)', 'Preference Data (2PB)', 'History Store (1PB)'] },
      { name: 'Product Catalog', details: ['Product Data (100M items)', 'Attribute Store (500TB)', 'Media Assets (1PB)'] },
      { name: 'Analytics Store', details: ['Behavioral Data (1PB)', 'Transaction History (500TB)', 'Model Features (200TB)'] },
    ],
  },
  {
    title: 'Integration Layer',
    icon: '🔗',
    color: '#FEF9E8',
    services: [
      { name: 'Commerce Integration', details: ['Order Management (10K/min)', 'Inventory Sync (real-time)', 'Pricing Engine (5min sync)'] },
      { name: 'API Services', details: ['REST APIs (<50ms)', 'GraphQL (real-time)', 'Event Streams (WebSocket)'] },
      { name: 'Analytics Services', details: ['A/B Testing (real-time)', 'Performance Analytics (1min)', 'Business Metrics (hourly)'] },
    ],
  },
];

const EcommercePersonalizationPlatform = () => {
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
          🛒🎯 E-commerce Personalization Platform
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
              The platform provides AI-driven personalization, optimizing user experience with real-time recommendations, behavioral insights, and dynamic pricing.
            </Typography>

            {ecommerceArchitecture.map((layer, index) => (
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
                subgraph UIL[User Interaction Layer]
                    UT[User Tracking] --> EP[Event Processing]
                    EP --> CE[Context Engine]
                    SR[Search & Browse] --> EP
                    CA[Cart Actions] --> EP
                end

                subgraph PE[Personalization Engine]
                    RR[Real-time Recommendations]
                    ML[ML Models]
                    DP[Dynamic Pricing]
                    AB[A/B Testing]
                end

                subgraph DM[Data Management]
                    UP[(User Profiles)]
                    PC[(Product Catalog)]
                    AS[(Analytics Store)]
                    FS[(Feature Store)]
                end

                subgraph IL[Integration Layer]
                    API[API Services]
                    ES[Event Streaming]
                    CI[Commerce Integration]
                    AN[Analytics Service]
                end

                %% User Interaction Flows
                CE --> RR
                EP --> ML
                EP --> AS

                %% Personalization Flows
                ML --> RR
                ML --> DP
                FS --> ML
                RR --> AB

                %% Data Flows
                UP --> RR
                PC --> RR
                AS --> ML
                AS --> AN

                %% Integration Flows
                RR --> API
                DP --> API
                AB --> AN
                CI --> PC
                EP --> ES

                %% Real-time Updates
                API --> UT
                ES --> CE
                AN --> AB

                classDef interaction fill:#f0f0f0,stroke:#333,stroke-width:2px
                classDef engine fill:#d4f1f4,stroke:#333
                classDef storage fill:#ffed99,stroke:#333
                classDef integration fill:#E8A87C,stroke:#333
                classDef tracking fill:#95DAC1,stroke:#333

                class UIL,PE,DM,IL interaction
                class RR,ML,DP,AB engine
                class UP,PC,AS,FS storage
                class API,ES,CI,AN integration
                class UT,SR,CA,CE tracking
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

export default EcommercePersonalizationPlatform;
