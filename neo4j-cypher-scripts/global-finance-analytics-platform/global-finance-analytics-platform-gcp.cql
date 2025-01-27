// Create Pipeline
CREATE (:Pipelines {name: 'Global Finance Analytics Platform', csp: 'GCP', state: 'start'});

// Data Ingestion Layer - Pub/Sub
CREATE (:Messaging {
    // Basic Information
    name: 'Pub/Sub',
    csp: 'GCP',
    pipeline: 'Global Finance Analytics Platform',
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
        name: 'Global Finance Analytics Platform', 
        csp: 'GCP',
        state: 'start'
    }),
    (m:Messaging {
        name: 'Pub/Sub',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'asia-south1'
    })
CREATE (p)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 6110.28,
    
    // Currency
    currency: 'USD'
}]->(m);


CREATE (:Messaging {
    // Basic Information
    name: 'Pub/Sub',
    csp: 'GCP',
    pipeline: 'Global Finance Analytics Platform',
    region: 'us-east4',
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
        name: 'Global Finance Analytics Platform', 
        csp: 'GCP',
        state: 'start'
    }),
    (m:Messaging {
        name: 'Pub/Sub',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'us-east4'
    })
CREATE (p)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 6110.28,
    
    // Currency
    currency: 'USD'
}]->(m);


CREATE (:Messaging {
    // Basic Information
    name: 'Pub/Sub',
    csp: 'GCP',
    pipeline: 'Global Finance Analytics Platform',
    region: 'europe-west2',
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
        name: 'Global Finance Analytics Platform', 
        csp: 'GCP',
        state: 'start'
    }),
    (m:Messaging {
        name: 'Pub/Sub',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'europe-west2'
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
    csp: 'GCP',
    pipeline: 'Global Finance Analytics Platform',
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
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'asia-south1'
    }),
    (a:Analytics {
        name: 'Dataflow',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'asia-south1'
    })
CREATE (m)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 2206.36,
    
    // Currency
    currency: 'USD'
}]->(a);


// Create Dataflow
CREATE (:Analytics {
    // Basic Information
    name: 'Dataflow',
    csp: 'GCP',
    pipeline: 'Global Finance Analytics Platform',
    region: 'us-east4',
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
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'us-east4'
    }),
    (a:Analytics {
        name: 'Dataflow',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'us-east4'
    })
CREATE (m)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 1804.83,
    
    // Currency
    currency: 'USD'
}]->(a);


// Create Dataflow
CREATE (:Analytics {
    // Basic Information
    name: 'Dataflow',
    csp: 'GCP',
    pipeline: 'Global Finance Analytics Platform',
    region: 'europe-west2',
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
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'europe-west2'
    }),
    (a:Analytics {
        name: 'Dataflow',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'europe-west2'
    })
CREATE (m)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 1946.36,
    
    // Currency
    currency: 'USD'
}]->(a);

// Create BigQuery
CREATE (:Analytics {
    // Basic Information
    name: 'BigQuery',
    csp: 'GCP',
    pipeline: 'Global Finance Analytics Platform',
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
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'asia-south1'
    }),
    (ab:Analytics {
        name: 'BigQuery',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'asia-south1'
    })
CREATE (ad)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 12710.03,
    
    // Currency
    currency: 'USD'
}]->(ab);



// Create BigQuery
CREATE (:Analytics {
    // Basic Information
    name: 'BigQuery',
    csp: 'GCP',
    pipeline: 'Global Finance Analytics Platform',
    region: 'us-east4',
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
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'us-east4'
    }),
    (ab:Analytics {
        name: 'BigQuery',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'us-east4'
    })
CREATE (ad)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 11067.53,
    
    // Currency
    currency: 'USD'
}]->(ab);

// Create BigQuery
CREATE (:Analytics {
    // Basic Information
    name: 'BigQuery',
    csp: 'GCP',
    pipeline: 'Global Finance Analytics Platform',
    region: 'europe-west2',
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
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'europe-west2'
    }),
    (ab:Analytics {
        name: 'BigQuery',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'europe-west2'
    })
CREATE (ad)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 14352.53,
    
    // Currency
    currency: 'USD'
}]->(ab);


// Create DataProc
CREATE (:Analytics {
    // Basic Information
    name: 'DataProc',
    csp: 'GCP',
    pipeline: 'Global Finance Analytics Platform',
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
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'asia-south1'
    }),
    (ad:Analytics {
        name: 'DataProc',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'asia-south1'
    })
CREATE (ab)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 42587.91,
    
    // Currency
    currency: 'USD'
}]->(ad);


// Create DataProc
CREATE (:Analytics {
    // Basic Information
    name: 'DataProc',
    csp: 'GCP',
    pipeline: 'Global Finance Analytics Platform',
    region: 'us-east4',
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
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'us-east4'
    }),
    (ad:Analytics {
        name: 'DataProc',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'us-east4'
    })
CREATE (ab)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 39923.36,
    
    // Currency
    currency: 'USD'
}]->(ad);

// Create DataProc
CREATE (:Analytics {
    // Basic Information
    name: 'DataProc',
    csp: 'GCP',
    pipeline: 'Global Finance Analytics Platform',
    region: 'europe-west2',
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
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'europe-west2'
    }),
    (ad:Analytics {
        name: 'DataProc',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'europe-west2'
    })
CREATE (ab)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 45661.02,
    
    // Currency
    currency: 'USD'
}]->(ad);


// Create Firestore
CREATE (:Storage {
    // Basic Information
    name: 'Firestore',
    csp: 'GCP',
    pipeline: 'Global Finance Analytics Platform',
    region: 'asia-south1',
    documentsReadsPerDay: 20000000,
    documentsWritesPerDay: 30000000,
    documentsDeletesPerDay: 19999960,
    totalStoredDataPerDay: '500 GiB'
});

// Create Relationship with Cost Details
MATCH 
    (a:Analytics {
        name: 'DataProc',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'asia-south1'
    }),
    (s:Storage {
        name: 'Firestore',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'asia-south1'
    })
CREATE (a)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 1285.57,
    
    // Currency
    currency: 'USD'
}]->(s);


// Create Firestore
CREATE (:Storage {
    // Basic Information
    name: 'Firestore',
    csp: 'GCP',
    pipeline: 'Global Finance Analytics Platform',
    region: 'us-east4',
    documentsReadsPerDay: 20000000,
    documentsWritesPerDay: 30000000,
    documentsDeletesPerDay: 19999960,
    totalStoredDataPerDay: '500 GiB'
});

// Create Relationship with Cost Details
MATCH 
    (a:Analytics {
        name: 'DataProc',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'us-east4'
    }),
    (s:Storage {
        name: 'Firestore',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'us-east4'
    })
CREATE (a)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 1219.27,
    
    // Currency
    currency: 'USD'
}]->(s);

// Create Firestore
CREATE (:Storage {
    // Basic Information
    name: 'Firestore',
    csp: 'GCP',
    pipeline: 'Global Finance Analytics Platform',
    region: 'europe-west2',
    documentsReadsPerDay: 20000000,
    documentsWritesPerDay: 30000000,
    documentsDeletesPerDay: 19999960,
    totalStoredDataPerDay: '500 GiB'
});

// Create Relationship with Cost Details
MATCH 
    (a:Analytics {
        name: 'DataProc',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'europe-west2'
    }),
    (s:Storage {
        name: 'Firestore',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'europe-west2'
    })
CREATE (a)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 1440.96,
    
    // Currency
    currency: 'USD'
}]->(s);


// Create Cloud Storage
CREATE (:Storage {
    // Basic Information
    name: 'Cloud Storage',
    csp: 'GCP',
    pipeline: 'Global Finance Analytics Platform',
    region: 'asia-south1',
    storageClass: 'Standard',
    totalAmountOfStorage: '10 TiB',
    dataTransferWithInGCP: '10 TiB',
    dataTransferSourceRegion: 'Asia',
    dataTransferDestinationRegion: 'Asia'
});

// Create Relationship with Cost Details
MATCH 
    (sf:Storage {
        name: 'Firestore',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'asia-south1'
    }),
    (sc:Storage {
        name: 'Cloud Storage',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'asia-south1'
    })
CREATE (sf)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 1054.72,
    
    // Currency
    currency: 'USD'
}]->(sc);


// Create Cloud Storage
CREATE (:Storage {
    // Basic Information
    name: 'Cloud Storage',
    csp: 'GCP',
    pipeline: 'Global Finance Analytics Platform',
    region: 'us-east4',
    storageClass: 'Standard',
    totalAmountOfStorage: '10 TiB',
    dataTransferWithInGCP: '10 TiB',
    dataTransferSourceRegion: 'Asia',
    dataTransferDestinationRegion: 'Asia'
});

// Create Relationship with Cost Details
MATCH 
    (sf:Storage {
        name: 'Firestore',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'us-east4'
    }),
    (sc:Storage {
        name: 'Cloud Storage',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'us-east4'
    })
CREATE (sf)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 1054.72,
    
    // Currency
    currency: 'USD'
}]->(sc);

// Create Cloud Storage
CREATE (:Storage {
    // Basic Information
    name: 'Cloud Storage',
    csp: 'GCP',
    pipeline: 'Global Finance Analytics Platform',
    region: 'europe-west2',
    storageClass: 'Standard',
    totalAmountOfStorage: '10 TiB',
    dataTransferWithInGCP: '10 TiB',
    dataTransferSourceRegion: 'Asia',
    dataTransferDestinationRegion: 'Asia'
});

// Create Relationship with Cost Details
MATCH 
    (sf:Storage {
        name: 'Firestore',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'europe-west2'
    }),
    (sc:Storage {
        name: 'Cloud Storage',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: 'europe-west2'
    })
CREATE (sf)-[:COST_EFFECTIVE_RATIO {
    // Total Cost
    cost: 1054.72,
    
    // Currency
    currency: 'USD'
}]->(sc);


// Create End Pipeline Node
CREATE (:Pipelines {
    name: 'Global Finance Analytics Platform',
    csp: 'GCP',
    state: 'end'
});

// Create End Node Relationships for Multiple Regions
WITH ['asia-south1', 'us-east4', 'europe-west2'] as regions
UNWIND regions as region
MATCH 
    (s:Storage {
        name: 'Cloud Storage',
        csp: 'GCP',
        pipeline: 'Global Finance Analytics Platform',
        region: region
    }),
    (p:Pipelines {
        name: 'Global Finance Analytics Platform',
        csp: 'GCP',
        state: 'end'
    })
CREATE (s)-[:COST_EFFECTIVE_RATIO {
    cost: 0
}]->(p);
