// Create Pipeline
CREATE (:Pipelines {name: 'Connected Vehicle Analytics Platform', csp: 'Multi-Cloud', state: 'start'});

// AWS
// Create IoT Core Node
CREATE (:IoT {
    // Basic Information
    name: 'IoT Core',
    csp: 'Multi-Cloud',
    pipeline: 'Connected Vehicle Analytics Platform',
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
        name: 'Connected Vehicle Analytics Platform', 
        csp: 'Multi-Cloud',
        state: 'start'
    }),
    (i:IoT {
        name: 'IoT Core',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
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

// Create Kinesis Data Streams Node
CREATE (:Messaging {
    // Basic Information
    name: 'Kinesis Data Streams',
    csp: 'Multi-Cloud',
    pipeline: 'Connected Vehicle Analytics Platform',
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
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'ap-south-1'
    }),
    (m:Messaging {
        name: 'Kinesis Data Streams',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
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

// Create MSK Node
CREATE (:Messaging {
    // Basic Information
    name: 'MSK',
    csp: 'Multi-Cloud',
    pipeline: 'Connected Vehicle Analytics Platform',
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
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'ap-south-1'
    }),
    (mm:Messaging {
        name: 'MSK',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
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

// Create EMR Node
CREATE (:Analytics {
    // Basic Information
    name: 'EMR',
    csp: 'Multi-Cloud',
    pipeline: 'Connected Vehicle Analytics Platform',
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
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'ap-south-1'
    }),
    (a:Analytics {
        name: 'EMR',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
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

// Create DynamoDB
CREATE (:Database {
    // Basic Information
    name: 'DynamoDB',
    csp: 'Multi-Cloud',
    pipeline: 'Connected Vehicle Analytics Platform',
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
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'ap-south-1'
    }),
    (d:Database {
        name: 'DynamoDB',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
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

// Create S3
CREATE (:Storage {
    // Basic Information
    name: 'S3',
    csp: 'Multi-Cloud',
    pipeline: 'Connected Vehicle Analytics Platform',
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
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'ap-south-1'
    }),
    (s:Storage {
        name: 'S3',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
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


// Azure
// Data Ingestion Layer - Azure IoT Hub
CREATE (:IoT {
    // Basic Information
    name: 'IoT Hub',
    csp: 'Multi-Cloud',
    pipeline: 'Connected Vehicle Analytics Platform',
    region: 'Central India',
    tier: 'Standard',
    edition: 'S3',
    noOfHubUnits: 2,

    // Device Configuration
    noOfDevices: 'Unlimited devices',
    noOfMessagesPerDay: 300000000,
    
    // Device Provisioning Service
    noOfOperationsInThousands: 1000,
    
    // Device Update Configuration
    edition: 'Not Supported'
});

// Create Relationship with Cost Details
MATCH 
    (p:Pipelines {
        name: 'Connected Vehicle Analytics Platform', 
        csp: 'Multi-Cloud',
        state: 'start'
    }),
    (i:IoT {
        name: 'IoT Hub',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'Central India'
    })
CREATE (p)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 7140.00,
    
    // Cost Breakdown
    upfront_cost: 0.00,
    deviceProvisioningService_cost: 140,
    hubUnits_cost: 7000,
    
    // Currency
    currency: 'USD'
}]->(i);

// Create Event Hubs
CREATE (:Messaging {
    // Basic Information
    name: 'Event Hubs',
    csp: 'Multi-Cloud',
    pipeline: 'Connected Vehicle Analytics Platform',
    region: 'Central India',
    tier: 'Premium',
    processingUnits: 8,
    extendedRetentionData: 10000,
    extendedRetentionValue: 'GB'
});

// Create Relationship with Cost Details
MATCH 
    (i:IoT {
        name: 'IoT Hub',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'Central India'
    }),
    (m:Messaging {
        name: 'Event Hubs',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'Central India'
    })
CREATE (i)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 9797.92,
    
    // Cost Breakdown
    processingUnitsCost: 8397.92,
    extendedRetentionCost: 1400,
    
    // Currency
    currency: 'USD'
}]->(m);

// Create Stream Analytics
CREATE (:Analytics {
    // Basic Information
    name: 'Stream Analytics',
    csp: 'Multi-Cloud',
    pipeline: 'Connected Vehicle Analytics Platform',
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
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'Central India'
    }),
    (a:Analytics {
        name: 'Stream Analytics',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
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

// Create Cosmos DB
CREATE (:Database {
    // Basic Information
    name: 'Cosmos DB',
    csp: 'Multi-Cloud',
    pipeline: 'Connected Vehicle Analytics Platform',
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
        name: 'Stream Analytics',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'Central India'
    }),
    (d:Database {
        name: 'Cosmos DB',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'Central India'
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
    csp: 'Multi-Cloud',
    pipeline: 'Connected Vehicle Analytics Platform',
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
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'Central India'
    }),
    (s:Storage {
        name: 'Blob Storage',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
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

// Create Synapse Analytics
CREATE (:Analytics {
    // Basic Information
    name: 'Synapse Analytics',
    csp: 'Multi-Cloud',
    pipeline: 'Connected Vehicle Analytics Platform',
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
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'Central India'
    }),
    (a:Analytics {
        name: 'Synapse Analytics',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
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

// GCP
// Create Pub/Sub
CREATE (:Messaging {
    // Basic Information
    name: 'Pub/Sub',
    csp: 'Multi-Cloud',
    pipeline: 'Connected Vehicle Analytics Platform',
    region: 'asia-south1',
    amountOfPublishedDataDaily: '300 GiB',
    messageDeliveryType: 'BigQuery',
    topicRetentionDays: 7,
    numberOfSubscriptions: 10,
    numberOfSubscriptionsWithRetainedAcknowledgedMessages: 3,
    averageRetentionWindowDays: 3,
    numberOfSnapshotsUsedPerMonth: 1,
    averageRetentionWindowDaysRetentionWindowDays: 2
});

// Create Relationship with Cost Details
MATCH 
    (p:Pipelines {
        name: 'Connected Vehicle Analytics Platform', 
        csp: 'Multi-Cloud',
        state: 'start'
    }),
    (m:Messaging {
        name: 'Pub/Sub',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'asia-south1'
    })
CREATE (p)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 6110.28,
    
    // Currency
    currency: 'USD'
}]->(m);

// Create Dataflow
CREATE (:Analytics {
    // Basic Information
    name: 'Dataflow',
    csp: 'Multi-Cloud',
    pipeline: 'Connected Vehicle Analytics Platform',
    region: 'asia-south1',
    jobType: 'streaming',
    numberOfComputeUnits: 200,
    jobHoursPerMonth: 100,
    storageAmount: '10 TiB',
    committedUseDiscountOptions: 'None'
});

// Create Relationship with Cost Details
MATCH 
    (m:Messaging {
        name: 'Pub/Sub',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'asia-south1'
    }),
    (a:Analytics {
        name: 'Dataflow',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'asia-south1'
    })
CREATE (m)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 2206.36,
    
    // Currency
    currency: 'USD'
}]->(a);

// Create BigQuery
CREATE (:Analytics {
    // Basic Information
    name: 'BigQuery',
    csp: 'Multi-Cloud',
    pipeline: 'Connected Vehicle Analytics Platform',
    region: 'asia-south1',
    edition: 'Enterprise',
    maximumSlots: 'Large (400 slots)',
    baselineSlots: 100,
    commitment: 'None',
    averageUtilizationOfAutoscaleSlots: '50%',
    activeLogicalStorage: '5 TiB'
});

// Create Relationship with Cost Details
MATCH 
    (ad:Analytics {
        name: 'Dataflow',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'asia-south1'
    }),
    (ab:Analytics {
        name: 'BigQuery',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'asia-south1'
    })
CREATE (ad)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 12710.03,
    
    // Currency
    currency: 'USD'
}]->(ab);


// Create DataProc
CREATE (:Analytics {
    // Basic Information
    name: 'DataProc',
    csp: 'Multi-Cloud',
    pipeline: 'Connected Vehicle Analytics Platform',
    region: 'asia-south1',
    usageTume: '24 hours per day',
    numberOfVCPUs: 60,
    memeoryPerVCPUs: '64 GiB',
    suffleStoragePerVCPU: '100 GiB',
    clusterUtilization: '100 %'
});

// Create Relationship with Cost Details
MATCH 
    (ab:Analytics {
        name: 'BigQuery',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'asia-south1'
    }),
    (ad:Analytics {
        name: 'DataProc',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'asia-south1'
    })
CREATE (ab)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 42587.91,
    
    // Currency
    currency: 'USD'
}]->(ad);

// Create Cloud Storage
CREATE (:Storage {
    // Basic Information
    name: 'Cloud Storage',
    csp: 'Multi-Cloud',
    pipeline: 'Connected Vehicle Analytics Platform',
    region: 'asia-south1',
    storageClass: 'Standard',
    totalAmountOfStorage: '10 TiB',
    dataTransferWithInGCP: '10 TiB',
    dataTransferSourceRegion: 'Asia',
    dataTransferDestinationRegion: 'Asia'
});

// Create Relationship with Cost Details
MATCH 
    (ad:Analytics {
        name: 'DataProc',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'asia-south1'
    }),
    (sc:Storage {
        name: 'Cloud Storage',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'asia-south1'
    })
CREATE (ad)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 1054.72,
    
    // Currency
    currency: 'USD'
}]->(sc);

// Create End Pipeline Node
CREATE (:Pipelines {
    name: 'Connected Vehicle Analytics Platform',
    csp: 'Multi-Cloud',
    state: 'end'
});

// Create End Node Relationships for Multiple Regions
MATCH 
    (s:Storage {
        name: 'S3',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'ap-south-1'
    }),
    (p:Pipelines {
        name: 'Connected Vehicle Analytics Platform',
        csp: 'Multi-Cloud',
        state: 'end'
    })
CREATE (s)-[:COST_EFFECTIVE_RATIO {
    cost: 0
}]->(p);


MATCH 
    (a:Analytics {
        name: 'Synapse Analytics',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'Central India'
    }),
    (p:Pipelines {
        name: 'Connected Vehicle Analytics Platform',
        csp: 'Multi-Cloud',
        state: 'end'
    })
CREATE (a)-[:COST_EFFECTIVE_RATIO {
    cost: 0
}]->(p);


MATCH 
    (s:Storage {
        name: 'Cloud Storage',
        csp: 'Multi-Cloud',
        pipeline: 'Connected Vehicle Analytics Platform',
        region: 'asia-south1'
    }),
    (p:Pipelines {
        name: 'Connected Vehicle Analytics Platform',
        csp: 'Multi-Cloud',
        state: 'end'
    })
CREATE (s)-[:COST_EFFECTIVE_RATIO {
    cost: 0
}]->(p);
