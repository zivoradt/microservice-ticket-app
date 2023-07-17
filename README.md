# Microservice Ticket App
This repository contains the source code for a microservice-based ticket application. The application is currently 70% finished and consists of multiple services that work together to manage and handle ticket-related operations. Each service is containerized using Docker and can be deployed using Kubernetes.

# Prerequisites
Before deploying the application, make sure you have the following dependencies installed:

• Docker<br>
• Kubernetes<br>
• Skaffold<br>
• Deployment<br>

To deploy the microservice ticket application, follow these steps:

# Clone the repository:

git clone https://github.com/zivoradt/microservice-ticket-app.git
cd microservice-ticket-app

Update the Skaffold configuration:

Open the skaffold.yaml file and verify/update the following settings:

• image: Set the desired Docker image name for each service.<br>
• context: Update the context path for each service to the corresponding service folder.<br>
• dockerfile: Verify that the Dockerfile name is correct for each service.<br>

# Deploy the application:

Run the following command to deploy the application using Skaffold:

skaffold run

Skaffold will build the Docker images for each service and deploy them to your Kubernetes cluster using the manifests located in the infra/k8s directory.

Access the application:

Once the deployment is complete, you can access the microservice ticket application using the appropriate endpoints. Refer to the documentation of each service for details on how to interact with it.

# Development
If you want to make changes or contribute to the microservice ticket application, follow these guidelines:

Clone the repository:


git clone https://github.com/zivoradt/microservice-ticket-app.git
cd microservice-ticket-app

Make the necessary changes to the source code of the services according to your requirements.

Finally, create a pull request from your branch to the main repository branch. Provide a descriptive title and detailed information about your changes.

License
This microservice ticket application is licensed under the MIT License. Feel free to modify, distribute, and use it according to your needs.
