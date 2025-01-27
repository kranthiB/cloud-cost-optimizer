// Create Pipeline
CREATE (:Pipelines {name: 'Global Finance Analytics Platform', csp: 'Azure', state: 'start'});

// Create Event Hubs
CREATE (:Messaging {
    // Basic Information
    name: 'Event Hubs',
    csp: 'Azure',
    pipeline: 'Global Finance Analytics Platform',
    region: 'Central India',
    tier: 'Premium',
    processingUnits: 8,
    extendedRetentionData: 10000,
    extendedRetentionValue: 'GB'
});

// Create Relationship with Cost Details
MATCH 
    (p:Pipelines {
        name: 'Global Finance Analytics Platform', 
        csp: 'Azure',
        state: 'start'
    }),
    (m:Messaging {
        name: 'Event Hubs',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'Central India'
    })
CREATE (p)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 9797.92,
    
    // Cost Breakdown
    processingUnitsCost: 8397.92,
    extendedRetentionCost: 1400,
    
    // Currency
    currency: 'USD'
}]->(m);


// Create Event Hubs
CREATE (:Messaging {
    // Basic Information
    name: 'Event Hubs',
    csp: 'Azure',
    pipeline: 'Global Finance Analytics Platform',
    region: 'East US',
    tier: 'Premium',
    processingUnits: 8,
    extendedRetentionData: 10000,
    extendedRetentionValue: 'GB'
});

// Create Relationship with Cost Details
MATCH 
    (p:Pipelines {
        name: 'Global Finance Analytics Platform', 
        csp: 'Azure',
        state: 'start'
    }),
    (m:Messaging {
        name: 'Event Hubs',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'East US'
    })
CREATE (p)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 6997.68,
    
    // Cost Breakdown
    processingUnitsCost: 5997.68,
    extendedRetentionCost: 1000,
    
    // Currency
    currency: 'USD'
}]->(m);


// Create Event Hubs
CREATE (:Messaging {
    // Basic Information
    name: 'Event Hubs',
    csp: 'Azure',
    pipeline: 'Global Finance Analytics Platform',
    region: 'UK South',
    tier: 'Premium',
    processingUnits: 8,
    extendedRetentionData: 10000,
    extendedRetentionValue: 'GB'
});

// Create Relationship with Cost Details
MATCH 
    (p:Pipelines {
        name: 'Global Finance Analytics Platform', 
        csp: 'Azure',
        state: 'start'
    }),
    (m:Messaging {
        name: 'Event Hubs',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'UK South'
    })
CREATE (p)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 8748.56,
    
    // Cost Breakdown
    processingUnitsCost: 7498.56,
    extendedRetentionCost: 1250,
    
    // Currency
    currency: 'USD'
}]->(m);


// Create Stream Analytics
CREATE (:Analytics {
    // Basic Information
    name: 'Stream Analytics',
    csp: 'Azure',
    pipeline: 'Global Finance Analytics Platform',
    region: 'Central India',
    type: 'Standard V2',
    range: '1 or more Streaming Units',
    streamingUnits: 50,
    streamAnalyticsOnIoTEdgeDevices: 999
});

// Create Relationship with Cost Details
MATCH 
    (m:Messaging {
        name: 'Event Hubs',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'Central India'
    }),
    (a:Analytics {
        name: 'Stream Analytics',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'Central India'
    })
CREATE (m)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 6430.56,
    
    // Cost Breakdown
    streamingCost: 5431.56,
    streamingCostOnIoTEdge: 999.00,
    
    // Currency
    currency: 'USD'
}]->(a);


// Create Stream Analytics
CREATE (:Analytics {
    // Basic Information
    name: 'Stream Analytics',
    csp: 'Azure',
    pipeline: 'Global Finance Analytics Platform',
    region: 'East US',
    type: 'Standard V2',
    range: '1 or more Streaming Units',
    streamingUnits: 50,
    streamAnalyticsOnIoTEdgeDevices: 999
});

// Create Relationship with Cost Details
MATCH 
    (m:Messaging {
        name: 'Event Hubs',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'East US'
    }),
    (a:Analytics {
        name: 'Stream Analytics',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'East US'
    })
CREATE (m)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 5667.11,
    
    // Cost Breakdown
    streamingCost: 4668.11,
    streamingCostOnIoTEdge: 999.00,
    
    // Currency
    currency: 'USD'
}]->(a);

// Create Stream Analytics
CREATE (:Analytics {
    // Basic Information
    name: 'Stream Analytics',
    csp: 'Azure',
    pipeline: 'Global Finance Analytics Platform',
    region: 'UK South',
    type: 'Standard V2',
    range: '1 or more Streaming Units',
    streamingUnits: 50,
    streamAnalyticsOnIoTEdgeDevices: 999
});

// Create Relationship with Cost Details
MATCH 
    (m:Messaging {
        name: 'Event Hubs',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'UK South'
    }),
    (a:Analytics {
        name: 'Stream Analytics',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'UK South'
    })
CREATE (m)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 6395.77,
    
    // Cost Breakdown
    streamingCost: 5396.77,
    streamingCostOnIoTEdge: 999.00,
    
    // Currency
    currency: 'USD'
}]->(a);


// Create Databricks
CREATE (:Analytics {
    // Basic Information
    name: 'Databricks',
    csp: 'Azure',
    pipeline: 'Global Finance Analytics Platform',
    region: 'Central India',
    workload: 'All-Purpose Compute',
    tier: 'Premium',
    instance_series: 'NVads A10 v5-series',
    instance_type: 'NV36adms A10 v5',
    instance_cVPUs: 36,
    instance_RAM: '880 GB',
    instance_temporaryStorage: '730 GB',
    virtualMachines: 3,
    model: 'Pay as you go'
});

// Create Relationship with Cost Details
MATCH 
    (as:Analytics {
        name: 'Stream Analytics',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'Central India'
    }),
    (ad:Analytics {
        name: 'Databricks',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'Central India'
    })
CREATE (as)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 13858.32,

    // Currency
    currency: 'USD'
}]->(ad);

// Create Databricks
CREATE (:Analytics {
    // Basic Information
    name: 'Databricks',
    csp: 'Azure',
    pipeline: 'Global Finance Analytics Platform',
    region: 'East US',
    workload: 'All-Purpose Compute',
    tier: 'Premium',
    instance_series: 'NVads A10 v5-series',
    instance_type: 'NV36adms A10 v5',
    instance_cVPUs: 36,
    instance_RAM: '880 GB',
    instance_temporaryStorage: '730 GB',
    virtualMachines: 3,
    model: 'Pay as you go'
});

// Create Relationship with Cost Details
MATCH 
    (as:Analytics {
        name: 'Stream Analytics',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'East US'
    }),
    (ad:Analytics {
        name: 'Databricks',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'East US'
    })
CREATE (as)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 9989.80,

    // Currency
    currency: 'USD'
}]->(ad);


// Create Databricks
CREATE (:Analytics {
    // Basic Information
    name: 'Databricks',
    csp: 'Azure',
    pipeline: 'Global Finance Analytics Platform',
    region: 'UK South',
    workload: 'All-Purpose Compute',
    tier: 'Premium',
    instance_series: 'NVads A10 v5-series',
    instance_type: 'NV36adms A10 v5',
    instance_cVPUs: 36,
    instance_RAM: '880 GB',
    instance_temporaryStorage: '730 GB',
    virtualMachines: 3,
    model: 'Pay as you go'
});

// Create Relationship with Cost Details
MATCH 
    (as:Analytics {
        name: 'Stream Analytics',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'UK South'
    }),
    (ad:Analytics {
        name: 'Databricks',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'UK South'
    })
CREATE (as)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 12373.50,

    // Currency
    currency: 'USD'
}]->(ad);


// Create Cosmos DB
CREATE (:Database {
    // Basic Information
    name: 'Cosmos DB',
    csp: 'Azure',
    pipeline: 'Global Finance Analytics Platform',
    region: 'Central India',
    apiChoice: 'Azure Cosmos DB for NoSQL (formerly Core)',
    databaseOperartions: 'Autoscale Provisioned throughput',
    wirteRegions: 'Multiple Region Write (Multi-Master)',
    RUPerSecond: 100000,
    primaryWriteRegion: 'Central India'
});

// Create Relationship with Cost Details
MATCH 
    (a:Analytics {
        name: 'Databricks',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'Central India'
    }),
    (d:Database {
        name: 'Cosmos DB',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'Central India'
    })
CREATE (a)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 19929.00,

    // Currency
    currency: 'USD'
}]->(d);

// Create Cosmos DB
CREATE (:Database {
    // Basic Information
    name: 'Cosmos DB',
    csp: 'Azure',
    pipeline: 'Global Finance Analytics Platform',
    region: 'East US',
    apiChoice: 'Azure Cosmos DB for NoSQL (formerly Core)',
    databaseOperartions: 'Autoscale Provisioned throughput',
    wirteRegions: 'Multiple Region Write (Multi-Master)',
    RUPerSecond: 100000,
    primaryWriteRegion: 'Central India'
});

// Create Relationship with Cost Details
MATCH 
    (a:Analytics {
        name: 'Databricks',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'East US'
    }),
    (d:Database {
        name: 'Cosmos DB',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'East US'
    })
CREATE (a)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 19929.00,

    // Currency
    currency: 'USD'
}]->(d);

// Create Cosmos DB
CREATE (:Database {
    // Basic Information
    name: 'Cosmos DB',
    csp: 'Azure',
    pipeline: 'Global Finance Analytics Platform',
    region: 'UK South',
    apiChoice: 'Azure Cosmos DB for NoSQL (formerly Core)',
    databaseOperartions: 'Autoscale Provisioned throughput',
    wirteRegions: 'Multiple Region Write (Multi-Master)',
    RUPerSecond: 100000,
    primaryWriteRegion: 'Central India'
});

// Create Relationship with Cost Details
MATCH 
    (a:Analytics {
        name: 'Databricks',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'UK South'
    }),
    (d:Database {
        name: 'Cosmos DB',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'UK South'
    })
CREATE (a)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 19929.00,

    // Currency
    currency: 'USD'
}]->(d);


// Create Blob Storage
CREATE (:Storage {
    // Basic Information
    name: 'Blob Storage',
    csp: 'Azure',
    pipeline: 'Global Finance Analytics Platform',
    region: 'Central India',
    performance: 'Standard',
    storageAccountType: 'General Purpose V2',
    fileStructure: 'Flat Namespace',
    accestier: 'Hot',
    redundancy: 'LRS',
    capacity: '10 TB',
    writeOperationsIn10K: 10000,
    listAndCreateOperationsIn10K: 20000,
    readOperationsIn10K: 40000,
    allOtherOperationsIn10K: 10000,
    dataRetrieval: '10 TB'
});

// Create Relationship with Cost Details
MATCH 
    (d:Database {
        name: 'Cosmos DB',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'Central India'
    }),
    (s:Storage {
        name: 'Blob Storage',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'Central India'
    })
CREATE (d)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 2074.80,

    // Cost Breakdown
    storage_cost: 204.80,
    writeOperations_cost: 550.00,
    listAndCreateOperations_cost: 1100.00,
    readOperations_cost: 176.00,
    allOtherOperations_cost: 44,
    // Currency
    currency: 'USD'
}]->(s);


// Create Blob Storage
CREATE (:Storage {
    // Basic Information
    name: 'Blob Storage',
    csp: 'Azure',
    pipeline: 'Global Finance Analytics Platform',
    region: 'East US',
    performance: 'Standard',
    storageAccountType: 'General Purpose V2',
    fileStructure: 'Flat Namespace',
    accestier: 'Hot',
    redundancy: 'LRS',
    capacity: '10 TB',
    writeOperationsIn10K: 10000,
    listAndCreateOperationsIn10K: 20000,
    readOperationsIn10K: 40000,
    allOtherOperationsIn10K: 10000,
    dataRetrieval: '10 TB'
});

// Create Relationship with Cost Details
MATCH 
    (d:Database {
        name: 'Cosmos DB',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'East US'
    }),
    (s:Storage {
        name: 'Blob Storage',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'East US'
    })
CREATE (d)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 1912.99,

    // Cost Breakdown
    storage_cost: 212.99,
    writeOperations_cost: 500.00,
    listAndCreateOperations_cost: 1000.00,
    readOperations_cost: 160.00,
    allOtherOperations_cost: 40,
    // Currency
    currency: 'USD'
}]->(s);


// Create Blob Storage
CREATE (:Storage {
    // Basic Information
    name: 'Blob Storage',
    csp: 'Azure',
    pipeline: 'Global Finance Analytics Platform',
    region: 'UK South',
    performance: 'Standard',
    storageAccountType: 'General Purpose V2',
    fileStructure: 'Flat Namespace',
    accestier: 'Hot',
    redundancy: 'LRS',
    capacity: '10 TB',
    writeOperationsIn10K: 10000,
    listAndCreateOperationsIn10K: 20000,
    readOperationsIn10K: 40000,
    allOtherOperationsIn10K: 10000,
    dataRetrieval: '10 TB'
});

// Create Relationship with Cost Details
MATCH 
    (d:Database {
        name: 'Cosmos DB',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'UK South'
    }),
    (s:Storage {
        name: 'Blob Storage',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'UK South'
    })
CREATE (d)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 2201.61,

    // Cost Breakdown
    storage_cost: 196.61,
    writeOperations_cost: 590.00,
    listAndCreateOperations_cost: 1180.00,
    readOperations_cost: 188.00,
    allOtherOperations_cost: 47,
    // Currency
    currency: 'USD'
}]->(s);

// Create Synapse Analytics
CREATE (:Analytics {
    // Basic Information
    name: 'Synapse Analytics',
    csp: 'Azure',
    pipeline: 'Global Finance Analytics Platform',
    region: 'Central India',
    dwuBlocks: 1000,
    model: 'Pay as you go',
    storage: '1 TB',
    enableGeoReduntantDisasterRecovery: 'Yes',
    autoSelectDataExplorerPoolInstances: 'Yes'
});

// Create Relationship with Cost Details
MATCH 
    (s:Storage {
        name: 'Blob Storage',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'Central India'
    }),
    (a:Analytics {
        name: 'Synapse Analytics',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'Central India'
    })
CREATE (s)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 13327.27,

    // Cost Breakdown
    storage_cost : 28.19,
    dataManagement_cost: 175.93,
    engine_cost: 703.72,
    processing_cost: 12337.00,
    redundantStorage_cost: 23.55,
    redundantStorage_disasterRecoveryCost: 58.88,
    // Currency
    currency: 'USD'
}]->(a);


// Create Synapse Analytics
CREATE (:Analytics {
    // Basic Information
    name: 'Synapse Analytics',
    csp: 'Azure',
    pipeline: 'Global Finance Analytics Platform',
    region: 'East US',
    dwuBlocks: 1000,
    model: 'Pay as you go',
    storage: '1 TB',
    enableGeoReduntantDisasterRecovery: 'Yes',
    autoSelectDataExplorerPoolInstances: 'Yes'
});

// Create Relationship with Cost Details
MATCH 
    (s:Storage {
        name: 'Blob Storage',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'East US'
    }),
    (a:Analytics {
        name: 'Synapse Analytics',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'East US'
    })
CREATE (s)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 11930.44,

    // Cost Breakdown
    storage_cost : 27.54,
    dataManagement_cost: 159.87,
    engine_cost: 649.48,
    processing_cost: 11023.00,
    redundantStorage_cost: 23.00,
    redundantStorage_disasterRecoveryCost: 57.55,
    // Currency
    currency: 'USD'
}]->(a);


// Create Synapse Analytics
CREATE (:Analytics {
    // Basic Information
    name: 'Synapse Analytics',
    csp: 'Azure',
    pipeline: 'Global Finance Analytics Platform',
    region: 'UK South',
    dwuBlocks: 1000,
    model: 'Pay as you go',
    storage: '1 TB',
    enableGeoReduntantDisasterRecovery: 'Yes',
    autoSelectDataExplorerPoolInstances: 'Yes'
});

// Create Relationship with Cost Details
MATCH 
    (s:Storage {
        name: 'Blob Storage',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'UK South'
    }),
    (a:Analytics {
        name: 'Synapse Analytics',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: 'UK South'
    })
CREATE (s)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 13226.19,

    // Cost Breakdown
    storage_cost : 27.54,
    dataManagement_cost: 200.02,
    engine_cost: 800.08,
    processing_cost: 12118.00,
    redundantStorage_cost: 23.00,
    redundantStorage_disasterRecoveryCost: 57.55,
    // Currency
    currency: 'USD'
}]->(a);


// Create End Pipeline Node
CREATE (:Pipelines {
    name: 'Global Finance Analytics Platform',
    csp: 'Azure',
    state: 'end'
});

// Create End Node Relationships for Multiple Regions
WITH ['Central India', 'East US', 'UK South'] as regions
UNWIND regions as region
MATCH 
    (a:Analytics {
        name: 'Synapse Analytics',
        csp: 'Azure',
        pipeline: 'Global Finance Analytics Platform',
        region: region
    }),
    (p:Pipelines {
        name: 'Global Finance Analytics Platform',
        csp: 'Azure',
        state: 'end'
    })
CREATE (a)-[:COST_EFFECTIVE_RATIO {
    cost: 0
}]->(p);
