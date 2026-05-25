# Online Food Ordering System - Backend API

A RESTful API built with Node.js, Express, and MongoDB for an Online Food Ordering System.

---

## Features

- User authentication (Register / Login)
- JWT-based authentication
- Role-based access control (User / Admin)
- Product management (Create, Read, Update, Delete)
- Order management (Create order, update status, view orders)
- Admin APIs for managing products and orders

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- dotenv
- cors

---

## Project Structure

├── config/
├── controllers/
├── models/
├── routes/
├── middleware/
├── server.js

## Installation

```
npm install
npm run dev


```

# Environment Variables

Create a .env file and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
