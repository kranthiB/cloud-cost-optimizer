import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import mermaid from 'mermaid';
import ComputeGraphs from './analyze/ComputeGraphs'

const streamingArchitecture = [
  {
    title: 'Content Processing Layer',
    icon: '📁',
    color: '#E8F0FE',
    services: [
      { name: 'Ingestion Service', details: ['Content Validation', 'Metadata Extraction', 'Quality Checks'] },
      { name: 'Transcoding Service', details: ['Multi-bitrate Encoding', 'Format Conversion', 'Quality Control'] },
      { name: 'Asset Management', details: ['Content Cataloging', 'Version Control', 'Rights Management'] },
    ],
  },
  {
    title: 'Distribution Layer',
    icon: '📡',
    color: '#EAF8E6',
    services: [
      { name: 'CDN Management', details: ['Edge Caching', 'Load Balancing', 'Traffic Routing'] },
      { name: 'Streaming Service', details: ['Adaptive Streaming', 'Protocol Support', 'DRM Integration'] },
      { name: 'Quality Management', details: ['Quality Monitoring', 'Bandwidth Optimization', 'Error Recovery'] },
    ],
  },
  {
    title: 'Data & Analytics Layer',
    icon: '📊',
    color: '#F4EAFB',
    services: [
      { name: 'Data Pipeline', details: ['Event Collection', 'Stream Processing', 'Data Lake Integration'] },
      { name: 'ML Services', details: ['Recommendation Engine', 'Content Analysis', 'User Behavior Analysis'] },
      { name: 'Analytics Platform', details: ['Business Intelligence', 'Performance Analytics', 'Cost Analytics'] },
    ],
  },
  {
    title: 'Platform Services Layer',
    icon: '⚙️',
    color: '#FEF9E8',
    services: [
      { name: 'Security Services', details: ['Authentication', 'Authorization', 'Encryption'] },
      { name: 'Operations Services', details: ['Monitoring', 'Logging', 'Alerting'] },
      { name: 'Infrastructure Services', details: ['Auto-scaling', 'Load Balancing', 'Cost Optimization'] },
    ],
  },
];

const GlobalMediaStreamingPlatform = () => {
  const [expanded, setExpanded] = useState('approach'); // Default expanded to "Approach"
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
              Platform follows a layered approach to ensure seamless content processing, efficient distribution, and robust analytics.
            </Typography>

            {streamingArchitecture.map((layer, index) => (
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
                  subgraph CP[Content Production Zone]
                      CI[Content Ingestion] --> QC[Quality Check]
                      QC --> TF[Transcode Farm]
                      TF --> Asset[Asset Management]
                      Asset --> PS[Primary Storage]
                      PS --> Meta[Metadata Service]
                  end
                  subgraph DZ[Distribution Zones]
                      subgraph EU[European Zone]
                          EUCache[Edge Cache]
                          EUStore[Regional Storage]
                          EUStream[Streaming Servers]
                      end
                      
                      subgraph APAC[Asia-Pacific Zone]
                          APCache[Edge Cache]
                          APStore[Regional Storage]
                          APStream[Streaming Servers]
                      end
                      
                      subgraph AM[Americas Zone]
                          AMCache[Edge Cache]
                          AMStore[Regional Storage]
                          AMStream[Streaming Servers]
                      end
                  end
                  subgraph AZ[Analytics Zone]
                      Events[Event Collection] --> Stream[Stream Processing]
                      Stream --> DL[Data Lake]
                      DL --> ML[ML Training]
                      DL --> AW[Analytics Warehouse]
                      ML --> Rec[Recommendation Engine]
                      AW --> BI[Business Intelligence]
                  end
                  %% Content Distribution Flows
                  PS --> EUStore
                  PS --> APStore
                  PS --> AMStore
                  
                  EUStore --> EUCache
                  APStore --> APCache
                  AMStore --> AMCache
                  
                  EUCache --> EUStream
                  APCache --> APStream
                  AMCache --> AMStream
                  
                  %% Analytics Flows
                  EUStream --> Events
                  APStream --> Events
                  AMStream --> Events
                  
                  %% Recommendation Flows
                  Rec --> EUStream
                  Rec --> APStream
                  Rec --> AMStream
                  %% Metadata Flows
                  Meta --> EUStream
                  Meta --> APStream
                  Meta --> AMStream
                  classDef zone fill:#f0f0f0,stroke:#333,stroke-width:2px
                  classDef storage fill:#b5d3e7,stroke:#333
                  classDef compute fill:#d3b5e7,stroke:#333
                  classDef stream fill:#e7d3b5,stroke:#333
                  class CP,DZ,AZ zone
                  class PS,EUStore,APStore,AMStore,DL,AW storage
                  class TF,ML,Rec,Stream compute
                  class EUStream,APStream,AMStream stream
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

export default GlobalMediaStreamingPlatform;
