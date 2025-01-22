import React from 'react';
import { Box, Typography, Paper, Divider, Grid } from '@mui/material';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

const Home = () => {
  return (
    <Box sx={{ p: 4, maxWidth: '1000px', margin: 'auto' }}>
      {/* Title */}
      <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
        📈 Cloud Cost Optimization Approach
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* Introduction */}
      <Paper sx={{ p: 3, bgcolor: '#f5f5f5', borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          🔍 Introduction
        </Typography>
        <Typography variant="body1" paragraph>
          Cloud computing has revolutionized how applications are deployed, but{' '}
          <Typography component="span" fontWeight="bold">cost optimization</Typography> remains a significant challenge.  
          This approach introduces a <Typography component="span" fontWeight="bold">graph-based mathematical model </Typography>  
          to make smarter cost-saving decisions for cloud infrastructure.
        </Typography>
      </Paper>

      {/* Core Challenges */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          🚀 Core Challenges in Cloud Cost Optimization
        </Typography>
        <ul>
          <li><Typography variant="body1">⚡ <b>Balancing</b> resource utilization and costs</Typography></li>
          <li><Typography variant="body1">🌍 <b>Managing</b> data transfer across regions</Typography></li>
          <li><Typography variant="body1">🏗 <b>Optimizing</b> storage and compute placement</Typography></li>
          <li><Typography variant="body1">🔄 <b>Handling</b> dynamic workload scaling</Typography></li>
          <li><Typography variant="body1">☁️ <b>Managing</b> multi-cloud environments efficiently</Typography></li>
        </ul>
      </Box>

      {/* Graph-Based Cloud Modeling */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          📊 Graph-Based Cloud Resource Modeling
        </Typography>
        <Paper sx={{ p: 3, bgcolor: '#e3f2fd', borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="body1">
            The cloud infrastructure is represented as:
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            <Latex>{`$G = (V, E)$`}</Latex>
          </Typography>
          <Typography variant="body1">
            Where:
          </Typography>
          <ul>
            <li><Typography variant="body1"><b>Vertices (V):</b> Cloud resources (VMs, storage, networks)</Typography></li>
            <li><Typography variant="body1"><b>Edges (E):</b> Dependencies between resources</Typography></li>
            <li><Typography variant="body1"><b>Weights:</b> Cost associated with each resource link</Typography></li>
          </ul>
        </Paper>
      </Box>

      {/* Cloud Resource Cost Modeling */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          💰 Cloud Resource Cost Modeling
        </Typography>
        <Paper sx={{ p: 3, bgcolor: '#e8f5e9', borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="body1">
            The <Typography component="span" fontWeight="bold">total resource cost</Typography> is calculated as:
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            <Latex>{`$C_r = C_{compute} + C_{storage} + C_{network}$`}</Latex>
          </Typography>
        </Paper>
      </Box>

      {/* Optimization Techniques with Formulas */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          🏆 Optimization Techniques & Their Mathematical Models
        </Typography>
        
        {/* Shortest Path Algorithm */}
        <Paper sx={{ p: 3, bgcolor: '#fbe9e7', borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h6">🛤️ Shortest Path Algorithm</Typography>
          <Typography variant="body1">
            Determines the <b>most cost-effective path</b> between cloud resources.
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            <Latex>{`$d(v) = \\min_{u \\in V} (d(u) + w(u, v))$`}</Latex>
          </Typography>
        </Paper>

        {/* Workload Partitioning */}
        <Paper sx={{ p: 3, bgcolor: '#ede7f6', borderRadius: 2, boxShadow: 1, mt: 2 }}>
          <Typography variant="h6">🔄 Workload Partitioning</Typography>
          <Typography variant="body1">
            Optimizes workload distribution across cloud regions.
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            <Latex>{`$W = \\sum_{i=1}^{n} W_i, \\quad \\min \\sum_{i=1}^{n} C(W_i)$`}</Latex>
          </Typography>
        </Paper>

        {/* Auto-Scaling with MDP */}
        <Paper sx={{ p: 3, bgcolor: '#e3f2fd', borderRadius: 2, boxShadow: 1, mt: 2 }}>
          <Typography variant="h6">📈 Auto-Scaling with Markov Decision Process (MDP)</Typography>
          <Typography variant="body1">
            Dynamically adjusts cloud resources based on demand.
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            <Latex>{`$P(s' | s, a) = \\sum_{r} P(s' | s, a, r) P(r | s, a)$`}</Latex>
          </Typography>
        </Paper>

        {/* Multi-Cloud Optimization */}
        <Paper sx={{ p: 3, bgcolor: '#dcedc8', borderRadius: 2, boxShadow: 1, mt: 2 }}>
          <Typography variant="h6">☁️ Multi-Cloud Optimization</Typography>
          <Typography variant="body1">
            Uses <b>Linear Programming</b> to determine the <b>optimal cloud provider</b>.
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            <Latex>{`$\\min \\sum_{i} C_i x_i$`}</Latex>
          </Typography>
        </Paper>
      </Box>

      {/* Conclusion */}
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          🎯 Conclusion
        </Typography>
        <Paper sx={{ p: 3, bgcolor: '#fffde7', borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="body1" paragraph>
            <Typography component="span" fontWeight="bold">Cloud cost optimization</Typography>  
            is a critical challenge in modern cloud infrastructures.  
            The <Typography component="span" fontWeight="bold">Graph-Based Cloud Cost Optimization</Typography>  
            approach provides a <Typography component="span" fontWeight="bold">powerful, data-driven framework</Typography>  
            to manage cloud resources effectively while reducing unnecessary costs.
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            Key Takeaways:
          </Typography>
          <ul>
            <li><Typography variant="body1">📊 <b>Graph Modeling</b> simplifies cloud resource relationships.</Typography></li>
            <li><Typography variant="body1">🛤️ <b>Shortest Path Algorithms</b> minimize resource allocation costs.</Typography></li>
            <li><Typography variant="body1">📈 <b>Workload Partitioning</b> balances cloud utilization effectively.</Typography></li>
            <li><Typography variant="body1">☁️ <b>Multi-Cloud Optimization</b> ensures cost-effective provider selection.</Typography></li>
          </ul>
          <Typography variant="body1" fontWeight="bold" textAlign="center">
            🚀 <b>Implementing these optimization techniques will drive better cost savings and cloud efficiency.</b>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Home;