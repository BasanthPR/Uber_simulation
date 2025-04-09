# 🚖 Uber Simulation - Distributed Systems for Data Engineering

## 🔍 Project Overview

This project simulates the core architecture and functionalities of **Uber** using a distributed, three-tier system. The objective is to understand the real-world challenges in building scalable, fault-tolerant, and efficient distributed systems with an emphasis on performance, resource handling, and robust middleware communication.

This system includes:
- Dynamic pricing based on real-world data
- Messaging system with **Kafka**
- SQL caching with **Redis**
- Relational and NoSQL data management (**MySQL** & **MongoDB**)
- Real-time driver location mapping
- Modular client-server design

---

## 🧱 Architecture Overview

### 🎯 Three-Tier System

#### 1. **Client Tier** (Node.js)
A user-friendly GUI that lets users interact with the system:
- Driver & customer registration
- Ride booking
- Billing and ride history
- Admin dashboards with graphs/stats

#### 2. **Middleware Tier** (REST APIs + Kafka)
- Microservices architecture powered by RESTful APIs
- Kafka as the messaging backbone
- Dynamic pricing using ML models trained on Kaggle Uber Fares Dataset
- Fail-safe handling and transactional integrity

#### 3. **Database Tier**
- **MySQL**: Core relational data (drivers, customers, billing, rides)
- **MongoDB**: Images, videos, and reviews
- **Redis**: SQL query caching to improve performance

---

## 🔮 Dynamic Pricing Algorithm

Uber's dynamic pricing logic is replicated using:
- **Historical data** (from Kaggle)
- **Real-time demand-supply analysis**
- **Machine learning** predictions based on:
  - Time of day
  - Distance
  - Area demand
  - Driver availability

📊 **Dataset Used**: [Uber Fares Dataset on Kaggle](https://www.kaggle.com/datasets/yasserh/uber-fares-dataset)

---

## 🧪 Scalability & Performance

- Benchmarking conducted using **Apache JMeter** simulating **100 concurrent users**
- DB populated with **10,000+ records**
- Performance comparisons:
  - **B**: Base
  - **B+S**: Base + SQL Caching
  - **B+S+K**: + Kafka
  - **B+S+K+X**: + Additional Techniques

Bar charts and latency metrics will be included in the final presentation.

---

## 🧾 Major Modules & Features

### 👤 **Driver Service**
- Register / Update / Delete drivers
- Upload profile video
- Manage reviews, ratings, and ride history

### 👥 **Customer Service**
- Register / Update / Delete customers
- Upload ride-event images
- Select nearest drivers within a 10-mile radius

### 💵 **Billing Service**
- Predict and calculate ride fare
- Maintain billing history
- View/search ride-specific bills

### 🛠 **Admin Panel**
- View revenue/day, total rides (area-wise)
- Generate and export statistics
- Moderate driver/customer accounts

### 🚗 **Rides Service**
- Create/Edit/Delete rides
- Location-based ride statistics
- View driver/customer ride history

---

## 💻 Technologies Used

| Layer         | Technology                              |
|---------------|------------------------------------------|
| Client        | Node.js, Vite, React.js                  |
| Middleware    | Express.js, Kafka, REST APIs             |
| Database      | MySQL, MongoDB, Redis                    |
| Deployment    | Docker, Kubernetes, AWS EC2              |
| Testing       | Apache JMeter                            |
| ML/AI         | Scikit-learn, Pandas, Uber Kaggle Data   |
