# 📈 Stock Platform

> A full-stack stock trading simulation platform inspired by modern brokerage applications, built with React, Node.js, Express, MongoDB, JWT Authentication, and cloud deployment.

<p align="center">

<a href="https://stock-platform-beige-six.vercel.app">
<img src="https://img.shields.io/badge/🌐%20Live%20Website-Visit%20Now-00C853?style=for-the-badge" alt="Live Website"/>
</a>

</p>

<p align="center">

<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
<img src="https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
<img src="https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express" alt="Express"/>
<img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
<img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge" alt="JWT"/>
<img src="https://img.shields.io/badge/Vercel-Deployment-000000?style=for-the-badge&logo=vercel" alt="Vercel"/>
<img src="https://img.shields.io/badge/Render-Backend-46E3B7?style=for-the-badge&logo=render&logoColor=black" alt="Render"/>

</p>

---

## 🌐 Live Demo

### 🚀 Live Website

👉 https://stock-platform-beige-six.vercel.app

---

## 📌 Overview

**Stock Platform** is a full-stack stock trading simulation web application designed to demonstrate how a modern brokerage platform can be built from the ground up.

The application provides a complete flow from user authentication to portfolio management and simulated trading.

Users can:

- 🔐 Create an account
- 🔑 Log in securely
- 📊 View their trading dashboard
- 👀 Monitor stocks through a watchlist
- 💰 View available funds
- 🛒 Place BUY and SELL orders
- 📦 Track holdings
- 📈 Track positions
- 🧾 View order history
- 📑 View portfolio reports

The project uses **MongoDB Atlas** as the cloud database and is deployed using **Vercel** and **Render**.

> ⚠️ This is an educational stock trading simulation. It does not execute real stock-market trades and does not use live exchange prices.

---

# ✨ Features

## 🔐 User Authentication

The platform provides a complete authentication system.

### Features

- User signup
- User login
- JWT-based authentication
- Protected API routes
- User-specific data
- Secure authorization headers
- Automatic redirect from authentication to dashboard

### Authentication Flow

    Signup / Login
          │
          ▼
    Backend validates
       credentials
          │
          ▼
       JWT Token
          │
          ▼
       Dashboard
          │
          ▼
    Protected API Requests

---

# 📊 Trading Dashboard

The dashboard provides a brokerage-style interface for managing a simulated investment portfolio.

### Dashboard Sections

- 📈 Summary
- 👀 Watchlist
- 💰 Funds
- 📦 Holdings
- 📊 Positions
- 🧾 Orders
- 📑 Reports

The dashboard is connected to the backend through REST APIs and displays user-specific portfolio information.

---

# 👀 Watchlist

The watchlist allows users to monitor selected stocks.

Each stock displays information such as:

- Stock symbol
- Current price
- Percentage movement
- Positive/negative movement

Example stocks included in the simulated market data:

- INFY
- TCS
- ONGC
- WIPRO
- RELIANCE
- HUL
- M&M
- KPITTECH
- QUICKHEAL

> Market prices are simulated/static data for demonstration purposes.

---

# 🛒 BUY & SELL System

One of the main features of the application is the simulated trading system.

## BUY Order

When a user places a BUY order:

    BUY
     │
     ▼
    Validate Order
     │
     ▼
    Check Available Funds
     │
     ▼
    Create Order
     │
     ▼
    Deduct Balance
     │
     ▼
    Update Holdings
     │
     ▼
    Update Positions

## SELL Order

When a user places a SELL order:

    SELL
     │
     ▼
    Validate Order
     │
     ▼
    Check Existing Holdings
     │
     ▼
    Validate Quantity
     │
     ▼
    Create Order
     │
     ▼
    Add Balance
     │
     ▼
    Update Holdings
     │
     ▼
    Update Positions

### Backend Validation

The backend validates:

- Order quantity
- Order price
- Order mode
- Available funds
- Existing holdings
- Sell quantity

This prevents invalid transactions from being processed.

---

# 💰 Funds Management

Every user has an individual funds balance stored in MongoDB.

The system automatically updates the balance when orders are placed.

### BUY

    Available Balance
            -
       Order Value
            =
      Updated Balance

### SELL

    Available Balance
            +
       Order Value
            =
      Updated Balance

---

# 📦 Holdings

The Holdings section tracks stocks owned by the user.

It includes information such as:

- Instrument
- Quantity
- Average cost
- Current price
- Current value
- Profit/Loss
- Net change
- Day change

Holdings are stored per user, so different users have separate portfolios.

---

# 📊 Positions

The Positions section provides another view of the user's active investments.

It tracks:

- Product
- Instrument
- Quantity
- Average cost
- Last traded price
- Current value
- Profit/Loss
- Net change
- Day change

Positions are automatically updated when BUY or SELL orders are processed.

---

# 🧾 Orders

The Orders section maintains a history of the user's trading activity.

Each order contains:

- Stock name
- Quantity
- Price
- Order mode
- User ID

Example:

    BUY   INFY       5     ₹1555.45
    BUY   TCS        2     ₹3194.80
    SELL  WIPRO      3     ₹577.75

---

# 📑 Reports

The platform includes a reporting section that uses user-specific holdings and order data.

Reports can be used to analyze:

- Portfolio holdings
- Order history
- Trading activity
- Investment information

---

# 🧩 Project Architecture

The repository is divided into three major applications.

    Stock_Platform-
    │
    ├── frontend/
    │   ├── src/
    │   ├── public/
    │   ├── package.json
    │   └── ...
    │
    ├── dashboard/
    │   ├── src/
    │   ├── public/
    │   ├── package.json
    │   └── ...
    │
    ├── backend/
    │   ├── models/
    │   ├── index.js
    │   ├── package.json
    │   └── ...
    │
    └── README.md

---

# 🎨 Frontend

The frontend contains the public-facing website.

### Pages

- Home
- About
- Products
- Pricing
- Support
- Signup
- Login

The frontend handles user interaction and authentication entry points.

---

# 📊 Dashboard

The dashboard is the authenticated trading interface.

It contains:

    Dashboard
    │
    ├── Summary
    ├── Watchlist
    ├── Holdings
    ├── Positions
    ├── Orders
    ├── Funds
    └── Reports

---

# ⚙️ Backend

The backend is built using **Node.js and Express.js**.

It provides REST APIs for:

- Authentication
- Funds
- Holdings
- Positions
- Orders
- Portfolio data

The backend also handles:

- JWT verification
- Authorization
- Database operations
- Order validation
- Portfolio updates

---

# 🛠️ Tech Stack

## Frontend

- React
- React Router
- JavaScript
- CSS
- Axios

## Dashboard

- React
- React Router
- Axios
- Recharts
- JavaScript
- CSS

## Backend

- Node.js
- Express.js
- Mongoose
- MongoDB
- JSON Web Token
- CORS

## Database

- MongoDB Atlas

## Deployment

- Vercel
- Render

## Version Control

- Git
- GitHub

---

# 🔑 API Endpoints

The backend exposes REST APIs for authentication and portfolio management.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/signup` | POST | Register a new user |
| `/login` | POST | Authenticate user |
| `/funds` | GET | Get user funds |
| `/allHoldings` | GET | Get user holdings |
| `/allPositions` | GET | Get user positions |
| `/allOrders` | GET | Get user orders |
| `/newOrder` | POST | Place a BUY or SELL order |

Protected endpoints require:

    Authorization: Bearer <JWT_TOKEN>

---

# 🗃️ Database Models

MongoDB is used with Mongoose for database operations.

## User

    name
    email
    password

## Funds

    userId
    balance

## Orders

    userId
    name
    qty
    price
    mode

## Holdings

    userId
    name
    qty
    avg
    price
    net
    day

## Positions

    userId
    product
    name
    qty
    avg
    price
    net
    day
    isLoss

---

# 🔒 Security

The project implements several security mechanisms:

- JWT authentication
- Protected backend routes
- Authorization headers
- User-specific database queries
- Environment variables for sensitive configuration
- `.env` files excluded from Git
- Server-side validation of orders
- Authentication middleware

Sensitive credentials are not stored in the GitHub repository.

---

# 🔄 Complete Application Flow

    Landing Page
          │
          ▼
    Signup / Login
          │
          ▼
      JWT Token
          │
          ▼
      Dashboard
          │
          ├───────────────┐
          ▼               ▼
      Watchlist        Trading
                          │
                          ▼
                     Backend API
                          │
                          ▼
                     MongoDB Atlas

---

# ☁️ Deployment Architecture

The project is deployed as separate services.

    GitHub
       │
       ├───────────────┬───────────────┐
       │               │               │
       ▼               ▼               ▼
    Frontend        Dashboard       Backend
    Vercel           Vercel         Render
       │               │               │
       └───────────────┼───────────────┘
                       │
                       ▼
                  MongoDB Atlas

### Frontend

Hosted on **Vercel**

### Dashboard

Hosted on **Vercel**

### Backend

Hosted on **Render**

### Database

Hosted on **MongoDB Atlas**

---

# 💻 Local Development

## 1. Clone the Repository

    git clone https://github.com/vanshikasharma9126/Stock_Platform-.git
    cd Stock_Platform-

---

## 2. Frontend Setup

    cd frontend
    npm install
    npm start

---

## 3. Dashboard Setup

Open another terminal:

    cd dashboard
    npm install
    npm start

---

## 4. Backend Setup

Open another terminal:

    cd backend
    npm install

Create a `.env` file inside the backend folder:

    MONGO_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

Then start the backend:

    node index.js

---

# 📁 Environment Variables

Do not commit sensitive environment variables to GitHub.

Example:

    MONGO_URL=your_mongodb_connection_string
    JWT_SECRET=your_secret_key

The project uses `.gitignore` to prevent `.env` files from being committed.

---

# 📱 User Journey

    Visit Website
          │
          ▼
    Explore Landing Page
          │
          ▼
    Signup / Login
          │
          ▼
    JWT Authentication
          │
          ▼
    Trading Dashboard
          │
          ├───────────────┐
          ▼               ▼
    View Portfolio     View Watchlist
          │
          ▼
      Select Stock
          │
          ▼
    Place BUY / SELL Order
          │
          ▼
    Backend Validation
          │
          ▼
      MongoDB Update
          │
          ▼
    Updated Portfolio

---

# 🎯 Project Objectives

The main objective of this project was to build a complete full-stack application while understanding how frontend, backend, authentication, databases, and deployment work together.

### Skills Demonstrated

- Full-stack web development
- React development
- REST API development
- Authentication and authorization
- JWT implementation
- MongoDB database integration
- Mongoose data modeling
- CRUD operations
- API integration using Axios
- Portfolio management logic
- Trading/order processing
- Git and GitHub
- Cloud deployment
- Debugging production builds

---

# 🚀 Future Improvements

The platform can be extended with several advanced features.

### 📡 Real-Time Market Data

Integrate a real-time stock market API instead of simulated prices.

### 📈 Advanced Charts

Add:

- Candlestick charts
- Historical price charts
- Technical indicators
- Intraday charts

### 🔔 Price Alerts

Allow users to create custom price alerts.

### 📊 Advanced Portfolio Analytics

Add:

- Portfolio performance charts
- Profit/Loss analytics
- Investment allocation
- Risk analysis
- Historical portfolio performance

### ⚡ WebSocket Integration

Use WebSockets for real-time:

- Stock price updates
- Order updates
- Portfolio updates

### 📱 Mobile Optimization

Improve the trading dashboard for smaller screens and mobile devices.

### 🧑‍💼 Admin Dashboard

Add an administrative interface for monitoring users, orders, and platform activity.

---

# ⚠️ Disclaimer

This project is a **stock trading simulation developed for educational and portfolio purposes**.

It does not execute real stock-market trades.

The stock prices displayed in the application are simulated/static values and should not be considered real-time market data or financial advice.

---

# 👩‍💻 Author

## Vanshika Sharma

Computer Science Engineering Student  
Vellore Institute of Technology, Chennai

### GitHub

https://github.com/vanshikasharma9126

### Live Project

https://stock-platform-beige-six.vercel.app

---

# ⭐ Support

If you found this project interesting, consider giving the repository a ⭐ on GitHub.

---

<p align="center">

### Built with ❤️ using React, Node.js, Express & MongoDB

</p>
