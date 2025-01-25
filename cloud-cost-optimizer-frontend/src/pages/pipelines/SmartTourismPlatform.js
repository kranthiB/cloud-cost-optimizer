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
                      subgraph AWS[AWS Implementation]
                          direction TB
                          
                          subgraph AWSU[User Interface Layer]
                              CF[CloudFront Distribution]
                              S3[S3 Static Hosting]
                              R53[Route 53 DNS]
                          end

                          subgraph AWSC[Core Services Layer]
                              ALB[Application Load Balancer]
                              ECS[ECS Fargate Clusters]
                              Lambda[Lambda Functions]
                              ApiGW[API Gateway]
                          end

                          subgraph AWSD[Data Layer]
                              Aurora[(Aurora Database)]
                              DDB[(DynamoDB)]
                              ES[(ElasticSearch)]
                              Redis[(ElastiCache)]
                          end

                          subgraph AWSI[Integration Layer]
                              SNS[SNS Topics]
                              SQS[SQS Queues]
                              EventB[EventBridge]
                          end

                          %% Connections
                          R53 --> CF
                          CF --> S3
                          CF --> ALB
                          ALB --> ECS
                          ApiGW --> Lambda
                          Lambda --> DDB
                          ECS --> Aurora
                          ECS --> Redis
                          Lambda --> ES
                          Lambda --> SNS
                          SNS --> SQS
                          EventB --> Lambda

                          %% External Services
                          Lambda --> ExtServ[External Services]
                          ECS --> ExtServ
                      end

                      %% Styles
                      classDef userInterface fill:#87CEEB,stroke:#333,stroke-width:2px
                      classDef coreServices fill:#98FB98,stroke:#333,stroke-width:2px
                      classDef dataLayer fill:#DDA0DD,stroke:#333,stroke-width:2px
                      classDef integration fill:#F0E68C,stroke:#333,stroke-width:2px
                      classDef external fill:#D3D3D3,stroke:#333,stroke-width:2px

                      %% Apply styles
                      class CF,S3,R53 userInterface
                      class ALB,ECS,Lambda,ApiGW coreServices
                      class Aurora,DDB,ES,Redis dataLayer
                      class SNS,SQS,EventB integration
                      class ExtServ external
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
                      subgraph Azure[Azure Implementation]
                          direction TB
                          
                          subgraph AZU[User Interface Layer]
                              CDN[Azure CDN]
                              Blob[Blob Storage]
                              DNS[Azure DNS]
                              AFD[Front Door]
                          end

                          subgraph AZC[Core Services Layer]
                              APIM[API Management]
                              AKS[AKS Cluster]
                              Functions[Azure Functions]
                              AppService[App Service]
                          end

                          subgraph AZD[Data Layer]
                              SQL[(Azure SQL)]
                              Cosmos[(Cosmos DB)]
                              Search[(Azure Search)]
                              Cache[(Redis Cache)]
                          end

                          subgraph AZI[Integration Layer]
                              ServiceBus[Service Bus]
                              EventGrid[Event Grid]
                              LogicApps[Logic Apps]
                          end

                          %% Connections
                          DNS --> CDN
                          DNS --> AFD
                          CDN --> Blob
                          AFD --> APIM
                          APIM --> AKS
                          APIM --> Functions
                          APIM --> AppService
                          Functions --> Cosmos
                          AKS --> SQL
                          AKS --> Cache
                          Functions --> Search
                          Functions --> ServiceBus
                          EventGrid --> Functions
                          LogicApps --> ExtServ[External Services]
                          AppService --> SQL

                      end

                      %% Styles
                      classDef userInterface fill:#87CEEB,stroke:#333,stroke-width:2px
                      classDef coreServices fill:#98FB98,stroke:#333,stroke-width:2px
                      classDef dataLayer fill:#DDA0DD,stroke:#333,stroke-width:2px
                      classDef integration fill:#F0E68C,stroke:#333,stroke-width:2px
                      classDef external fill:#D3D3D3,stroke:#333,stroke-width:2px

                      %% Apply styles
                      class CDN,Blob,DNS,AFD userInterface
                      class APIM,AKS,Functions,AppService coreServices
                      class SQL,Cosmos,Search,Cache dataLayer
                      class ServiceBus,EventGrid,LogicApps integration
                      class ExtServ external
                    
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
                      subgraph GCP[GCP Implementation]
                          direction TB
                          
                          subgraph GCPU[User Interface Layer]
                              GCDN[Cloud CDN]
                              GCS[Cloud Storage]
                              CloudDNS[Cloud DNS]
                              GCLB[Global Load Balancer]
                          end

                          subgraph GCPC[Core Services Layer]
                              GKE[GKE Cluster]
                              CloudFunctions[Cloud Functions]
                              CloudRun[Cloud Run]
                              AppEngine[App Engine]
                          end

                          subgraph GCPD[Data Layer]
                              CloudSQL[(Cloud SQL)]
                              Firestore[(Firestore)]
                              Memorystore[(Memorystore)]
                              BigTable[(Cloud Bigtable)]
                          end

                          subgraph GCPI[Integration Layer]
                              PubSub[Pub/Sub]
                              Tasks[Cloud Tasks]
                              Workflows[Workflows]
                              EventArc[EventArc]
                          end

                          %% Connections
                          CloudDNS --> GCDN
                          CloudDNS --> GCLB
                          GCDN --> GCS
                          GCLB --> GKE
                          GCLB --> CloudRun
                          GCLB --> AppEngine
                          CloudFunctions --> Firestore
                          GKE --> CloudSQL
                          GKE --> Memorystore
                          CloudRun --> BigTable
                          CloudFunctions --> PubSub
                          Tasks --> CloudFunctions
                          Workflows --> ExtServ[External Services]
                          EventArc --> CloudRun
                          PubSub --> CloudRun

                      end

                      %% Styles
                      classDef userInterface fill:#87CEEB,stroke:#333,stroke-width:2px
                      classDef coreServices fill:#98FB98,stroke:#333,stroke-width:2px
                      classDef dataLayer fill:#DDA0DD,stroke:#333,stroke-width:2px
                      classDef integration fill:#F0E68C,stroke:#333,stroke-width:2px
                      classDef external fill:#D3D3D3,stroke:#333,stroke-width:2px

                      %% Apply styles
                      class GCDN,GCS,CloudDNS,GCLB userInterface
                      class GKE,CloudFunctions,CloudRun,AppEngine coreServices
                      class CloudSQL,Firestore,Memorystore,BigTable dataLayer
                      class PubSub,Tasks,Workflows,EventArc integration
                      class ExtServ external
                    
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
            <ComputeGraphs pipelineName="Smart Tourism Platform" cloudProvider="AWS"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="Smart Tourism Platform" cloudProvider="Azure"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="Smart Tourism Platform" cloudProvider="GCP"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="Smart Tourism Platform" cloudProvider="Multi-Cloud"/>
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
                <li><strong>Response time under 200ms</strong> for API calls</li>
                <li>Content delivery <strong>latency below 50ms</strong> globally</li>
                <li>Database <strong>query execution within 100ms limit</strong></li>
                <li>Cache hit ratio <strong>maintained above 90%</strong></li>
                <li>Real-time event <strong>processing under 2 seconds</strong></li>
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
                <li><strong>Auto-scaling</strong> triggered at 70% resource utilization</li>
                <li>Support <strong>100,000 concurrent user connections</strong> seamlessly</li>
                <li>Database throughput scales to <strong>10,000 TPS</strong></li>
                <li>CDN capacity handles <strong>50TB monthly traffic</strong></li>
                <li>Message queue <strong>processes 5,000 events/second</strong></li>
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
                <li>System availability maintained at <strong>99.99% uptime</strong></li>
                <li>Data backup <strong>recovery within 15 minutes</strong></li>
                <li><strong>Zero data loss</strong> during failover events</li>
                <li><strong>Cross-region disaster recovery</strong> within 30 minutes</li>
                <li>Circuit breakers <strong>prevent cascading service failures</strong></li>
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
                <li><strong>End-to-end encryption</strong> for data in transit</li>
                <li><strong>Multi-factor authentication</strong> for all admin access</li>
                <li><strong>security vulnerabilities</strong>S patched within 24 hours</li>
                <li><strong>Regular penetration testing</strong> every three months</li>
                <li><strong>Real-time threat detection</strong> and automated response</li>
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
                <li><strong>Automated deployment completes</strong> within 30 minutes</li>
                <li><strong>Infrastructure as Code</strong> coverage above 95%</li>
                <li>Monitoring <strong>alerts resolved within 15 minutes</strong></li>
                <li>Documentation <strong>updated within 24 hours changes</strong></li>
                <li>Microservices independently <strong>deployable without downtime</strong></li>
              </ul>
            </Box>
          </Box>
        </Grid>
        
      </Grid>
    </Box>
  );
}


export default SmartTourismPlatform;
