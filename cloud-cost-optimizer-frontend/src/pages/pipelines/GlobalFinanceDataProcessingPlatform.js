import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import mermaid from 'mermaid';
import ComputeGraphs from './analyze/ComputeGraphs'

const financeArchitecture = [
  {
    title: 'Market Data Layer',
    icon: '📊',
    color: '#E8F0FE',
    services: [
      { name: 'Data Feed Handlers', details: ['Market Feed Processors (100K msg/sec)', 'Normalization Engine (<10μs latency)', 'Real-time Validation (99.999% accuracy)'] },
      { name: 'Order Processing', details: ['Order Book Management (1M orders/sec)', 'Matching Engine (<100μs latency)', 'Trade Processor (500K trades/sec)'] },
      { name: 'Real-time Analytics', details: ['Market Analysis (10ms updates)', 'Price Calculation (5ms latency)', 'Risk Analytics (50ms SLA)'] },
    ],
  },
  {
    title: 'Processing Layer',
    icon: '⚙️',
    color: '#EAF8E6',
    services: [
      { name: 'Trading Engine', details: ['Algorithm Processing (100K algo/sec)', 'Position Management (real-time)', 'Order Routing (<50μs latency)'] },
      { name: 'Risk Engine', details: ['Real-time Risk (100ms updates)', 'Exposure Calculation (real-time)', 'Compliance Checks (<1s SLA)'] },
      { name: 'Analytics Engine', details: ['Performance Analytics (5min updates)', 'Portfolio Analysis (real-time)', 'Market Analysis (1min updates)'] },
    ],
  },
  {
    title: 'Data Management Layer',
    icon: '💾',
    color: '#F4EAFB',
    services: [
      { name: 'Time Series Store', details: ['Market Data History (5PB)', 'Price Series (2PB)', 'Analytics History (3PB)'] },
      { name: 'Transaction Store', details: ['Order History (1PB)', 'Trade Records (2PB)', 'Position Data (500TB)'] },
      { name: 'Analytics Store', details: ['Risk Data (1PB)', 'Performance Metrics (500TB)', 'Compliance Data (1PB)'] },
    ],
  },
  {
    title: 'Compliance & Security Layer',
    icon: '🔒',
    color: '#FEF9E8',
    services: [
      { name: 'Compliance Engine', details: ['Rule Processing (1M rules)', 'Audit Logging (100TB/day)', 'Regulatory Reporting (hourly)'] },
      { name: 'Security Services', details: ['Authentication (<50ms)', 'Authorization (<10ms)', 'Encryption (AES-256)'] },
      { name: 'Monitoring', details: ['System Monitoring (real-time)', 'Performance Tracking (1s updates)', 'Alert Management (<1s)'] },
    ],
  },
];

const GlobalFinanceDataProcessingPlatform = () => {
  const [expanded, setExpanded] = useState('approach'); // Default expanded to "Approach"
  const [mermaidRendered, setMermaidRendered] = useState(true);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true, // Prevent auto-loading
      theme: 'default',
      securityLevel: 'loose',
    });

    setTimeout(() => {
      mermaid.contentLoaded(); // Ensures Mermaid renders correctly
      setMermaidRendered(true); // Trigger a re-render after Mermaid initializes
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
          🌍💰 Global Finance Data Processing Platform
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
              This platform follows a structured approach to ensure efficient market data processing, real-time analytics, and robust compliance.
            </Typography>

            {financeArchitecture.map((layer, index) => (
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
                subgraph MD[Market Data Layer]
                    MF[Market Feeds] --> FH[Feed Handlers]
                    FH --> NE[Normalization Engine]
                    NE --> RV[Real-time Validation]
                end

                subgraph PL[Processing Layer]
                    TE[Trading Engine]
                    RE[Risk Engine]
                    AE[Analytics Engine]
                end

                subgraph DM[Data Management]
                    TS[(Time Series Store)]
                    TRS[(Transaction Store)]
                    AS[(Analytics Store)]
                end

                subgraph CS[Compliance & Security]
                    CE[Compliance Engine]
                    SS[Security Services]
                    MON[Monitoring]
                end

                %% Market Data Flow
                RV --> TE
                RV --> RE
                RV --> TS

                %% Processing Flow
                TE --> TRS
                TE --> RE
                RE --> AS
                RE --> CE

                %% Analytics Flow
                AE --> AS
                AE --> CE
                
                %% Compliance Flow
                CE --> MON
                SS --> MON

                %% Data Storage Flow
                TS --> AE
                TRS --> AE
                AS --> MON

                classDef layer fill:#f0f0f0,stroke:#333,stroke-width:2px
                classDef process fill:#d4f1f4,stroke:#333
                classDef storage fill:#ffed99,stroke:#333
                classDef security fill:#E8A87C,stroke:#333

                class MD,PL,DM,CS layer
                class FH,NE,RV,TE,RE,AE process
                class TS,TRS,AS storage
                class CE,SS,MON security
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
            <ComputeGraphs pipelineName="Global Finance Data Processing Platform" />
          </Paper>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default GlobalFinanceDataProcessingPlatform;
