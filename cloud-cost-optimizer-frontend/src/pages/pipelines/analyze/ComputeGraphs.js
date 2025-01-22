import React, { useEffect, useState } from "react";
import axios from "axios";
import GraphVisualization from "./GraphVisualization";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ComputeGraphs = () => {
    const [graphData, setGraphData] = useState(null);
    const [shortestPathData, setShortestPathData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const [graphResponse, shortestPathResponse] = await Promise.all([
                    axios.get(API_BASE_URL + "/api/v1/graph/compute"),
                    axios.get(API_BASE_URL + "/api/v1/graph/shortest-path")
                ]);

                if (isMounted) {
                    const formattedGraphData = transformGraphData(graphResponse.data);
                    setGraphData(formattedGraphData);
                    setShortestPathData(shortestPathResponse.data);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching data", error);
                setError("Failed to load data.");
                setLoading(false);
            }
        };

        fetchData();
        return () => { isMounted = false; };
    }, []);

    const getNodeShape = (node) => {
        switch (node.labels[0]) {
            case 'Compute': return 'hexagon';
            case 'Storage': return 'database';
            case 'Network': return 'diamond';
            case 'CostComponent': return 'dot';
            default: return 'circle';
        }
    };

    const getNodeColor = (node) => {
        switch (node.labels[0]) {
            case 'Compute':
                return {
                    background: '#fca5a5',
                    border: '#ef4444',
                    highlight: { background: '#f87171', border: '#dc2626' }
                };
            case 'Storage':
                return {
                    background: '#93c5fd',
                    border: '#3b82f6',
                    highlight: { background: '#60a5fa', border: '#2563eb' }
                };
            case 'Network':
                return {
                    background: '#86efac',
                    border: '#22c55e',
                    highlight: { background: '#4ade80', border: '#16a34a' }
                };
            case 'CostComponent':
                return {
                    background: '#fcd34d',
                    border: '#f59e0b',
                    highlight: { background: '#fbbf24', border: '#d97706' }
                };
            case 'Region':
                return {
                    background: '#cbd5e1',
                    border: '#64748b',
                    highlight: { background: '#94a3b8', border: '#475569' }
                };
            case 'AZ':
                return {
                    background: '#e2e8f0',
                    border: '#94a3b8',
                    highlight: { background: '#cbd5e1', border: '#64748b' }
                };
            default:
                return {
                    background: '#f1f5f9',
                    border: '#94a3b8',
                    highlight: { background: '#e2e8f0', border: '#64748b' }
                };
        }
    };

    const formatTooltip = (node) => {
        const props = Object.entries(node.props)
            .map(([key, value]) => `${key.replace(/_/g, ' ')}: ${value}`)
            .join('\n');
        return `Type: ${node.labels.join(', ')}\n${props}`;
    };

    const transformGraphData = (data) => {
        const nodes = data.nodes.map(node => ({
            id: node.id,
            label: node.props.name || `Node ${node.id}`,
            title: formatTooltip(node),
            shape: getNodeShape(node),
            color: getNodeColor(node),
            size: node.labels[0] === 'Compute' ? 30 : 25,
            font: {
                size: 14,
                color: '#2c3e50',
                face: 'Inter, system-ui, sans-serif'
            }
        }));

        const edges = data.relationships.map(rel => ({
            from: rel.start,
            to: rel.end,
            label: `${rel.type}\n$${rel.props.cost}`,
            arrows: { to: { enabled: true, scaleFactor: 0.5 } },
            color: { color: '#64748b', highlight: '#475569' },
            font: {
                size: 12,
                color: '#475569',
                face: 'Inter, system-ui, sans-serif',
                multi: true,
                strokeWidth: 0
            },
            smooth: { type: 'curvedCW', roundness: 0.2 }
        }));

        return { nodes, edges };
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: value < 0.01 ? 6 : 2,
            maximumFractionDigits: value < 0.01 ? 6 : 2
        }).format(value);
    };

    const calculateOtherCosts = (path) => {
        return path.Security_Cost +
               path.Data_Transfer_Cost +
               path.Licensing_Cost +
               path.Monitoring_Cost +
               path.Backup_Cost +
               path.Support_Cost;
    };

    const CostComparisonTable = ({ data }) => {
        if (!data?.length) return null;

        return (
            <div className="mt-12">
                <h3 className="text-2xl font-semibold text-center mb-8">Infrastructure Cost Optimization Paths</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Infrastructure Component
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Configuration
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Location
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Component Cost
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Cost
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((path, index) => (
                                <tr 
                                    key={index}
                                    className={`
                                        ${index === 0 ? 'bg-blue-50' : ''}
                                        hover:bg-gray-50 transition-colors duration-150
                                    `}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="text-sm font-medium text-gray-900">
                                                {path.Compute_Service}
                                                {index === 0 && (
                                                    <span className="ml-2 text-blue-600">★</span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            <div>Storage: {path.Storage_Type}</div>
                                            <div>Network: {path.Network_Type}</div>
                                            <div>Security: {path.Security}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            <div>Region: {path.Region}</div>
                                            <div>Zone: {path.Availability_Zone}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 space-y-1">
                                            <div>Compute: {formatCurrency(path.Compute_Cost)}</div>
                                            <div>Storage: {formatCurrency(path.Storage_Cost)}</div>
                                            <div>Network: {formatCurrency(path.Network_Cost)}</div>
                                            <div>Other: {formatCurrency(calculateOtherCosts(path))}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="text-lg font-bold text-gray-900">
                                            {formatCurrency(path.Total_Cost)}
                                        </div>
                                        {index === 0 && (
                                            <div className="text-sm text-blue-600">
                                                Lowest Cost Option
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 text-center text-sm text-gray-500">
                    ★ Recommended option is highlighted and represents the most cost-effective infrastructure configuration
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-lg text-gray-600">Loading data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-lg text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8">
                    AWS Infrastructure Cost Analysis
                </h2>
                
                <div className="mb-12">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">
                        Infrastructure Relationship Graph
                    </h3>
                    <GraphVisualization data={graphData} />
                </div>

                <CostComparisonTable data={shortestPathData} />
            </div>
        </div>
    );
};

export default ComputeGraphs;