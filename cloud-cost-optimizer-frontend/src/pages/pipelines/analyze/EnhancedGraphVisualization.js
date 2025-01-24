import React, { useState, useMemo, useEffect } from 'react';
import { Box, Typography, Dialog, DialogTitle, Grid, DialogActions, Button, 
         useTheme, useMediaQuery, IconButton, Card, CardContent, Chip } from '@mui/material';
import Graph from 'react-graph-vis';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const EnhancedGraphVisualization = ({ graphData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [selectedElement, setSelectedElement] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [network, setNetwork] = useState(null);

  const DetailCard = ({ label, value }) => {
    const theme = useTheme();
  
    const formatValue = (val) => {
      if (val === null || val === undefined) return '—';
  
      if (typeof val === 'boolean') {
        return (
          <Chip 
            label={val ? 'Yes' : 'No'} 
            color={val ? 'success' : 'default'} 
            size="small"
            sx={{ fontWeight: 500 }}
          />
        );
      }
  
      if (typeof val === 'number') {
        return val.toLocaleString();
      }
  
      if (typeof val === 'object') {
        if (Array.isArray(val)) {
          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {val.map((item, index) => (
                <Chip 
                  key={index}
                  label={item.toString()}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          );
        }
  
        return (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {Object.entries(val).map(([k, v], index) => (
              <Chip 
                key={k}
                label={`${k}: ${v}`}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
        );
      }
  
      return val.toString();
    };
  
    const formatLabel = (text) => {
      return text
        .split(/(?=[A-Z])|_|-/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    };
  
    return (
      <Card 
        variant="outlined" 
        sx={{ 
          mb: 2,
          backgroundColor: 'background.paper',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
            transform: 'translateY(-2px)'
          }
        }}
      >
        <CardContent sx={{ 
          p: 2, 
          '&:last-child': { pb: 2 },
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12} sm={4}>
              <Typography 
                variant="subtitle2" 
                color="text.secondary"
                sx={{ 
                  fontWeight: 500,
                  letterSpacing: '0.01em'
                }}
              >
                {formatLabel(label)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                wordBreak: 'break-word'
              }}>
                {formatValue(value)}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };
  
  const EnhancedDialogContent = ({ selectedElement }) => {
    if (!selectedElement) return null;
    
    const details = JSON.parse(selectedElement.title);
  
    return (
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'text.primary',
              fontWeight: 600,
              mb: 1
            }}
          >
            {selectedElement.label ? `Node: ${details.name || selectedElement.label}` : 'Connection Details'}
          </Typography>
          {details.type && (
            <Chip 
              label={details.type}
              size="small"
              color="primary"
              sx={{ fontWeight: 500 }}
            />
          )}
        </Box>
  
        <Box sx={{ mt: 3 }}>
          {Object.entries(details)
            .filter(([key]) => key !== 'name' && key !== 'type')
            .map(([key, value]) => (
              <DetailCard 
                key={key}
                label={key}
                value={value}
              />
            ))}
        </Box>
      </Box>
    );
  };

  const processedData = useMemo(() => {
    if (!graphData?.length) return { nodes: [], edges: [] };

    const nodes = new Map();
    const edges = [];
    const regions = new Set();

    graphData.forEach((path, index) => {
      const { startNode, endNode, relationshipProperties } = path;
      regions.add(startNode.region || 'Unknown');
      regions.add(endNode.region || 'Unknown');

      const startId = `node-${startNode.name}-${startNode.state || ''}-${startNode.region || ''}`;
      const endId = `node-${endNode.name}-${endNode.state || ''}-${endNode.region || ''}`;

      if (!nodes.has(startId)) {
        nodes.set(startId, {
          id: startId,
          label: startNode.name,
          title: JSON.stringify(startNode),
          group: startNode.region || 'Unknown',
          size: 30,
          font: { size: isMobile ? 14 : 16 }
        });
      }

      if (!nodes.has(endId)) {
        nodes.set(endId, {
          id: endId,
          label: endNode.name,
          title: JSON.stringify(endNode),
          group: endNode.region || 'Unknown',
          size: 30,
          font: { size: isMobile ? 14 : 16 }
        });
      }

      const edgeId = `edge-${startId}-${endId}-${index}`;
      edges.push({
        id: edgeId,
        from: startId,
        to: endId,
        label: `$${relationshipProperties.cost?.toFixed(2) || '0.00'}`,
        title: JSON.stringify(relationshipProperties),
        arrows: {
          to: {
            enabled: true,
            type: 'arrow',
            scaleFactor: 0.5
          }
        },
        color: {
          color: theme.palette.primary.main,
          highlight: theme.palette.primary.dark,
          hover: theme.palette.primary.light,
          inherit: false
        },
        font: { size: isMobile ? 10 : 12 },
        length: 250,
        hidden: false
      });
    });

    return {
      nodes: Array.from(nodes.values()),
      edges,
      regions: Array.from(regions)
    };
  }, [graphData, isMobile, theme]);

  const options = {
    nodes: {
      shape: 'dot',
      shadow: true,
      borderWidth: 2,
      color: {
        background: theme.palette.background.paper,
        border: theme.palette.primary.main,
        highlight: {
          background: theme.palette.primary.light,
          border: theme.palette.primary.dark
        }
      }
    },
    edges: {
      smooth: {
        type: 'cubicBezier',
        forceDirection: 'horizontal',
        roundness: 0.5
      },
      width: 2,
      shadow: true,
      smooth: {
        enabled: true,
        type: 'continuous'
      }
    },
    physics: {
      stabilization: {
        enabled: true,
        iterations: 100
      },
      barnesHut: {
        gravitationalConstant: -5000,
        springLength: 200,
        springConstant: 0.04
      }
    },
    interaction: {
      hover: true,
      tooltipDelay: 200,
      zoomView: true,
      dragView: true
    },
    height: isMobile ? '400px' : isTablet ? '500px' : '600px'
  };

  useEffect(() => {
    if (network && processedData.edges.length > 0) {
      const animateRequestFlow = () => {
        processedData.edges.forEach((edge, index) => {
          setTimeout(() => {
            // Create animation for request flow
            const edgeElement = network.body.edges[edge.id];
            if (edgeElement) {
              const startPos = network.getPosition(edge.from);
              const endPos = network.getPosition(edge.to);
              
              // Animate the edge color
              edgeElement.options.color = {
                color: theme.palette.success.main,
                highlight: theme.palette.success.dark,
                hover: theme.palette.success.light,
                inherit: false
              };
              
              // Create moving particle effect
              const duration = 1000;
              const start = performance.now();
              
              const animate = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                if (progress < 1) {
                  requestAnimationFrame(animate);
                } else {
                  // Reset edge color after animation
                  edgeElement.options.color = {
                    color: theme.palette.primary.main,
                    highlight: theme.palette.primary.dark,
                    hover: theme.palette.primary.light,
                    inherit: false
                  };
                }
                network.redraw();
              };
              
              requestAnimationFrame(animate);
            }
          }, index * 1500); // Stagger animations
        });
      };

      // Start animation loop
      const animationInterval = setInterval(animateRequestFlow, processedData.edges.length * 1500 + 2000);
      return () => clearInterval(animationInterval);
    }
  }, [network, processedData.edges, theme]);

  const events = {
    select: ({ nodes, edges }) => {
      const selectedNode = nodes[0] && processedData.nodes.find(n => n.id === nodes[0]);
      const selectedEdge = edges[0] && processedData.edges.find(e => e.id === edges[0]);
      
      if (selectedNode || selectedEdge) {
        setSelectedElement(selectedNode || selectedEdge);
        setIsDetailsOpen(true);
      }
    }
  };

  const renderDetailsDialog = () => (
    <Dialog
      open={isDetailsOpen}
      onClose={() => setIsDetailsOpen(false)}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {selectedElement?.label ? 'Node Details' : 'Relationship Details'}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setIsDetailsOpen(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <EnhancedDialogContent selectedElement={selectedElement} />
      <DialogActions>
        <Button onClick={() => setIsDetailsOpen(false)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderLegend = () => {
    if (processedData.regions && processedData.regions.length !== 0) {
      const validRegions = processedData.regions.filter(region => region !== 'Unknown');
    
      if (validRegions.length === 0) return null;
      
      return (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Network Regions
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {validRegions.map((region) => (
                <Chip
                  key={region}
                  label={region}
                  color="primary"
                  variant="outlined"
                  size={isMobile ? "small" : "medium"}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      );
    }
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Network Relationship Overview
      </Typography>
      
      <Card elevation={3}>
        <CardContent>
          <Graph
            graph={processedData}
            options={options}
            events={events}
            getNetwork={network => {
              setNetwork(network);
              network.stabilize();
            }}
          />
        </CardContent>
      </Card>

      {renderLegend()}
      {renderDetailsDialog()}

      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="textSecondary" align="center">
          <InfoOutlinedIcon sx={{ fontSize: 'small', mr: 0.5, verticalAlign: 'middle' }} />
          Click on nodes or edges for detailed information
        </Typography>
      </Box>
    </Box>
  );
};

export default EnhancedGraphVisualization;