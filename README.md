# ✈️ Orbitra — AI-Powered Travel Planner

> A full-stack MERN application that uses **Groq LLaMA 3 AI** to generate personalised travel itineraries — with trip sharing, PDF upload, and drag-and-drop functionality.

[![Live Frontend](https://img.shields.io/badge/Live%20Frontend-Vercel-brightgreen?style=for-the-badge&logo=vercel)](https://orbitra-itinerary.vercel.app)
[![Live Backend](https://img.shields.io/badge/Live%20Backend-Render-blue?style=for-the-badge&logo=render)](https://orbitra-backend-75je.onrender.com)
[![React](https://img.shields.io/badge/React.js-Vite-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

---

## 🌐 Live Demo

| Layer | URL |
|---|---|
| 🖥️ Frontend | [https://orbitra-itinerary.vercel.app](https://orbitra-itinerary.vercel.app) |
| ⚙️ Backend API | [https://orbitra-backend-75je.onrender.com](https://orbitra-backend-75je.onrender.com) |
| 💻 GitHub | [https://github.com/dhanadevunoori/orbitra-itinerary](https://github.com/dhanadevunoori/orbitra-itinerary) |

---

## 💡 Why We Built This

Planning a trip involves hours of research across dozens of tabs. We built Orbitra to solve that — give it your destination, dates, and preferences, and the AI generates a complete personalised itinerary in seconds.

This project covers the full MERN stack lifecycle: system design → AI API integration → JWT authentication → file upload → cloud deployment.

---

## 🏗️ Architecture Overview

```
User (Browser)
     │
     ▼
React.js + Vite Frontend  ──►  Node.js / Express.js REST API
     │                                    │
     │                          ┌─────────┴──────────┐
     │                     MongoDB Atlas         Groq AI API
     │                     (User data,           (LLaMA 3 —
     │                      trip history)         itinerary
     │                                            generation)
     │
  Vercel                                       Render
(Frontend deploy)                         (Backend deploy)
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| AI Engine | Groq API (LLaMA 3) |
| Authentication | JWT (JSON Web Tokens) |
| File Handling | PDF / Image upload, drag and drop |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

---

## ✨ Features

- 🤖 **AI Itinerary Generation** — Groq LLaMA 3 generates personalised day-by-day travel plans
- 🔐 **JWT Authentication** — secure user registration, login, and session management
- 📄 **PDF / Image Upload** — drag-and-drop or click to upload travel documents and photos
- 📋 **Trip History** — all generated itineraries saved and accessible per user
- 🔗 **Share Itineraries** — share trips via unique links
- 🔒 **Public / Private Toggle** — control who can view each itinerary
- 📱 **Responsive Design** — fully functional across desktop and mobile

---

## 🚀 Run Locally

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Groq API key ([get one free at console.groq.com](https://console.groq.com))

### Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/dhanadevunoori/orbitra-itinerary.git
cd orbitra-itinerary/backend

# 2. Install dependencies
npm install

# 3. Create .env file
# MONGO_URI=your_mongodb_atlas_connection_string
# JWT_SECRET=your_jwt_secret
# GROQ_API_KEY=your_groq_api_key
# PORT=5000

# 4. Start the backend server
npm start
```

### Frontend Setup

```bash
cd ../frontend

# 1. Install dependencies
npm install

# 2. Create .env file
# VITE_API_URL=http://localhost:5000

# 3. Start the development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Itineraries
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/itinerary/generate` | Generate AI itinerary (Groq LLaMA 3) |
| GET | `/api/itinerary/history` | Get all saved itineraries for user |
| PUT | `/api/itinerary/:id/visibility` | Toggle public/private |
| GET | `/api/itinerary/share/:id` | Get shared itinerary (public) |
| DELETE | `/api/itinerary/:id` | Delete an itinerary |

> 🔑 All itinerary endpoints require a **Bearer JWT token** in the Authorization header.

---

## 👩‍💻 Contributors

Built collaboratively by the Orbitra team.

- **Devunoori Dhanalaxmi** — [LinkedIn](https://linkedin.com/in/dhanadevunoori-b295a9293) · [GitHub](https://github.com/dhanadevunoori)
- 📧 dhanadevunoori@gmail.com

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
