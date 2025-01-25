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
  const [subExpanded, setSubExpanded] = useState(null);
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

  const handleSubExpand = (panel) => (event, isExpanded) => {
    setSubExpanded(isExpanded ? panel : null);
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

            <NonFunctionalRequirements />

            {/* AWS Implementation */}
            <Accordion expanded={subExpanded === 'aws-core-processing'} onChange={handleSubExpand('aws-core-processing')} sx={{ mt: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" fontWeight="bold">AWS</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper sx={{ p: 3, width: '100%' }}>
                  <div className="mermaid">
                    {`
                    flowchart TD
                      subgraph CustomerInteraction[Customer Journey Layer]
                          style CustomerInteraction fill:#F5F5F5,stroke:#2C3E50
                          UT[Pinpoint & Analytics]
                          SR[CloudSearch & Kendra]
                          CA[API Gateway]
                          EP[EventBridge]
                          CE[Step Functions]
                      end

                      subgraph IntelligenceEngine[Intelligence Engine]
                          style IntelligenceEngine fill:#E3F2FD,stroke:#1565C0
                          RR[Personalize]
                          ML[SageMaker]
                          DP[Dynamic Pricing Engine]
                          AB[CloudWatch Evidently]
                      end

                      subgraph DataFoundation[Data Foundation]
                          style DataFoundation fill:#FFF3E0,stroke:#E65100
                          UP[(DynamoDB - Profiles)]
                          PC[(Aurora - Products)]
                          AS[(Redshift - Analytics)]
                          FS[(Feature Store)]
                      end

                      subgraph BusinessServices[Business Services]
                          style BusinessServices fill:#E8F5E9,stroke:#2E7D32
                          API[AppSync]
                          ES[Kinesis]
                          CI[Integration Services]
                          AN[QuickSight]
                      end

                      %% Customer Journey Flows
                      UT --> EP
                      SR --> EP
                      CA --> EP
                      EP --> CE
                      CE --> RR

                      %% Intelligence Flows
                      EP --> ML
                      EP --> AS
                      ML --> RR
                      ML --> DP
                      FS --> ML
                      RR --> AB

                      %% Data Flows
                      UP --> RR
                      PC --> RR
                      AS --> ML
                      AS --> AN

                      %% Business Service Flows
                      RR --> API
                      DP --> API
                      AB --> AN
                      CI --> PC
                      EP --> ES

                      %% Real-time Experience Flows
                      API --> UT
                      ES --> CE
                      AN --> AB

                      classDef customer fill:#F5F5F5,stroke:#2C3E50,color:#2C3E50
                      classDef intelligence fill:#E3F2FD,stroke:#1565C0,color:#1565C0
                      classDef data fill:#FFF3E0,stroke:#E65100,color:#E65100
                      classDef business fill:#E8F5E9,stroke:#2E7D32,color:#2E7D32

                      class UT,SR,CA,EP,CE customer
                      class RR,ML,DP,AB intelligence
                      class UP,PC,AS,FS data
                      class API,ES,CI,AN business
                    `}
                  </div>
                </Paper>
              </AccordionDetails>
            </Accordion>
            
            {/* Azure Implementation */}
            <Accordion expanded={subExpanded === 'azure-core-processing'} onChange={handleSubExpand('azure-core-processing')} sx={{ mt: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" fontWeight="bold">Azure</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper sx={{ p: 3, width: '100%' }}>
                  <div className="mermaid">
                    {`
                    flowchart TD
                      subgraph CustomerInteraction[Customer Journey Layer]
                          style CustomerInteraction fill:#F5F5F5,stroke:#2C3E50
                          UT[Application Insights]
                          SR[Cognitive Search]
                          CA[API Management]
                          EP[Event Grid]
                          CE[Logic Apps]
                      end

                      subgraph IntelligenceEngine[Intelligence Engine]
                          style IntelligenceEngine fill:#E3F2FD,stroke:#1565C0
                          RR[Personalizer]
                          ML[Machine Learning]
                          DP[Azure Functions]
                          AB[A/B Testing Service]
                      end

                      subgraph DataFoundation[Data Foundation]
                          style DataFoundation fill:#FFF3E0,stroke:#E65100
                          UP[(Cosmos DB - Profiles)]
                          PC[(SQL Database - Products)]
                          AS[(Synapse Analytics)]
                          FS[(Feature Store)]
                      end

                      subgraph BusinessServices[Business Services]
                          style BusinessServices fill:#E8F5E9,stroke:#2E7D32
                          API[API Management]
                          ES[Event Hubs]
                          CI[Logic Apps]
                          AN[Power BI]
                      end

                      %% Customer Journey Flows
                      UT --> EP
                      SR --> EP
                      CA --> EP
                      EP --> CE
                      CE --> RR

                      %% Intelligence Flows
                      EP --> ML
                      EP --> AS
                      ML --> RR
                      ML --> DP
                      FS --> ML
                      RR --> AB

                      %% Data Flows
                      UP --> RR
                      PC --> RR
                      AS --> ML
                      AS --> AN

                      %% Business Service Flows
                      RR --> API
                      DP --> API
                      AB --> AN
                      CI --> PC
                      EP --> ES

                      %% Real-time Experience Flows
                      API --> UT
                      ES --> CE
                      AN --> AB

                      classDef customer fill:#F5F5F5,stroke:#2C3E50,color:#2C3E50
                      classDef intelligence fill:#E3F2FD,stroke:#1565C0,color:#1565C0
                      classDef data fill:#FFF3E0,stroke:#E65100,color:#E65100
                      classDef business fill:#E8F5E9,stroke:#2E7D32,color:#2E7D32

                      class UT,SR,CA,EP,CE customer
                      class RR,ML,DP,AB intelligence
                      class UP,PC,AS,FS data
                      class API,ES,CI,AN business
                    
                    `}
                  </div>
                  
                </Paper>
              </AccordionDetails>
            </Accordion>

            {/* GCP Implementation */}
            <Accordion expanded={subExpanded === 'gcp-core-processing'} onChange={handleSubExpand('gcp-core-processing')} sx={{ mt: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" fontWeight="bold">GCP</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper sx={{ p: 3, width: '100%' }}>
                  <div className="mermaid">
                    {`
                    flowchart TD
                      subgraph CustomerInteraction[Customer Journey Layer]
                          style CustomerInteraction fill:#F5F5F5,stroke:#2C3E50
                          UT[Analytics & Firebase]
                          SR[Cloud Search]
                          CA[API Gateway]
                          EP[Pub/Sub]
                          CE[Workflows]
                      end

                      subgraph IntelligenceEngine[Intelligence Engine]
                          style IntelligenceEngine fill:#E3F2FD,stroke:#1565C0
                          RR[Recommendations AI]
                          ML[Vertex AI]
                          DP[Cloud Functions]
                          AB[Firebase A/B Testing]
                      end

                      subgraph DataFoundation[Data Foundation]
                          style DataFoundation fill:#FFF3E0,stroke:#E65100
                          UP[(Firestore - Profiles)]
                          PC[(Cloud SQL - Products)]
                          AS[(BigQuery)]
                          FS[(Vertex Feature Store)]
                      end

                      subgraph BusinessServices[Business Services]
                          style BusinessServices fill:#E8F5E9,stroke:#2E7D32
                          API[Cloud Endpoints]
                          ES[Dataflow]
                          CI[Cloud Functions]
                          AN[Looker]
                      end

                      %% Customer Journey Flows
                      UT --> EP
                      SR --> EP
                      CA --> EP
                      EP --> CE
                      CE --> RR

                      %% Intelligence Flows
                      EP --> ML
                      EP --> AS
                      ML --> RR
                      ML --> DP
                      FS --> ML
                      RR --> AB

                      %% Data Flows
                      UP --> RR
                      PC --> RR
                      AS --> ML
                      AS --> AN

                      %% Business Service Flows
                      RR --> API
                      DP --> API
                      AB --> AN
                      CI --> PC
                      EP --> ES

                      %% Real-time Experience Flows
                      API --> UT
                      ES --> CE
                      AN --> AB

                      classDef customer fill:#F5F5F5,stroke:#2C3E50,color:#2C3E50
                      classDef intelligence fill:#E3F2FD,stroke:#1565C0,color:#1565C0
                      classDef data fill:#FFF3E0,stroke:#E65100,color:#E65100
                      classDef business fill:#E8F5E9,stroke:#2E7D32,color:#2E7D32

                      class UT,SR,CA,EP,CE customer
                      class RR,ML,DP,AB intelligence
                      class UP,PC,AS,FS data
                      class API,ES,CI,AN business
                    
                    `}
                  </div>
                  
                </Paper>
              </AccordionDetails>
            </Accordion>

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
            <ComputeGraphs pipelineName="E-commerce Personalization Platform" cloudProvider="AWS"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="E-commerce Personalization Platform" cloudProvider="Azure"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="E-commerce Personalization Platform" cloudProvider="GCP"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="E-commerce Personalization Platform" cloudProvider="Multi-Cloud"/>
          </Paper>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

const NonFunctionalRequirements = ({ }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" fontWeight="bold" align="center" gutterBottom>
        🔹 Non-Functional Requirements (NFRs)
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>

        {/* Performance Requirements */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9", textAlign: "center" }}>
            <Typography variant="subtitle1" fontWeight="bold" align="center" gutterBottom>
              🚀 Performance Requirements
            </Typography>
            <Box sx={{ textAlign: "left" }}>
              <ul style={{ fontSize: "1rem", margin: 0, paddingLeft: "1rem" }}>
                <li>Real-time recommendation generation under <strong>100ms response time</strong></li>
                <li>Event processing latency <strong>below 50ms per transactio</strong>n</li>
                <li>API gateway <strong>response time within 200ms limit</strong></li>
                <li>Cache hit ratio maintained <strong>above 95% consistently</strong></li>
                <li>Data synchronization completed <strong>within 2-second threshold</strong></li>
              </ul>
            </Box>
          </Box>
        </Grid>

        {/* Scalability Requirements */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9", textAlign: "center" }}>
            <Typography variant="subtitle1" fontWeight="bold" align="center" gutterBottom>
              📈 Scalability Requirements
            </Typography>
            <Box sx={{ textAlign: "left" }}>
              <ul style={{ fontSize: "1rem", margin: 0, paddingLeft: "1rem" }}>
                <li>Horizontal scaling supports <strong>100,000 concurrent user sessions</strong></li>
                <li>Event streaming handles <strong>10,000 events per second</strong></li>
                <li><strong>Database clusters auto-scale</strong> based on demand peaks</li>
                <li>ML model serving scales <strong>across multiple processing nodes</strong></li>
                <li><strong>Load balancing distributes</strong> traffic across regional endpoints</li>
              </ul>
            </Box>
          </Box>
        </Grid>

        {/* Reliability Requirements */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9", textAlign: "center" }}>
            <Typography variant="subtitle1" fontWeight="bold" align="center" gutterBottom>
              🛡️ Reliability Requirements
            </Typography>
            <Box sx={{ textAlign: "left" }}>
              <ul style={{ fontSize: "1rem", margin: 0, paddingLeft: "1rem" }}>
                <li>System maintains <strong>99.99% uptime</strong> for core services</li>
                <li>Automatic failover completes within <strong>30 seconds maximum</strong></li>
                <li>Data replication ensures <strong>zero information</strong> loss guarantee</li>
                <li>Circuit breakers <strong>prevent cascading service failures</strong></li>
                <li><strong>Regular backup cycles</strong> occur every 4 hours</li>
              </ul>
            </Box>
          </Box>
        </Grid>

        {/* Security Requirements */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9", textAlign: "center" }}>
            <Typography variant="subtitle1" fontWeight="bold" align="center" gutterBottom>
              🔒 Security Requirements
            </Typography>
            <Box sx={{ textAlign: "left" }}>
              <ul style={{ fontSize: "1rem", margin: 0, paddingLeft: "1rem" }}>
                <li><strong>End-to-end encryption </strong>for all data transmissions</li>
                <li><strong>Multi-factor authentication</strong> enforced for administrative access</li>
                <li>Regular security <strong>audits conducted every 90 days</strong></li>
                <li><strong>Real-time threat detection</strong> and automated response</li>
                <li><strong>GDPR and PCI DSS</strong> compliance maintained</li>
              </ul>
            </Box>
          </Box>
        </Grid>

        {/* Maintainability Requirements */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9", textAlign: "center" }}>
            <Typography variant="subtitle1" fontWeight="bold" align="center" gutterBottom>
              ⚙️ Maintainability Requirements
            </Typography>
            <Box sx={{ textAlign: "left" }}>
              <ul style={{ fontSize: "1rem", margin: 0, paddingLeft: "1rem" }}>
                <li><strong>Automated deployment pipelines</strong> with rollback capability</li>
                <li><strong>Comprehensive logging</strong> covers all system interactions</li>
                <li><strong>Modular architecture</strong> enables independent service updates</li>
                <li><strong>Standardized API documentation</strong> updated automatically</li>
                <li>Monitoring dashboards <strong>track all critical metrics</strong></li>
              </ul>
            </Box>
          </Box>
        </Grid>
        
      </Grid>
    </Box>
  );
}

export default EcommercePersonalizationPlatform;
