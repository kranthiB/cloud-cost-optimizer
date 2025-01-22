import React from "react";
import Graph from "react-graph-vis";

const GraphVisualization = ({ data }) => {
    if (!data) return (
        <div className="flex items-center justify-center h-96">
            <div className="text-lg text-gray-600">No data available</div>
        </div>
    );

    const options = {
        nodes: {
            shape: 'circle',
            scaling: {
                min: 20,
                max: 30
            },
            borderWidth: 2,
            shadow: {
                enabled: true,
                color: 'rgba(0,0,0,0.2)',
                size: 5,
                x: 2,
                y: 2
            },
            font: {
                size: 14,
                face: 'Inter, system-ui, sans-serif'
            }
        },
        edges: {
            width: 2,
            selectionWidth: 3,
            smooth: {
                type: 'cubicBezier',
                forceDirection: 'horizontal',
                roundness: 0.3
            },
            shadow: {
                enabled: true,
                color: 'rgba(0,0,0,0.1)',
                size: 3,
                x: 1,
                y: 1
            },
            font: {
                size: 12,
                face: 'Inter, system-ui, sans-serif',
                align: 'middle'
            }
        },
        physics: {
            enabled: true,
            stabilization: {
                iterations: 200,
                updateInterval: 25,
                fit: true
            },
            barnesHut: {
                gravitationalConstant: -3000,
                centralGravity: 0.3,
                springLength: 200,
                springConstant: 0.04,
                damping: 0.09
            }
        },
        interaction: {
            hover: true,
            tooltipDelay: 200,
            hideEdgesOnDrag: true,
            multiselect: true,
            keyboard: {
                enabled: true,
                speed: { x: 10, y: 10, zoom: 0.1 },
                bindToWindow: false
            },
            zoomView: true
        },
        height: '600px',
        layout: {
            improvedLayout: true,
            hierarchical: false
        }
    };

    const events = {
        stabilizationIterationsDone: function() {
            // Auto-fit the graph after stabilization
            this.fit({
                animation: {
                    duration: 1000,
                    easingFunction: 'easeInOutQuad'
                }
            });
        },
        select: function(event) {
            // Selection handling can be added here
            const { nodes, edges } = event;
        },
        hoverNode: function(event) {
            // Custom hover effects can be added here
            document.body.style.cursor = 'pointer';
        },
        blurNode: function(event) {
            document.body.style.cursor = 'default';
        }
    };

    return (
        <div className="relative">
            <div className="border border-gray-200 rounded-lg shadow-inner overflow-hidden bg-gray-50">
                <Graph
                    graph={data}
                    options={options}
                    events={events}
                />
            </div>
            
            {/* Optional: Add zoom controls */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 focus:outline-none">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 focus:outline-none">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default GraphVisualization;