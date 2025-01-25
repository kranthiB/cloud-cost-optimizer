import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Box, Typography, Dialog, DialogTitle, Grid, DialogActions, Button, 
  useTheme, useMediaQuery, IconButton, Card, CardContent, Chip 
} from '@mui/material';
import Graph from 'react-graph-vis';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ZoomInIcon from '@mui/icons-material/ZoomOut';
import ZoomOutIcon from '@mui/icons-material/ZoomIn';

const EnhancedGraphVisualization = ({ graphData, cloudProvider }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [selectedElement, setSelectedElement] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [network, setNetwork] = useState(null);

  // Keep references for animation
  const particlesRef = useRef([]); 
  const animationFrameRef = useRef(null);

  const handleZoom = (zoomIn) => {
    if (network) {
      const currentScale = network.getScale();
      const scaleFactor = zoomIn ? 1.2 : 0.8;
      network.moveTo({
        scale: currentScale * scaleFactor,
        animation: {
          duration: 300,
          easingFunction: 'easeInOutQuad'
        }
      });
    }
  };

  const ZoomControls = () => (
    <Box
      sx={{
        position: 'absolute',
        right: { xs: '16px', sm: '24px' },
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        zIndex: 1,
      }}
    >
      <IconButton
        onClick={() => handleZoom(true)}
        sx={{
          backgroundColor: 'background.paper',
          boxShadow: 2,
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
        aria-label="Zoom in"
      >
        <ZoomOutIcon />
      </IconButton>
      <IconButton
        onClick={() => handleZoom(false)}
        sx={{
          backgroundColor: 'background.paper',
          boxShadow: 2,
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
        aria-label="Zoom out"
      >
        <ZoomInIcon />
      </IconButton>
    </Box>
  );

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
      // This line ensures the edges are drawn continuously (for style).
      // Actual "moving flow" is implemented below in afterDrawing.
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

  /**
   * Initialize "flow particles" for each edge.
   */
  const initParticles = (net, edges) => {
    const particles = [];
    edges.forEach((edge) => {
      // Create multiple particles per edge, or just 1.  
      // Adjust for more/less flow.
      for (let i = 0; i < 3; i++) {
        particles.push({
          edgeId: edge.id,
          progress: Math.random(),     // 0..1 for current position along edge
          speed: 0.002 + Math.random() * 0.002, // speed of particle
        });
      }
    });
    particlesRef.current = particles;
  };

  /**
   * Animate particles by incrementing position and redrawing network.
   */
  const animateParticles = () => {
    if (!network) return;

    // Update each particle's position
    particlesRef.current.forEach((p) => {
      p.progress += p.speed;
      if (p.progress > 1) {
        p.progress = 0;  // loop around
      }
    });

    // Force a redraw so afterDrawing callback is triggered
    network.redraw();

    // Schedule next frame
    animationFrameRef.current = requestAnimationFrame(animateParticles);
  };

  /**
   * This is where we actually draw the particles after the network is drawn.
   */
  const handleAfterDrawing = (ctx) => {
    const net = network;
    if (!net) return;

    // For each particle, we get the edge, then compute the pixel coords
    particlesRef.current.forEach((p) => {
      const edgeObj = net.body.edges[p.edgeId];
      if (!edgeObj) return;

      const { from, to } = edgeObj;
      // fromPoint / toPoint are the node positions in canvas space
      const fromPoint = net.getPosition(from.id);
      const toPoint = net.getPosition(to.id);
      if (!fromPoint || !toPoint) return;

      // Convert them to canvas coordinates
      const fromCanvas = net.canvasToDOM({
        x: fromPoint.x,
        y: fromPoint.y
      });
      const toCanvas = net.canvasToDOM({
        x: toPoint.x,
        y: toPoint.y
      });

      // Current progress along the line
      const x = fromCanvas.x + (toCanvas.x - fromCanvas.x) * p.progress;
      const y = fromCanvas.y + (toCanvas.y - fromCanvas.y) * p.progress;

      // Draw the particle as a small circle
      ctx.beginPath();
      ctx.fillStyle = theme.palette.success.main; // color of flow
      ctx.arc(x, y, 5, 0, 2 * Math.PI); // size = 5
      ctx.fill();
    });
  };

  /**
   * Set up the network instance: 
   *   - Attach afterDrawing
   *   - Initialize & start the particle animation
   */
  const handleGetNetwork = (net) => {
    setNetwork(net);
    net.stabilize();

    // If we re-init, remove old listeners & stop animation
    net.off("afterDrawing");
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Attach the drawing callback
    net.on("afterDrawing", (ctx) => {
      handleAfterDrawing(ctx);
    });

    // Initialize particles, then start animating
    initParticles(net, processedData.edges);
    animationFrameRef.current = requestAnimationFrame(animateParticles);
  };

  // Clean up listeners & animations on unmount
  useEffect(() => {
    return () => {
      if (network) {
        network.off("afterDrawing");
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [network]);

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
              Network Regions ({cloudProvider})
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
        Network Relationship Overview - {cloudProvider}
      </Typography>
      
      <Card elevation={3}>
        <CardContent sx={{ position: 'relative' }}>
          <Graph
            graph={processedData}
            options={options}
            events={events}
            getNetwork={handleGetNetwork}
          />
          <ZoomControls />
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

