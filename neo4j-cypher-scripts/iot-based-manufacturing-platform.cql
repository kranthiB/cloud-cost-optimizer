MATCH (n) DETACH DELETE n;
MATCH (n)-[r]->(m) RETURN n, r, m;


// Create Pipeline
CREATE (:Pipelines {name: 'IoT-Based Manufacturing Platform', state: 'start'});

// Data Ingestion Layer - AWS IoT Core
CREATE (:IoT {
    // Basic Information
    name: 'IoT Core',
    csp: 'AWS',
    pipeline: 'IoT-Based Manufacturing Platform',
    region: 'us-east-1',
    
    // Device Configuration
    noOfDevices: 100000,
    
    // Connectivity Details
    connectivity_connectionDurationPerMonthInMinutes: 21900,
    
    // Messaging Configuration
    messaging_numberOfMessagesPerMonth: 100000,
    messaging_average_size: 5,
    messaging_average_unit: 'KB',
    
    // Device Shadow Properties
    deviceShadow_noOfShadowOperationsPerMonth: 240,
    deviceShadow_average_size: 5,
    deviceShadow_average_unit: 'KB',
    
    // Registry Configuration
    registry_noOfRegistryRequests: 1000,
    registry_average_size: 5,
    registry_average_unit: 'KB',
    
    // Rules Engine Settings
    rulesEngine_noOfRulesTriggered: 100,
    rulesEngine_average_numberOfActionsExecuted: 5,
    rulesEngine_average_size: 5,
    rulesEngine_average_unit: 'KB',
    
    // Location Updates
    avgNumberOfLocationUpdates: 100
});

// Create Relationship with Cost Details
MATCH 
    (p:Pipelines {
        name: 'IoT-Based Manufacturing Platform', 
        state: 'start'
    }),
    (i:IoT {
        name: 'IoT Core',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'us-east-1'
    })
CREATE (p)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 9034.2,
    
    // Cost Breakdown
    connectivity_cost: 175.2,
    messaging_cost: 7700,
    deviceShadow_cost: 150,
    registry_cost: 0.00625,
    rulesEngine_cost: 9,
    deviceLocations_cost: 1000,
    
    // Currency
    currency: 'USD'
}]->(i);

// Create IoT Core Node
CREATE (:IoT {
    // Basic Information
    name: 'IoT Core',
    csp: 'AWS',
    pipeline: 'IoT-Based Manufacturing Platform',
    region: 'ap-south-1',
    
    // Device Configuration
    noOfDevices: 100000,
    
    // Connectivity Details
    connectivity_connectionDurationPerMonthInMinutes: 21900,
    
    // Messaging Configuration
    messaging_numberOfMessagesPerMonth: 100000,
    messaging_average_size: 5,
    messaging_average_unit: 'KB',
    
    // Device Shadow Properties
    deviceShadow_noOfShadowOperationsPerMonth: 240,
    deviceShadow_average_size: 5,
    deviceShadow_average_unit: 'KB',
    
    // Registry Configuration
    registry_noOfRegistryRequests: 1000,
    registry_average_size: 5,
    registry_average_unit: 'KB',
    
    // Rules Engine Settings
    rulesEngine_noOfRulesTriggered: 100,
    rulesEngine_average_numberOfActionsExecuted: 5,
    rulesEngine_average_size: 5,
    rulesEngine_average_unit: 'KB',
    
    // Location Updates
    avgNumberOfLocationUpdates: 100
});

// Create Relationship with Cost Details
MATCH 
    (p:Pipelines {
        name: 'IoT-Based Manufacturing Platform', 
        state: 'start'
    }),
    (i:IoT {
        name: 'IoT Core',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'ap-south-1'
    })
CREATE (p)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 8478.16,
    
    // Cost Breakdown
    connectivity_cost: 201.48,
    messaging_cost: 8110,
    deviceShadow_cost: 157.2,
    registry_cost: 0.00655,
    rulesEngine_cost: 9.48,
    deviceLocations_cost: 0,
    
    // Currency
    currency: 'USD'
}]->(i);

CREATE (:IoT {
    // Basic Information
    name: 'IoT Core',
    csp: 'AWS',
    pipeline: 'IoT-Based Manufacturing Platform',
    region: 'eu-west-2',
    
    // Device Configuration
    noOfDevices: 100000,
    
    // Connectivity Details
    connectivity_connectionDurationPerMonthInMinutes: 21900,
    
    // Messaging Configuration
    messaging_numberOfMessagesPerMonth: 100000,
    messaging_average_size: 5,
    messaging_average_unit: 'KB',
    
    // Device Shadow Properties
    deviceShadow_noOfShadowOperationsPerMonth: 240,
    deviceShadow_average_size: 5,
    deviceShadow_average_unit: 'KB',
    
    // Registry Configuration
    registry_noOfRegistryRequests: 1000,
    registry_average_size: 5,
    registry_average_unit: 'KB',
    
    // Rules Engine Settings
    rulesEngine_noOfRulesTriggered: 100,
    rulesEngine_average_numberOfActionsExecuted: 5,
    rulesEngine_average_size: 5,
    rulesEngine_average_unit: 'KB',
    
    // Location Updates
    avgNumberOfLocationUpdates: 100
});

// Create Relationship with Cost Details
MATCH 
    (p:Pipelines {
        name: 'IoT-Based Manufacturing Platform', 
        state: 'start'
    }),
    (i:IoT {
        name: 'IoT Core',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'eu-west-2'
    })
CREATE (p)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 9641.12,
    
    // Cost Breakdown
    connectivity_cost: 210.24,
    messaging_cost: 9240,
    deviceShadow_cost: 180,
    registry_cost: 0.0075,
    rulesEngine_cost: 10.8,
    deviceLocations_cost: 0,
    
    // Currency
    currency: 'USD'
}]->(i);


// Create Kinesis Data Streams Node
CREATE (:Messaging {
    // Basic Information
    name: 'Kinesis Data Streams',
    csp: 'AWS',
    pipeline: 'IoT-Based Manufacturing Platform',
    region: 'us-east-1',
    
    // Stream Configuration
    mode: 'provisioned',
    
    // Baseline Configuration
    baselineNumberOfRecords: 5000,
    baselineNumberOfRecordsUnit: 'Per Second',
    
    // Peak Configuration
    peakNumberOfRecords: 10000,
    peakNumberOfRecordsUnit: 'Per Second',
    
    // Record Properties
    avgRecordSize: 5,
    avgRecordUnit: 'KB',
    bufferForGrowth: '50%',
    
    // Consumer Configuration
    noOfConsumerApplications: 3,
    numberOfEnhancedFanOutConsumers: 1,
    
    // Retention Configuration
    durationOfDataRetention: 2,
    durationOfDataRetentionUnit: 'days'
});

// Create Relationship with Cost Details
MATCH 
    (i:IoT {
        name: 'IoT Core',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'us-east-1'
    }),
    (m:Messaging {
        name: 'Kinesis Data Streams',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'us-east-1'
    })
CREATE (i)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 5013.0241,
    
    // Cost Breakdown
    shard_cost: 1204.5,
    putPayload_cost: 183.96,
    extRetention_cost: 1606,
    extFanOut_cost: 1204.5,
    extFanOutDataCost: 814.0641,
    
    // Currency
    currency: 'USD'
}]->(m);

// Create Kinesis Data Streams Node
CREATE (:Messaging {
    // Basic Information
    name: 'Kinesis Data Streams',
    csp: 'AWS',
    pipeline: 'IoT-Based Manufacturing Platform',
    region: 'ap-south-1',
    
    // Stream Configuration
    mode: 'provisioned',
    
    // Baseline Configuration
    baselineNumberOfRecords: 5000,
    baselineNumberOfRecordsUnit: 'Per Second',
    
    // Peak Configuration
    peakNumberOfRecords: 10000,
    peakNumberOfRecordsUnit: 'Per Second',
    
    // Record Properties
    avgRecordSize: 5,
    avgRecordUnit: 'KB',
    bufferForGrowth: '50%',
    
    // Consumer Configuration
    noOfConsumerApplications: 3,
    numberOfEnhancedFanOutConsumers: 1,
    
    // Retention Configuration
    durationOfDataRetention: 2,
    durationOfDataRetentionUnit: 'days'
});

// Create Relationship with Cost Details
MATCH 
    (i:IoT {
        name: 'IoT Core',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'ap-south-1'
    }),
    (m:Messaging {
        name: 'Kinesis Data Streams',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'ap-south-1'
    })
CREATE (i)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 5916.559,
    
    // Cost Breakdown
    shard_cost: 1405.25,
    putPayload_cost: 243.09,
    extRetention_cost: 1911.14,
    extFanOut_cost: 1405.25,
    extFanOutDataCost: 951.829,
    
    // Currency
    currency: 'USD'
}]->(m);

// Create Kinesis Data Streams Node
CREATE (:Messaging {
    // Basic Information
    name: 'Kinesis Data Streams',
    csp: 'AWS',
    pipeline: 'IoT-Based Manufacturing Platform',
    region: 'eu-west-2',
    
    // Stream Configuration
    mode: 'provisioned',
    
    // Baseline Configuration
    baselineNumberOfRecords: 5000,
    baselineNumberOfRecordsUnit: 'Per Second',
    
    // Peak Configuration
    peakNumberOfRecords: 10000,
    peakNumberOfRecordsUnit: 'Per Second',
    
    // Record Properties
    avgRecordSize: 5,
    avgRecordUnit: 'KB',
    bufferForGrowth: '50%',
    
    // Consumer Configuration
    noOfConsumerApplications: 3,
    numberOfEnhancedFanOutConsumers: 1,
    
    // Retention Configuration
    durationOfDataRetention: 2,
    durationOfDataRetentionUnit: 'days'
});

// Create Relationship with Cost Details
MATCH 
    (i:IoT {
        name: 'IoT Core',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'eu-west-2'
    }),
    (m:Messaging {
        name: 'Kinesis Data Streams',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'eu-west-2'
    })
CREATE (i)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 6015.937,
    
    // Cost Breakdown
    shard_cost: 1437.37,
    putPayload_cost: 227.322,
    extRetention_cost: 1943.26,
    extFanOut_cost: 1437.37,
    extFanOutDataCost: 970.615,
    
    // Currency
    currency: 'USD'
}]->(m);

// Create MSK Node
CREATE (:Messaging {
    // Basic Information
    name: 'MSK',
    csp: 'AWS',
    pipeline: 'IoT-Based Manufacturing Platform',
    region: 'us-east-1',
    mode: 'provisioned',
    
    // Broker Configuration
    noOfKafkaBrokerNodes: 5,
    instanceType: 'm5.4xlarge',
    
    // Storage Configuration
    storagePerBroker: 1024,
    storagePerBrokerUnit: 'GB',
    desiredProvisionedStorageThroughputMiBps: 250,
    
    // Multi-VPC Configuration
    noOfAuthenticationSchemesForMultiVPC: 1,
    dataProcessedForMultiVPC: 62000,
    dataProcessedUnitForMultiVPC: 'GB',
    
    // Data Transfer Configuration
    dataTransferIntraRegion: 6,
    dataTransferIntraRegionUnit: 'TB',
    dataTransferOutbound: 6,
    dataTransferOutboundUnit: 'TB',
    dataTransferOutboundTo: 'Internet'
});

// Create Relationship with Cost Details
MATCH 
    (mk:Messaging {
        name: 'Kinesis Data Streams',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'us-east-1'
    }),
    (mm:Messaging {
        name: 'MSK',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'us-east-1'
    })
CREATE (mk)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 7808.265,
    
    // Cost Breakdown
    brokerInstances_cost: 6132,
    storage_cost: 512,
    throughput_cost: 100,
    multiVPCConnectivity_cost: 388.425,
    dataTransfer_cost: 675.84,
    
    // Currency
    currency: 'USD'
}]->(mm);


// Create MSK Node
CREATE (:Messaging {
    // Basic Information
    name: 'MSK',
    csp: 'AWS',
    pipeline: 'IoT-Based Manufacturing Platform',
    region: 'ap-south-1',
    mode: 'provisioned',
    
    // Broker Configuration
    noOfKafkaBrokerNodes: 5,
    instanceType: 'm5.4xlarge',
    
    // Storage Configuration
    storagePerBroker: 1024,
    storagePerBrokerUnit: 'GB',
    desiredProvisionedStorageThroughputMiBps: 250,
    
    // Multi-VPC Configuration
    noOfAuthenticationSchemesForMultiVPC: 1,
    dataProcessedForMultiVPC: 62000,
    dataProcessedUnitForMultiVPC: 'GB',
    
    // Data Transfer Configuration
    dataTransferIntraRegion: 6,
    dataTransferIntraRegionUnit: 'TB',
    dataTransferOutbound: 6,
    dataTransferOutboundUnit: 'TB',
    dataTransferOutboundTo: 'Internet'
});

// Create Relationship with Cost Details
MATCH 
    (mk:Messaging {
        name: 'Kinesis Data Streams',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'ap-south-1'
    }),
    (mm:Messaging {
        name: 'MSK',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'ap-south-1'
    })
CREATE (mk)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 8334.746,
    
    // Cost Breakdown
    brokerInstances_cost: 6453.2,
    storage_cost: 583.68,
    throughput_cost: 114,
    multiVPCConnectivity_cost: 389.447,
    dataTransfer_cost: 794.419,
    
    // Currency
    currency: 'USD'
}]->(mm);


// Create MSK Node
CREATE (:Messaging {
    // Basic Information
    name: 'MSK',
    csp: 'AWS',
    pipeline: 'IoT-Based Manufacturing Platform',
    region: 'eu-west-2',
    mode: 'provisioned',
    
    // Broker Configuration
    noOfKafkaBrokerNodes: 5,
    instanceType: 'm5.4xlarge',
    
    // Storage Configuration
    storagePerBroker: 1024,
    storagePerBrokerUnit: 'GB',
    desiredProvisionedStorageThroughputMiBps: 250,
    
    // Multi-VPC Configuration
    noOfAuthenticationSchemesForMultiVPC: 1,
    dataProcessedForMultiVPC: 62000,
    dataProcessedUnitForMultiVPC: 'GB',
    
    // Data Transfer Configuration
    dataTransferIntraRegion: 6,
    dataTransferIntraRegionUnit: 'TB',
    dataTransferOutbound: 6,
    dataTransferOutboundUnit: 'TB',
    dataTransferOutboundTo: 'Internet'
});

// Create Relationship with Cost Details
MATCH 
    (mk:Messaging {
        name: 'Kinesis Data Streams',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'eu-west-2'
    }),
    (mm:Messaging {
        name: 'MSK',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'eu-west-2'
    })
CREATE (mk)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 8869.026,
    
    // Cost Breakdown
    brokerInstances_cost: 7091.95,
    storage_cost: 593.92,
    throughput_cost: 116,
    multiVPCConnectivity_cost: 391.316,
    dataTransfer_cost: 675.84,
    
    // Currency
    currency: 'USD'
}]->(mm);


// End Pipeline

// Create End Pipeline Node
CREATE (:Pipelines {
    name: 'IoT-Based Manufacturing Platform',
    state: 'end'
});

// Create End Node Relationships for Multiple Regions
WITH ['us-east-1', 'ap-south-1', 'eu-west-2'] as regions
UNWIND regions as region
MATCH 
    (mm:Messaging {
        name: 'MSK',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: region
    }),
    (p:Pipelines {
        name: 'IoT-Based Manufacturing Platform',
        state: 'end'
    })
CREATE (mm)-[:COST_EFFECTIVE_RATIO {
    cost: 0
}]->(p);
