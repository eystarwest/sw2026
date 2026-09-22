# sw2026 — E-commerce Checkout API

Morning class, AI driven API testing

## Description

REST API built with Node.js and Express for a simple e-commerce flow: user
registration, login (JWT), and checkout. Everything runs in memory — there is
no database. Data resets whenever the server restarts.

## Installation

Requirements: Node.js 18+ and npm.

```bash
npm install
```

## How to Run

```bash
npm start
```

The server starts on `http://localhost:3000` by default (override with the
`PORT` environment variable). Swagger docs are served at
`http://localhost:3000/api-docs`.

## Rules

- Checkout accepts only two payment methods: `cash` or `credit_card`.
- Paying with `cash` gives a 10% discount on the order subtotal.
- Checkout requires authentication — a valid JWT must be sent in the
  `Authorization: Bearer <token>` header.

## Existent Data

### Seed Users

All seed users share the password `Passw0rd!`.

| id | name | email |
|----|------|-------|
| 1 | Alice Johnson | alice@example.com |
| 2 | Bob Smith | bob@example.com |
| 3 | Carol Davis | carol@example.com |

### Seed Products

| id | name | price |
|----|------|-------|
| 1 | Wireless Mouse | 25.00 |
| 2 | Mechanical Keyboard | 75.00 |
| 3 | USB-C Hub | 40.00 |

New users registered via `/api/auth/register` and are added to the in-memory
store for the lifetime of the process.

## How to Use the REST API

Base URL: `http://localhost:3000/api`

### Health check

```
GET /healthcheck
```

### Register

```
POST /auth/register
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "Passw0rd!"
}
```

### Login

```
POST /auth/login
Content-Type: application/json

{
  "email": "alice@example.com",
  "password": "Passw0rd!"
}
```

Response:

```json
{ "token": "<JWT>" }
```

### Checkout (requires JWT)

```
POST /checkout
Authorization: Bearer <JWT>
Content-Type: application/json

{
  "paymentMethod": "cash",
  "items": [
    { "productId": 1, "quantity": 2 },
    { "productId": 3, "quantity": 1 }
  ]
}
```

Response:

```json
{
  "paymentMethod": "cash",
  "items": [
    { "productId": 1, "name": "Wireless Mouse", "unitPrice": 25, "quantity": 2, "subtotal": 50 },
    { "productId": 3, "name": "USB-C Hub", "unitPrice": 40, "quantity": 1, "subtotal": 40 }
  ],
  "subtotal": 90,
  "discount": 9,
  "total": 81
}
```

### API Documentation

Full OpenAPI spec: [`swagger.yaml`](./swagger.yaml), rendered at
`GET /api-docs` when the server is running.

## Project Structure

```
src/
  config/       # environment/config values
  controllers/  # request/response handling
  middleware/   # auth guard, error handling
  models/       # in-memory user & product data
  routes/       # route -> controller wiring
  services/     # business logic
  app.js
  server.js
swagger.yaml
```
