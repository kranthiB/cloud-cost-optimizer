import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import Graph from 'react-graph-vis';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const EnhancedGraphVisualization = ({ graphData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [selectedElement, setSelectedElement] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const processedData = useMemo(() => {
    if (!graphData?.length) return { nodes: [], edges: [] };

    const nodes = new Map();
    const edges = [];
    const regions = new Set();

    // Process nodes and edges
    graphData.forEach((path, index) => {
      const { startNode, endNode, relationshipProperties } = path;
      regions.add(startNode.region || 'Unknown');
      regions.add(endNode.region || 'Unknown');

      // Create unique node IDs
      const startId = `node-${startNode.name}-${startNode.state || ''}-${startNode.region || ''}`;
      const endId = `node-${endNode.name}-${endNode.state || ''}-${endNode.region || ''}`;

      // Add start node if not exists
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

      // Add end node if not exists
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

      // Create unique edge ID and add edge
      const edgeId = `edge-${startId}-${endId}-${index}`;
      edges.push({
        id: edgeId,
        from: startId,
        to: endId,
        label: `$${relationshipProperties.cost?.toFixed(2) || '0.00'}`,
        title: JSON.stringify(relationshipProperties),
        arrows: 'to',
        color: { color: theme.palette.primary.main },
        font: { size: isMobile ? 10 : 12 }
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
      width: 2
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
      <DialogContent dividers>
        {selectedElement && (
          <Box sx={{ py: 2 }}>
            {Object.entries(JSON.parse(selectedElement.title)).map(([key, value]) => (
              <Box key={key} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Typography>
                <Typography variant="body1">
                  {typeof value === 'object' ? JSON.stringify(value) : value}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>
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
  };

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
              // Ensure proper initialization
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