# DevOps Task 1 — Automate Code Deployment Using CI/CD Pipeline

## 1. Project Overview

This project demonstrates a basic CI/CD pipeline for a Node.js web application using GitHub Actions, Docker, and Docker Hub.

The pipeline automatically:

1. Gets the source code from GitHub.
2. Sets up Node.js.
3. Installs dependencies.
4. Runs the application test.
5. Logs in to Docker Hub securely.
6. Builds a Docker image.
7. Pushes the Docker image to Docker Hub.

The workflow is triggered whenever code is pushed to the `main` branch.

### CI/CD Flow

```text
Developer
    |
    | git push
    v
GitHub Repository
    |
    v
GitHub Actions
    |
    +----> Checkout Code
    |
    +----> Setup Node.js
    |
    +----> Install Dependencies
    |
    +----> Run Tests
    |
    +----> Login to Docker Hub
    |
    +----> Build Docker Image
    |
    +----> Push Docker Image
    |
    v
Docker Hub
b711/devops-task1:latest
```

---

# 2. Technologies Used

* Node.js
* Git
* GitHub
* GitHub Actions
* Docker
* Docker Hub
* Ubuntu Linux runner

---

# 3. Application

The application is a simple Node.js web server.

It runs on:

```text
Port: 3000
```

The web page displays a DevOps CI/CD pipeline dashboard showing:

```text
GitHub → GitHub Actions → Docker → Docker Hub
```

The application source code is stored in:

```text
index.js
```

---

# 4. Project Structure

```text
devops-task1/
│
├── .github/
│   └── workflows/
│       └── main.yaml
│
├── Dockerfile
├── index.js
├── package.json
└── README.md
```

---

# 5. Step 1 — Create the Node.js Project

The project was initialized using:

```bash
npm init -y
```

This created the `package.json` file.

The project uses Node.js and CommonJS modules.

The application can be started locally using:

```bash
node index.js
```

The server starts on port `3000`.

---

# 6. Step 2 — Configure the Node.js Test

The default npm test command was replaced with:

```json
"scripts": {
  "test": "node --check index.js"
}
```

This performs a JavaScript syntax check on `index.js`.

The test was verified locally using:

```bash
npm test
```

A successful result means there are no JavaScript syntax errors in the application.

---

# 7. Step 3 — Create the Dockerfile

A Dockerfile was created to package the Node.js application into a container.

```dockerfile
FROM node:24-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "index.js"]
```

## Dockerfile Explanation

### `FROM node:24-alpine`

Uses Node.js 24 with Alpine Linux as the base image.

Alpine provides a lightweight Linux base image.

### `WORKDIR /app`

Sets `/app` as the working directory inside the container.

### `COPY . .`

Copies the project files from the build context into the `/app` directory inside the Docker image.

### `RUN npm install`

Installs the Node.js dependencies required by the application.

### `EXPOSE 3000`

Documents that the application uses port `3000`.

### `CMD ["node", "index.js"]`

Starts the Node.js application when the container runs.

---

# 8. Step 4 — Test Docker Locally

Before creating the CI/CD pipeline, the Docker image was tested locally.

The Docker image was built using:

```bash
docker build -t devops-task1:latest .
```

The container was started using:

```bash
docker run -d --name devops-app -p 3000:3000 devops-task1:latest
```

The running container was checked using:

```bash
docker ps
```

Application logs were checked using:

```bash
docker logs devops-app
```

The application returned:

```text
Server running on port 3000
```

The application was also tested from inside the Docker environment using:

```bash
curl http://localhost:3000
```

The HTML response confirmed that the application was working successfully inside the container.

---

# 9. Step 5 — Create the GitHub Repository

A GitHub repository was created:

```text
devops-task1
```

The local project was connected to the GitHub repository using Git.

The project was committed and pushed to the `main` branch.

---

# 10. Step 6 — Create the Docker Hub Repository

A public Docker Hub repository was created:

```text
b711/devops-task1
```

The Docker image produced by the CI/CD pipeline is pushed to this repository.

The final image tag is:

```text
b711/devops-task1:latest
```

---

# 11. Step 7 — Create Docker Hub Access Token

A Docker Hub Personal Access Token was created for GitHub Actions.

The token was given repository read and write permission because GitHub Actions needs permission to push the Docker image.

The token was not placed directly in the workflow file.

---

# 12. Step 8 — Configure GitHub Secrets

Two GitHub repository secrets were created:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
```

### `DOCKERHUB_USERNAME`

Contains the Docker Hub username:

```text
b711
```

### `DOCKERHUB_TOKEN`

Contains the Docker Hub Personal Access Token.

The token is stored as an encrypted GitHub Secret instead of being written directly into the workflow.

This helps prevent sensitive credentials from being exposed in the source code.

---

# 13. Step 9 — Create the GitHub Actions Workflow

The workflow file was created at:

```text
.github/workflows/main.yaml
```

The workflow is triggered when code is pushed to the `main` branch.

The workflow performs the following operations:

```text
Checkout
    ↓
Setup Node.js
    ↓
Install Dependencies
    ↓
Run Tests
    ↓
Login to Docker Hub
    ↓
Build Docker Image
    ↓
Push Image
```

---

# 14. GitHub Actions Workflow

The workflow contains the following configuration:

```yaml
name: DevOps CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 24

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: b711/devops-task1:latest
```

---

# 15. Workflow Explanation

## Trigger

```yaml
on:
  push:
    branches:
      - main
```

This means the workflow starts whenever code is pushed to the `main` branch.

---

## Runner

```yaml
runs-on: ubuntu-latest
```

GitHub provides a temporary Ubuntu virtual machine called a runner to execute the workflow.

---

## Checkout Code

```yaml
uses: actions/checkout@v4
```

This downloads the repository source code onto the GitHub Actions runner.

---

## Setup Node.js

```yaml
uses: actions/setup-node@v4
with:
  node-version: 24
```

This configures Node.js 24 on the GitHub Actions runner.

---

## Install Dependencies

```yaml
run: npm install
```

This installs the dependencies specified in `package.json`.

---

## Run Tests

```yaml
run: npm test
```

This executes:

```text
node --check index.js
```

If the test fails, the workflow stops and the Docker image is not pushed.

---

## Docker Hub Login

```yaml
uses: docker/login-action@v3
```

The action authenticates with Docker Hub using:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
```

The credentials are retrieved from GitHub Secrets.

---

## Build and Push Docker Image

```yaml
uses: docker/build-push-action@v6
```

This builds the Docker image using the Dockerfile in the repository.

```yaml
context: .
```

means the current repository directory is used as the Docker build context.

```yaml
push: true
```

means the resulting image is pushed to Docker Hub.

```yaml
tags: b711/devops-task1:latest
```

assigns the Docker Hub image name and tag.

---

# 16. Complete CI/CD Process

After everything was configured, the following process became automated:

```text
1. Developer pushes code
           ↓
2. GitHub receives the push
           ↓
3. GitHub Actions workflow starts
           ↓
4. Ubuntu runner is created
           ↓
5. Repository code is checked out
           ↓
6. Node.js 24 is configured
           ↓
7. npm install runs
           ↓
8. npm test runs
           ↓
9. Docker Hub authentication
           ↓
10. Docker image is built
           ↓
11. Docker image is pushed
           ↓
12. Image becomes available on Docker Hub
```

---

# 17. Pipeline Verification

The workflow was tested by pushing the project to the `main` branch.

GitHub Actions completed the workflow successfully.

The successful workflow included:

```text
DevOps CI/CD Pipeline
Status: Successful
```

The Docker Hub repository also confirmed that the image was successfully pushed.

Docker Hub contains:

```text
b711/devops-task1:latest
```

The repository showed one available tag:

```text
latest
```

This confirmed that the complete automated pipeline was working.

---

# 18. Useful Local Commands

## Run the application

```bash
node index.js
```

## Run the test

```bash
npm test
```

## Build the Docker image

```bash
docker build -t devops-task1:latest .
```

## Run the Docker container

```bash
docker run -d --name devops-app -p 3000:3000 devops-task1:latest
```

## Check running containers

```bash
docker ps
```

## View container logs

```bash
docker logs devops-app
```

## Test the application

```bash
curl http://localhost:3000
```

---

# 19. Key DevOps Concepts Demonstrated

This project demonstrates the following concepts:

* Version control using Git and GitHub
* Continuous Integration
* Continuous Delivery
* GitHub Actions workflows
* GitHub Actions runners
* Jobs and steps
* Automated testing
* Docker image creation
* Docker containers
* Docker Hub image registry
* GitHub encrypted secrets
* Automated Docker image publishing
* Triggering CI/CD from Git pushes

---

# 20. Conclusion

This project demonstrates how a Node.js application can be connected to a basic automated CI/CD pipeline.

Whenever code is pushed to the `main` branch, GitHub Actions automatically checks the code, runs the test, builds the Docker image, authenticates with Docker Hub, and pushes the image to the Docker Hub repository.

Final Docker image:

```text
b711/devops-task1:latest
```

The successful GitHub Actions run and Docker Hub `latest` tag confirm that the CI/CD pipeline was implemented and tested successfully.
