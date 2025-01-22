# Cloud Cost Optimizer

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

### 4. Access the Application

Once all services are running, access the application in your browser at:

[http://localhost:3000](http://localhost:3000)

---

## Troubleshooting

- Check logs for any errors using `docker logs <container_name>`.
- Ensure all required ports are available and not in use by other services.
- Verify that Docker Compose is installed and correctly configured.

---

Enjoy using the **Cloud Cost Optimizer**!
