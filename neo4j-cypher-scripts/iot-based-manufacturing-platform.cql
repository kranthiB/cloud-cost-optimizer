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


// Create EMR Node
CREATE (:Analytics {
    // Basic Information
    name: 'EMR',
    csp: 'AWS',
    pipeline: 'IoT-Based Manufacturing Platform',
    region: 'us-east-1',
    
    // Master Node Configuration
    noOfMasterNodes: 1,
    masterNodesInstanceType: 'g6.12x large',
    masterNodesUtilization: '100%',
    
    // Core Nodes Configuration
    noOfCoreNodes: 4,
    coreNodesInstanceType: 'g6.12x large',
    coreNodesUtilization: '100%'
});

// Create Relationship with Cost Details
MATCH 
    (mm:Messaging {
        name: 'MSK',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'us-east-1'
    }),
    (a:Analytics {
        name: 'EMR',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'us-east-1'
    })
CREATE (mm)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 4198.96,
    
    // Cost Breakdown
    masterNodes_cost: 839.792,
    coreNodes_cost: 3359.168,
    
    // Currency
    currency: 'USD'
}]->(a);


// Create EMR Node
CREATE (:Analytics {
    // Basic Information
    name: 'EMR',
    csp: 'AWS',
    pipeline: 'IoT-Based Manufacturing Platform',
    region: 'ap-south-1',
    
    // Master Node Configuration
    noOfMasterNodes: 1,
    masterNodesInstanceType: 'g6.12x large',
    masterNodesUtilization: '100%',
    
    // Core Nodes Configuration
    noOfCoreNodes: 4,
    coreNodesInstanceType: 'g6.12x large',
    coreNodesUtilization: '100%'
});

// Create Relationship with Cost Details
MATCH 
    (mm:Messaging {
        name: 'MSK',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'ap-south-1'
    }),
    (a:Analytics {
        name: 'EMR',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'ap-south-1'
    })
CREATE (mm)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 4198.96,
    
    // Cost Breakdown
    masterNodes_cost: 839.792,
    coreNodes_cost: 3359.168,
    
    // Currency
    currency: 'USD'
}]->(a);

// Create EMR Node
CREATE (:Analytics {
    // Basic Information
    name: 'EMR',
    csp: 'AWS',
    pipeline: 'IoT-Based Manufacturing Platform',
    region: 'eu-west-2',
    
    // Master Node Configuration
    noOfMasterNodes: 1,
    masterNodesInstanceType: 'g6.12x large',
    masterNodesUtilization: '100%',
    
    // Core Nodes Configuration
    noOfCoreNodes: 4,
    coreNodesInstanceType: 'g6.12x large',
    coreNodesUtilization: '100%'
});

// Create Relationship with Cost Details
MATCH 
    (mm:Messaging {
        name: 'MSK',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'eu-west-2'
    }),
    (a:Analytics {
        name: 'EMR',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'eu-west-2'
    })
CREATE (mm)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 4198.96,
    
    // Cost Breakdown
    masterNodes_cost: 839.792,
    coreNodes_cost: 3359.168,
    
    // Currency
    currency: 'USD'
}]->(a);

// Create DynamoDB
CREATE (:Database {
    // Basic Information
    name: 'DynamoDB',
    csp: 'AWS',
    pipeline: 'IoT-Based Manufacturing Platform',
    region: 'us-east-1',
    mode: 'provisioned',
    tableClass: 'Standard',
    
    // DataStorage Configuration
    dataStorage_size: 10,
    dataStorage_sizeUnit: 'TB',
    dataStorage_avgItemSize: 5,
    dataStorage_avgItemSizeUnit: 'KB',

    // Write Settings
    writeSettings_percentageOfNonTransactionalWrites: 50,
    writeSettings_percentageOfTransactionalWrites: 50,
    writeSettings_baselineWriteRateValue: 1000,
    writeSettings_baselineWriteRateUnit: 'Per Second',
    writeSettings_peakWriteRateValue: 4000,
    writeSettings_peakWriteRateUnit: 'Per Second',
    writeSettings_durationOfPeakWriteValue: 300,
    writeSettings_durationOfPeakWriteUnit: 'Hours per Month',
    writeSettings_percentageOfBaselineWritesCoveredByReservedCapacity: 20,
    writeSettings_writeReservedCapacityTerm: '1 year',

    // Read Settings
    readSettings_eventualConsistentPercentage: 0,
    readSettings_stronglyConsistentPercentage: 100,
    readSettings_transactionalPercentage: 0,
    readSettings_baselineReadRateValue: 10000,
    readSettings_baselineReadRateUnit: 'Per Second',
    readSettings_peakReadRateValue: 40000,
    readSettings_peakReadRateUnit: 'Per Second',
    readSettings_durationOfPeakReadValue: 72,
    readSettings_durationOfPeakReadUnit: 'Hours per Month',
    readSettings_percentageOfBaselineReadsCoveredByReservedCapacity: 20,
    readSettings_readReservedCapacityTerm: '1 year'

});

// Create Relationship with Cost Details
MATCH 
    (a:Analytics {
        name: 'EMR',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'us-east-1'
    }),
    (d:Database {
        name: 'DynamoDB',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'us-east-1'
    })
CREATE (a)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 15537.66,
    
    // Data Storage Cost
    dataStorage_cost: 2560,

    // Read Cost
    read_upfrontCost: 1200,
    read_monthlyCostForNonReservedCapacity: 2080,
    read_montlyCostForReservedCapacity: 73,
    read_montlyCost: 2153,

    // Write Cost
    write_upfrontCost: 2250,
    write_monthlyCostForNonReservedCapacity: 7234.5,
    write_montlyCostForReservedCapacity: 140.16,
    write_montlyCost: 7374.66,
    
    // Currency
    currency: 'USD'
}]->(d);


// Create DynamoDB
CREATE (:Database {
    // Basic Information
    name: 'DynamoDB',
    csp: 'AWS',
    pipeline: 'IoT-Based Manufacturing Platform',
    region: 'ap-south-1',
    mode: 'provisioned',
    tableClass: 'Standard',
    
    // DataStorage Configuration
    dataStorage_size: 10,
    dataStorage_sizeUnit: 'TB',
    dataStorage_avgItemSize: 5,
    dataStorage_avgItemSizeUnit: 'KB',

    // Write Settings
    writeSettings_percentageOfNonTransactionalWrites: 50,
    writeSettings_percentageOfTransactionalWrites: 50,
    writeSettings_baselineWriteRateValue: 1000,
    writeSettings_baselineWriteRateUnit: 'Per Second',
    writeSettings_peakWriteRateValue: 4000,
    writeSettings_peakWriteRateUnit: 'Per Second',
    writeSettings_durationOfPeakWriteValue: 300,
    writeSettings_durationOfPeakWriteUnit: 'Hours per Month',
    writeSettings_percentageOfBaselineWritesCoveredByReservedCapacity: 20,
    writeSettings_writeReservedCapacityTerm: '1 year',

    // Read Settings
    readSettings_eventualConsistentPercentage: 0,
    readSettings_stronglyConsistentPercentage: 100,
    readSettings_transactionalPercentage: 0,
    readSettings_baselineReadRateValue: 10000,
    readSettings_baselineReadRateUnit: 'Per Second',
    readSettings_peakReadRateValue: 40000,
    readSettings_peakReadRateUnit: 'Per Second',
    readSettings_durationOfPeakReadValue: 72,
    readSettings_durationOfPeakReadUnit: 'Hours per Month',
    readSettings_percentageOfBaselineReadsCoveredByReservedCapacity: 20,
    readSettings_readReservedCapacityTerm: '1 year'

});

// Create Relationship with Cost Details
MATCH 
    (a:Analytics {
        name: 'EMR',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'ap-south-1'
    }),
    (d:Database {
        name: 'DynamoDB',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'ap-south-1'
    })
CREATE (a)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 17700.15,
    
    // Data Storage Cost
    dataStorage_cost: 2918.40,

    // Read Cost
    read_upfrontCost: 1368,
    read_monthlyCostForNonReservedCapacity: 2368,
    read_montlyCostForReservedCapacity: 84.68,
    read_montlyCost: 2452.68,

    // Write Cost
    write_upfrontCost: 2565,
    write_monthlyCostForNonReservedCapacity: 8236.20,
    write_montlyCostForReservedCapacity: 159.87,
    write_montlyCost: 8396.07,
    
    // Currency
    currency: 'USD'
}]->(d);


// Create DynamoDB
CREATE (:Database {
    // Basic Information
    name: 'DynamoDB',
    csp: 'AWS',
    pipeline: 'IoT-Based Manufacturing Platform',
    region: 'eu-west-2',
    mode: 'provisioned',
    tableClass: 'Standard',
    
    // DataStorage Configuration
    dataStorage_size: 10,
    dataStorage_sizeUnit: 'TB',
    dataStorage_avgItemSize: 5,
    dataStorage_avgItemSizeUnit: 'KB',

    // Write Settings
    writeSettings_percentageOfNonTransactionalWrites: 50,
    writeSettings_percentageOfTransactionalWrites: 50,
    writeSettings_baselineWriteRateValue: 1000,
    writeSettings_baselineWriteRateUnit: 'Per Second',
    writeSettings_peakWriteRateValue: 4000,
    writeSettings_peakWriteRateUnit: 'Per Second',
    writeSettings_durationOfPeakWriteValue: 300,
    writeSettings_durationOfPeakWriteUnit: 'Hours per Month',
    writeSettings_percentageOfBaselineWritesCoveredByReservedCapacity: 20,
    writeSettings_writeReservedCapacityTerm: '1 year',

    // Read Settings
    readSettings_eventualConsistentPercentage: 0,
    readSettings_stronglyConsistentPercentage: 100,
    readSettings_transactionalPercentage: 0,
    readSettings_baselineReadRateValue: 10000,
    readSettings_baselineReadRateUnit: 'Per Second',
    readSettings_peakReadRateValue: 40000,
    readSettings_peakReadRateUnit: 'Per Second',
    readSettings_durationOfPeakReadValue: 72,
    readSettings_durationOfPeakReadUnit: 'Hours per Month',
    readSettings_percentageOfBaselineReadsCoveredByReservedCapacity: 20,
    readSettings_readReservedCapacityTerm: '1 year'

});

// Create Relationship with Cost Details
MATCH 
    (a:Analytics {
        name: 'EMR',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'eu-west-2'
    }),
    (d:Database {
        name: 'DynamoDB',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'eu-west-2'
    })
CREATE (a)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 18457.63,
    
    // Data Storage Cost
    dataStorage_cost: 3042.82,

    // Read Cost
    read_upfrontCost: 1424,
    read_monthlyCostForNonReservedCapacity: 2470.40,
    read_montlyCostForReservedCapacity: 90.52,
    read_montlyCost: 2560.92,

    // Write Cost
    write_upfrontCost: 2670,
    write_monthlyCostForNonReservedCapacity: 8592.36,
    write_montlyCostForReservedCapacity: 167.53,
    write_montlyCost: 8759.89,
    
    // Currency
    currency: 'USD'
}]->(d);

// Create S3
CREATE (:Storage {
    // Basic Information
    name: 'S3',
    csp: 'AWS',
    pipeline: 'IoT-Based Manufacturing Platform',
    region: 'us-east-1',
    mode: 'Standard',
    
    // Data Transfer Configuration
    inboundDataTransfer_From: 'Internet',
    inboundDataTransfer_Amount: 10,
    inboundDataTransfer_AmountUnit: 'TB per Month',
    outboundDataTransfer_To: 'Internet',
    outboundDataTransfer_Amount: 10,
    outboundDataTransfer_AmountUnit: 'TB per Month',


    // Standard Configuration
    standard_storage: 50,
    standard_StorageUnit: 'TB per Month',
    standard_writeRequests: 20000000,
    standard_readRequests: 6000000000,
    standard_dataReturnedValue: 10,
    standard_dataReturnedUnit: 'TB per Month',
    standard_dataScannedValue: 10,
    standard_dataScannedUnit: 'TB per Month'

});

// Create Relationship with Cost Details
MATCH 
    (d:Database {
        name: 'DynamoDB',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'us-east-1'
    }),
    (s:Storage {
        name: 'S3',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'us-east-1'
    })
CREATE (d)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 2967.97,
    
    // Data Transfer Cost
    dataTransfer_cost: 204.80,
    dataTransfer_outBoundTransferCost: 204.80,
    dataTransfer_inBoundTransferCost: 0,

    // Standard Cost
    standard_tierCost: 256.00,
    standard_writesCost: 100.00,
    standard_readsCost: 2400.00,
    standard_selectReturnedCost: 9.216,
    standard_selectScannedCost: 25.60,
    standard_upfrontCost: 0,
    standard_cost: 2790.82,
    
    // Currency
    currency: 'USD'
}]->(s);

// Create S3
CREATE (:Storage {
    // Basic Information
    name: 'S3',
    csp: 'AWS',
    pipeline: 'IoT-Based Manufacturing Platform',
    region: 'ap-south-1',
    mode: 'Standard',
    
    // Data Transfer Configuration
    inboundDataTransfer_From: 'Internet',
    inboundDataTransfer_Amount: 10,
    inboundDataTransfer_AmountUnit: 'TB per Month',
    outboundDataTransfer_To: 'Internet',
    outboundDataTransfer_Amount: 10,
    outboundDataTransfer_AmountUnit: 'TB per Month',


    // Standard Configuration
    standard_storage: 50,
    standard_StorageUnit: 'TB per Month',
    standard_writeRequests: 20000000,
    standard_readRequests: 6000000000,
    standard_dataReturnedValue: 10,
    standard_dataReturnedUnit: 'TB per Month',
    standard_dataScannedValue: 10,
    standard_dataScannedUnit: 'TB per Month'

});

// Create Relationship with Cost Details
MATCH 
    (d:Database {
        name: 'DynamoDB',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'ap-south-1'
    }),
    (s:Storage {
        name: 'S3',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'ap-south-1'
    })
CREATE (d)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 3671.46,
    
    // Data Transfer Cost
    dataTransfer_cost: 880.64,
    dataTransfer_outBoundTransferCost: 880.64,
    dataTransfer_inBoundTransferCost: 0,

    // Standard Cost
    standard_tierCost: 256.00,
    standard_writesCost: 100.00,
    standard_readsCost: 2400.00,
    standard_selectReturnedCost: 9.216,
    standard_selectScannedCost: 25.60,
    standard_upfrontCost: 0,
    standard_cost: 2790.82,
    
    // Currency
    currency: 'USD'
}]->(s);

// Create S3
CREATE (:Storage {
    // Basic Information
    name: 'S3',
    csp: 'AWS',
    pipeline: 'IoT-Based Manufacturing Platform',
    region: 'eu-west-2',
    mode: 'Standard',
    
    // Data Transfer Configuration
    inboundDataTransfer_From: 'Internet',
    inboundDataTransfer_Amount: 10,
    inboundDataTransfer_AmountUnit: 'TB per Month',
    outboundDataTransfer_To: 'Internet',
    outboundDataTransfer_Amount: 10,
    outboundDataTransfer_AmountUnit: 'TB per Month',


    // Standard Configuration
    standard_storage: 50,
    standard_StorageUnit: 'TB per Month',
    standard_writeRequests: 20000000,
    standard_readRequests: 6000000000,
    standard_dataReturnedValue: 10,
    standard_dataReturnedUnit: 'TB per Month',
    standard_dataScannedValue: 10,
    standard_dataScannedUnit: 'TB per Month'

});

// Create Relationship with Cost Details
MATCH 
    (d:Database {
        name: 'DynamoDB',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'eu-west-2'
    }),
    (s:Storage {
        name: 'S3',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'eu-west-2'
    })
CREATE (d)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 3107.79,
    
    // Data Transfer Cost
    dataTransfer_cost: 204.80,
    dataTransfer_outBoundTransferCost: 204.80,
    dataTransfer_inBoundTransferCost: 0,

    // Standard Cost
    standard_tierCost: 245.76,
    standard_writesCost: 106.00,
    standard_readsCost: 2520.00,
    standard_selectReturnedCost: 8.192,
    standard_selectScannedCost: 23.04,
    standard_upfrontCost: 0,
    standard_cost: 2902.99,
    
    // Currency
    currency: 'USD'
}]->(s);


// Create Redshift
CREATE (:Database {
    // Basic Information
    name: 'Redshift',
    csp: 'AWS',
    pipeline: 'IoT-Based Manufacturing Platform',
    region: 'us-east-1',
    numberOfNodes: 5,
    utilizationPercentage: 100,
    instanceType: 'dc2.8xlarge',
    pricingModel: 'OnDemand',
    
    // Storage Configuration
    storage_additionalBackup: 10,
    storage_additionalBackupUnit: 'TB',
    storage_dataScanned: 10,
    storage_dataScannedUnit: 'TB',
    storage_managed: 10,
    storage_managedUnit: 'TB',
    storage_dataTransferInto: 10,
    storage_dataTransferIntoUnit: 'TB'

});

// Create Relationship with Cost Details
MATCH 
    (s:Storage {
        name: 'S3',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'us-east-1'
    }),
    (d:Database {
        name: 'Redshift',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'us-east-1'
    })
CREATE (s)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 18256.08,
    
    // Storage Cost
    storage_instanceCost: 17520.00,
    storage_backupCost: 235.52,
    storage_upfrontCost: 0,
    storage_spectrumCost: 50.00,
    storage_managedCost: 245.76,
    storage_dataTransferCost: 204.80,
    
    // Currency
    currency: 'USD'
}]->(d);

// Create Redshift
CREATE (:Database {
    // Basic Information
    name: 'Redshift',
    csp: 'AWS',
    pipeline: 'IoT-Based Manufacturing Platform',
    region: 'ap-south-1',
    numberOfNodes: 5,
    utilizationPercentage: 100,
    instanceType: 'dc2.8xlarge',
    pricingModel: 'OnDemand',
    
    // Storage Configuration
    storage_additionalBackup: 10,
    storage_additionalBackupUnit: 'TB',
    storage_dataScanned: 10,
    storage_dataScannedUnit: 'TB',
    storage_managed: 10,
    storage_managedUnit: 'TB',
    storage_dataTransferInto: 10,
    storage_dataTransferIntoUnit: 'TB'

});

// Create Relationship with Cost Details
MATCH 
    (s:Storage {
        name: 'S3',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'ap-south-1'
    }),
    (d:Database {
        name: 'Redshift',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'ap-south-1'
    })
CREATE (s)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 23718.90,
    
    // Storage Cost
    storage_instanceCost: 22265.00,
    storage_backupCost: 256.00,
    storage_upfrontCost: 0,
    storage_spectrumCost: 50.00,
    storage_managedCost: 267.26,
    storage_dataTransferCost: 880.64,
    
    // Currency
    currency: 'USD'
}]->(d);

// Create Redshift
CREATE (:Database {
    // Basic Information
    name: 'Redshift',
    csp: 'AWS',
    pipeline: 'IoT-Based Manufacturing Platform',
    region: 'eu-west-2',
    numberOfNodes: 5,
    utilizationPercentage: 100,
    instanceType: 'dc2.8xlarge',
    pricingModel: 'OnDemand',
    
    // Storage Configuration
    storage_additionalBackup: 10,
    storage_additionalBackupUnit: 'TB',
    storage_dataScanned: 10,
    storage_dataScannedUnit: 'TB',
    storage_managed: 10,
    storage_managedUnit: 'TB',
    storage_dataTransferInto: 10,
    storage_dataTransferIntoUnit: 'TB'

});

// Create Relationship with Cost Details
MATCH 
    (s:Storage {
        name: 'S3',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'eu-west-2'
    }),
    (d:Database {
        name: 'Redshift',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: 'eu-west-2'
    })
CREATE (s)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 22218.56,
    
    // Storage Cost
    storage_instanceCost: 21462.00,
    storage_backupCost: 245.76,
    storage_upfrontCost: 0,
    storage_spectrumCost: 50.00,
    storage_managedCost: 256,
    storage_dataTransferCost: 204.80,
    
    // Currency
    currency: 'USD'
}]->(d);

// Create End Pipeline Node
CREATE (:Pipelines {
    name: 'IoT-Based Manufacturing Platform',
    state: 'end'
});

// Create End Node Relationships for Multiple Regions
WITH ['us-east-1', 'ap-south-1', 'eu-west-2'] as regions
UNWIND regions as region
MATCH 
    (d:Database {
        name: 'Redshift',
        csp: 'AWS',
        pipeline: 'IoT-Based Manufacturing Platform',
        region: region
    }),
    (p:Pipelines {
        name: 'IoT-Based Manufacturing Platform',
        state: 'end'
    })
CREATE (d)-[:COST_EFFECTIVE_RATIO {
    cost: 0
}]->(p);
