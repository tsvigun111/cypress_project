# Cypress Test Project

This project is designed for automated testing using **Cypress** for frontend testing and **k6** for load testing.
It includes performance audits using **Lighthouse** and accessibility testing using **Pa11y**.

---

## Technologies Used

The project uses the following technologies and dependencies:

- **Cypress**: For end-to-end (E2E) frontend testing.
- **k6**: For load testing backend APIs.
- **Lighthouse**: Integrated via `@cypress-audit/lighthouse` for performance audits.
- **Pa11y**: Integrated via `@cypress-audit/pa11y` for accessibility testing.
- **Mochawesome**: For generating detailed test reports.
- **ESLint**: For code linting and maintaining code quality.

### Key Dependencies

- `@cypress-audit/lighthouse`
- `@cypress-audit/pa11y`
- `cypress-audit`
- `mochawesome`
- `k6`
- `eslint`
- `ws` (WebSocket library for testing WebSocket connections)

---

## How to Run Tests

### Prerequisites

1. **Node.js**: Ensure Node.js is installed on your system.
2. **Git**: Ensure Git is installed to clone the repository.

---

## Setup Instructions

### Step 1: Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Arsenmelnyk1/cypress_test_project.git
cd cypress_test_project
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run Tests

```bash
"npm run e2e:test" - Runs Cypress E2E tests in Chrome.
"npm run load:test" - Runs k6 load tests.
```

All Cypress tests and generate reports in the cypress/reports folder.
The load test script located in cypress/e2e/load.js.

## Rabic RabbitMQ API

### Instruction how to run using Postman:

1. Install Erlang.
2. Install RabbitMQ server.
3. Launch RabbitMQ CLI.
4. Run command:

```bash
rabbitmq-plugins.bat enable rabbitmq_management.
```

5. Open Postman.
6. Import `rabbitMQAPI.postman_collection` the collection and run.
