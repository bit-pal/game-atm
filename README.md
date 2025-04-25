# ATM Service API

## Project Overview

**Project Name**: ATM Service API

**Description**: This project provides an API to manage basic ATM operations such as withdrawals, deposits, balance checks, transfers, and transaction history for players. Built with Express.js and PostgreSQL.

**Key Features**:
- Withdraw funds
- Deposit funds
- Transfer between players
- Check balance
- View transaction history

**Technologies Used**:
- Node.js
- Express.js
- PostgreSQL

## Getting Started

### Prerequisites

- Node.js (version 20.9.X)
- npm or yarn
- PostgreSQL instance

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/atm-service.git
   cd atm-service
   ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Environment Setup:**
    - Create .env file from template:
        ```bash
        cp .env.example .env
        ```
    - Update .env with your PostgreSQL credentials.

4. **Initialize Database:**
    - Run migrations to set up tables.

### Running the Project
- Development Mode:
    ```bash
    npm run dev
    ```
- Production Mode:
    ```bash
    npm start
    ```

### Testing
- Run Tests:
    ```bash
    npm run test
    ```

## API Documentation

**Base URL:** `http://localhost:3000/api/atm`

**Endpoints**

1. **Withdraw Money**
    - `POST /withdraw/:playerId`
    - **Description**: Withdraw funds for the specified player.
    - **Headers**: `Authorization: Bearer {token}`
    - **Body**:
        ```bash
        {
            "amount": 100
        }
        ```
    - **Responsees**
        - `200 OK`: Withdrawal successful
        - `400 Bad Request`: Player not found or insufficient balance

2. **Deposit Money**
    - `POST /deposit/:playerId`
    - **Description**: Deposit funds for the specified player.
    - **Headers**: `Authorization: Bearer {token}`
    - **Body**:
        ```bash
        {
            "amount": 100
        }
        ```
    - **Responsees**
        - `200 OK`: Deposit successful
        - `400 Bad Request`: Player not found or invalid amount

3. **Transfer Money**
    - `POST /transfer/:fromPlayerId/:toPlayerId`
    - **Description**: Transfer funds between two players.
    - **Headers**: `Authorization: Bearer {token}`
    - **Body**:
        ```bash
        {
            "amount": 50
        }
        ```
    - **Responsees**
        - `200 OK`: Transfer successful
        - `400 Bad Request`: Player not found or insufficient balance

4. **Check Balance**
    - `GET /balance/:playerId`
    - **Description**: Get the current balance of the specified player.
    - **Headers**: `Authorization: Bearer {token}`
    - **Responsees**
        - `200 OK`: Returns the balance
        - `400 Bad Request`: Player not found

5. **Transaction History**
    - `GET /history/:playerId`
    - **Description**: Get the transaction history of the specified player.
    - **Headers**: `Authorization: Bearer {token}`
    - **Responsees**
        - `200 OK`: Returns transaction history
        - `400 Bad Request`: Player not found

**Authentication**
All endpoints require authentication using a Bearer token passed in the `Authorization` header

## Code Architecture

- **Entry Point:** The codebase is initiated from the src/app.ts file which sets up the express application and routes.
- **Controllers:** Located in `/src/controllers`, these handle HTTP requests and responses.
- **Services:** Business logic is defined in `/src/services`.
- **Middlewares:** Includes authentication and other middlewares, located in `/src/middlewares`.
- **Utilities:** Utility functions, such as database connection handlers, are in `/src/utils`.
- **Models:** Data models that define the structure of entities such as `Player` and `Transaction`.

### Database Schema
1. **Players Table**:
    - Columns: `id`, `name`, `balance`
2. **Transactions Table**:
    - Columns: `id`, `player_id`, `type`, `amount`, `target_player_id`, `date`

### Contribution Guidelines

- Ensure code adheres to the prevailing style guide enforced by ESLint and Prettier.
- Write unit tests for new features.
- Submit all changes via pull requests with clear descriptions.

### Support 
For issues, please open an issue on GitHub.
This layout provides a comprehensive structure to guide users effectively through setup, usage, and contribution processes for your project. Adjust the details, especially URLs and repository links, to fit your real project setup.