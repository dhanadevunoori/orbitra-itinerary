# ✈️ Orbitra — AI-Powered Travel Planner

> A full-stack MERN application that uses **Groq's LLaMA 3.3 70B model** to generate personalised travel itineraries — with PDF text extraction, image OCR, JWT authentication, and shareable trip links.

[![Live Frontend](https://img.shields.io/badge/Live%20Frontend-Vercel-brightgreen?style=for-the-badge&logo=vercel)](https://orbitra-itinerary.vercel.app)
[![Live Backend](https://img.shields.io/badge/Live%20Backend-Render-blue?style=for-the-badge&logo=render)](https://orbitra-backend-75je.onrender.com)
[![React](https://img.shields.io/badge/React.js-Vite-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com)
[![Groq](https://img.shields.io/badge/AI-Groq%20LLaMA%203.3-F55036?style=for-the-badge)](https://groq.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

---

## 🌐 Live Demo

| Layer | URL |
|---|---|
| 🖥️ Frontend | [https://orbitra-itinerary.vercel.app](https://orbitra-itinerary.vercel.app) |
| ⚙️ Backend API | [https://orbitra-backend-75je.onrender.com](https://orbitra-backend-75je.onrender.com) |
| 💻 GitHub | [https://github.com/dhanadevunoori/orbitra-itinerary](https://github.com/dhanadevunoori/orbitra-itinerary) |

---

## 💡 Why I Built This

Planning a trip involves hours of research across dozens of tabs. Orbitra solves that — describe your trip (or upload travel documents you already have), and the AI generates a complete personalised itinerary in seconds.

This project covers the full MERN stack lifecycle: system design → document processing → AI API integration → JWT authentication → cloud deployment.

---

## 🏗️ Architecture Overview

```
User (Browser)
     │
     ▼
React.js + Vite Frontend  ──►  Node.js / Express.js REST API
     │                                    │
     │                          ┌─────────┴──────────────────┐
     │                     MongoDB Atlas              Groq API
     │                     (User data,           (llama-3.3-70b-versatile —
     │                      trip history)          itinerary generation)
     │                                    │
     │                          pdf-parse (PDFs) / Tesseract.js (images)
     │                          — document text extraction pipeline
     │
  Vercel                                       Render
(Frontend deploy)                         (Backend deploy)
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| Backend | Node.js, Express 4 |
| Database | MongoDB Atlas (Mongoose 8) |
| AI Engine | Groq SDK — `llama-3.3-70b-versatile` |
| Authentication | JWT (`jsonwebtoken`), `bcryptjs` |
| File Upload | Multer, `react-dropzone` (drag-and-drop) |
| Document Processing | `pdf-parse` (PDF text extraction), `tesseract.js` (image OCR) |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

> **Note on document processing:** PDFs and images are handled by two different mechanisms. Uploaded **PDFs** go through `pdf-parse`, which extracts embedded text directly. Uploaded **images** go through `tesseract.js`, which performs true optical character recognition. This distinction matters because PDF text extraction and OCR solve different problems — one reads existing digital text, the other recognizes text in a picture.

---

## ✨ Features

- 🤖 **AI Itinerary Generation** — Groq's `llama-3.3-70b-versatile` generates personalised day-by-day travel plans
- 🔐 **JWT Authentication** — secure user registration, login, and session management with `bcryptjs` password hashing
- 📄 **Document Upload & Parsing** — drag-and-drop (via `react-dropzone`) PDF/image upload, with PDF text extraction and image OCR feeding context into itinerary generation
- 📋 **Trip History** — all generated itineraries saved and accessible per user
- 🔗 **Share Itineraries** — share trips via unique public token links
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
| POST | `/api/itinerary/generate` | Generate AI itinerary (Groq `llama-3.3-70b-versatile`) |
| GET | `/api/itinerary/history` | Get all saved itineraries for user |
| PUT | `/api/itinerary/:id/visibility` | Toggle public/private |
| GET | `/api/itinerary/share/:id` | Get shared itinerary (public) |
| DELETE | `/api/itinerary/:id` | Delete an itinerary |

> 🔑 All itinerary endpoints require a **Bearer JWT token** in the Authorization header.

---

## 🧹 Maintenance Note

This repo's `package.json` previously listed `@google/generative-ai`, `openai`, and `sharp` as dependencies from early experimentation with alternative AI providers and image processing. These are not imported or used anywhere in the current codebase — Groq is the sole active AI provider. They will be removed in a future cleanup pass (`npm uninstall @google/generative-ai openai sharp`) to keep the dependency list accurate.

---

## 👩‍💻 Author

**Dhanalaxmi Devunoori** — [LinkedIn](https://linkedin.com/in/dhanadevunoori-b295a9293) · [GitHub](https://github.com/dhanadevunoori)
📧 dhanadevunoori@gmail.com

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
