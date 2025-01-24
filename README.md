# Cloud Cost Optimizer


![CCO](https://github.com/user-attachments/assets/f5281be9-94f3-4d3d-99b4-cf2e2d45deae)


# Graph-Based Cloud Cost Optimization

## Introduction

Cloud computing has revolutionized how we deploy and manage applications, but with this flexibility comes the challenge of managing costs effectively. In this post, I'll explore an innovative approach to cloud cost optimization using graph theory and mathematical modeling. We'll look at how representing cloud resources as a graph can help make smarter decisions about resource allocation and cost management.

## Core Concepts

### What Are We Trying to Solve?

The primary challenges in cloud cost optimization include:
- Balancing resource utilization and costs
- Managing data transfer costs between regions
- Optimizing storage and compute resource placement
- Handling dynamic workload requirements
- Dealing with multi-cloud environments

## Technical Implementation

### 1. Graph-Based Resource Modeling

![GRM](https://github.com/user-attachments/assets/24d41a9c-0d6f-4317-a208-fc9008b24a24)

### 2. Cost Modeling Framework

![CRC](https://github.com/user-attachments/assets/7d9cfc29-6b4a-4684-a22b-266ceab3ff82)

-----------

![QOS](https://github.com/user-attachments/assets/271e6916-ee92-4200-aed0-3cc1abfbe2d5)

-----------

![ECF](https://github.com/user-attachments/assets/9209c30c-bfe8-48bc-9a54-50b3853ab9c1)

-----------

### 3. Optimization Techniques

#### A. Shortest Path Algorithm

![DJK](https://github.com/user-attachments/assets/27200c1f-e047-4edc-9a00-bb4139ad2d13)

#### B. Multi-Cloud Optimization

![MCO](https://github.com/user-attachments/assets/17670777-a27b-4885-83cd-97df69252a9b)

## Conclusion

Graph-based cloud cost optimization provides a powerful framework for managing cloud costs effectively. By combining graph theory with advanced optimization techniques, we can make better decisions about resource allocation and cost management.

# Setup

This project consists of a Spring Boot backend, a frontend, and a Neo4j database. Follow the steps below to build, set up, and run the application.

## Prerequisites

Ensure you have the following installed:
- **Java** (Version - 21)
- **Maven** (Version - 3.9.9)
- **Docker** (Version - 27.4.0)
- **Docker Compose** (Version - 2.31.0)

---

## Steps to Set Up the Application

### 1. Build the Backend

Navigate to the backend folder:

```bash
cd cloud-cost-optimizer-backend
```

Build the Spring Boot project using Maven:

```bash
mvn clean install
```

Build the Docker image for the backend:

```bash
docker build -t backend -f Dockerfile.backend .
```

---

### 2. Build the Frontend

Navigate to the frontend folder:

```bash
cd cloud-cost-optimizer-frontend
```

Build the Docker image for the frontend:

```bash
docker build -t frontend -f Dockerfile.frontend .
```

---

### 3. Deploy the Application

Navigate to the base folder:

```bash
cd ..
```

Run the following commands to start the services:

1. Start the Neo4j database:

   ```bash
   docker-compose up -d neo4j
   ```

2. Start the backend service:

   ```bash
   docker-compose up -d backend
   ```

3. Start the frontend service:

   ```bash
   docker-compose up -d frontend
   ```

---

### 4. Configure the Database

Once Neo4j is up, access the Neo4j browser at:

[http://localhost:7474/browser/](http://localhost:7474/browser/)

- Log in using the default credentials.
- Change the password if prompted.
- Load the Cypher scripts available at the base folder:

  ```cypher
  :source iot-based-manufacturing-platform.cql

---

### 5. Access the Application

Once all services are running, access the application in your browser at:

[http://localhost:3000](http://localhost:3000)

---

## Troubleshooting

- Check logs for any errors using `docker logs <container_name>`.
- Ensure all required ports are available and not in use by other services.
- Verify that Docker Compose is installed and correctly configured.

---

Enjoy using the **Cloud Cost Optimizer**!
