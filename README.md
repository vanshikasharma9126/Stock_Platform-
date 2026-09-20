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

https://stock-platform-beige-six.vercel.app

The application is deployed and can be accessed directly through the link above.

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

```text
                ┌───────────────┐
                │ Signup / Login│
                └───────┬───────┘
                        │
                        ▼
              ┌──────────────────┐
              │ Backend validates│
              │   credentials    │
              └─────────┬────────┘
                        │
                        ▼
                 JWT Token
                        │
                        ▼
              ┌──────────────────┐
              │    Dashboard     │
              └─────────┬────────┘
                        │
                        ▼
             Protected API Requests
