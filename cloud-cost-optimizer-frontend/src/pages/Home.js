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

      {/* Cost Modeling */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          📊 Cost Modeling Framework
        </Typography>

        {/* Resource Cost */}
        <Paper sx={{ p: 3, bgcolor: '#e8f5e9', borderRadius: 2, boxShadow: 1, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            🧮 Resource Cost Components
          </Typography>
          <Typography variant="body1">
            The <Typography component="span" fontWeight="bold">total resource cost</Typography> is calculated as:
          </Typography>
          <Typography variant="body1" fontWeight="bold" sx={{ my: 2 }}>
            <Latex>{`$C_r = C_{compute} + C_{storage} + C_{network} + C_{others}$`}</Latex>
          </Typography>
        </Paper>

        {/* QoS Components */}
        <Paper sx={{ p: 3, bgcolor: '#fff3e0', borderRadius: 2, boxShadow: 1, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            📊 Quality of Service (QoS) Components
          </Typography>
          <Typography variant="body1">
            The QoS model incorporates latency, availability, and data transfer efficiency:
          </Typography>
          <Typography variant="body1" fontWeight="bold" sx={{ my: 2 }}>
            <Latex>{`$f(CER_l|CER_a|CER_d) = \\frac{Cost}{(1-(l_{ij}a_{ij}d_{ij}) \\times N)} \\times w_{(l|a|d)}$`}</Latex>
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Where:
          </Typography>
          <ul>
            <li><Typography variant="body1"><b>l</b>: latency factor</Typography></li>
            <li><Typography variant="body1"><b>a</b>: availability metric</Typography></li>
            <li><Typography variant="body1"><b>d</b>: durability</Typography></li>
            <li><Typography variant="body1"><b>w</b>: respective weight factors</Typography></li>
            <li><Typography variant="body1"><b>N</b>: normalization factor</Typography></li>
          </ul>
          
          <Typography variant="body1" sx={{ mt: 2 }}>
            The total QoS function combines these components:
          </Typography>
          <Typography variant="body1" fontWeight="bold" sx={{ my: 2 }}>
            <Latex>{`$f(QoS)_{ij} = f(CER_l)_{ij} + f(CER_a)_{ij} + f(CER_d)_{ij}$`}</Latex>
          </Typography>
          <Typography variant="body1">
            This composite function helps evaluate and optimize the overall service quality across cloud resources.
          </Typography>
        </Paper>

        {/* Edge Cost */}
        <Paper sx={{ p: 3, bgcolor: '#ede7f6', borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h6" gutterBottom>
            📈 Total Edge Cost Function
          </Typography>
          <Typography variant="body1">
            Finally, the total edge cost is calculated by combining infrastructure costs with QoS factors:
          </Typography>
          <Typography variant="body1" fontWeight="bold" sx={{ my: 2 }}>
            <Latex>{`$e_{ij} = C_r + f(QoS)_{ij}$`}</Latex>
          </Typography>
        </Paper>
      </Box>

      {/* Optimization Techniques with Formulas */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          🏆 Optimization Techniques & Their Mathematical Models
        </Typography>
        
        {/* Algorithm Section */}
        <Paper sx={{ p: 3, bgcolor: '#fbe9e7', borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h6" gutterBottom>
            🛤️ Dijkstra's Algorithm for Cloud Cost Optimization
          </Typography>
          
          <Typography variant="body1" gutterBottom>
            The algorithm finds the optimal path between cloud resources by minimizing total cost:
          </Typography>

          {/* Initial Distance Formula */}
          <Box sx={{ my: 2, pl: 2 }}>
            <Typography variant="body1" fontWeight="bold">
              <Latex>{"$d(v) = \\begin{cases} 0 & \\text{if } v = s \\\\ \\infty & \\text{otherwise} \\end{cases}$"}</Latex>
            </Typography>
          </Box>

          <Typography variant="body1" gutterBottom>
            For each iteration, the distance to vertex v is updated:
          </Typography>

          {/* Distance Update Formula */}
          <Box sx={{ my: 2, pl: 2 }}>
            <Typography variant="body1" fontWeight="bold">
              <Latex>{"$d(v) = \\min(d(v), d(u) + e(u,v))$"}</Latex>
            </Typography>
          </Box>

          <Typography variant="body1" gutterBottom>
            The edge cost e(u,v) between resources u and v is defined as:
          </Typography>

          {/* Edge Cost Formula */}
          <Box sx={{ my: 2, pl: 2 }}>
            <Typography variant="body1" fontWeight="bold">
              <Latex>{"$e(u,v) = C_r + f(\\text{QoS})_{uv}$"}</Latex>
            </Typography>
          </Box>

          {/* Variable Definitions */}
          <Typography variant="body1" sx={{ mt: 3 }}>
            Where:
          </Typography>
          <Box sx={{ pl: 2 }}>
            <Typography variant="body1">
              • s: source vertex (starting resource)
            </Typography>
            <Typography variant="body1">
              • d(v): shortest path cost to vertex v
            </Typography>
            <Typography variant="body1">
              • e(u,v): edge cost between vertices u and v
            </Typography>
            <Typography variant="body1">
              • C<sub>r</sub>: total resource cost
            </Typography>
            <Typography variant="body1">
              • f(QoS)<sub>uv</sub>: Quality of Service cost between u and v
            </Typography>
          </Box>
        </Paper>

        {/* Multi-Cloud Optimization */}
        <Paper sx={{ p: 3, bgcolor: '#dcedc8', borderRadius: 2, boxShadow: 1, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            ☁️ Multi-Cloud Resource Optimization
          </Typography>
          <Typography variant="body1" gutterBottom>
            The multi-cloud optimization problem is formulated as a linear programming model to determine the optimal resource allocation across different cloud providers:
          </Typography>
          {/* Objective Function */}
          <Box sx={{ my: 2, pl: 2,}}>
            <Typography variant="body1" gutterBottom>
              Minimize total cost:
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              <Latex>{"$\\min Z = \\sum_{i=1}^{n} \\sum_{j=1}^{m} C_{ij}x_{ij}$"}</Latex>
            </Typography>
          </Box>
          {/* Constraints */}
          <Box sx={{ my: 3, pl: 2 }}>
            <Typography variant="body1" gutterBottom>
              Subject to constraints:
            </Typography>
            
            <Typography variant="body1" fontWeight="bold">
              <Latex>{"$\\sum_{j=1}^{m} x_{ij} \\geq D_i \\quad \\forall i$"}</Latex>
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              (Resource demand satisfaction)
            </Typography>

            <Typography variant="body1" fontWeight="bold">
              <Latex>{"$\\sum_{i=1}^{n} x_{ij} \\leq K_j \\quad \\forall j$"}</Latex>
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              (Provider capacity limits)
            </Typography>

            <Typography variant="body1" fontWeight="bold">
              <Latex>{"$x_{ij} \\geq 0 \\quad \\forall i,j$"}</Latex>
            </Typography>
            <Typography variant="body1">
              (Non-negativity constraint)
            </Typography>
          </Box>

          {/* Variable Definitions */}
          <Typography variant="body1" sx={{ mt: 3 }}>
            Where:
          </Typography>
          <Box sx={{ pl: 2 }}>
            <Typography variant="body1">
              • C<sub>ij</sub>: Cost of resource i from provider j
            </Typography>
            <Typography variant="body1">
              • x<sub>ij</sub>: Amount of resource i allocated to provider j
            </Typography>
            <Typography variant="body1">
              • D<sub>i</sub>: Demand for resource i
            </Typography>
            <Typography variant="body1">
              • K<sub>j</sub>: Capacity limit of provider j
            </Typography>
            <Typography variant="body1">
              • n: Number of resource types
            </Typography>
            <Typography variant="body1">
              • m: Number of cloud providers
            </Typography>
          </Box>
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