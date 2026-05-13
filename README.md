# 🚀 Micro Fiverr - Freelancer Marketplace Platform

Micro Fiverr is a comprehensive, modern freelancer marketplace platform built with the **MERN Stack**. It connects clients with freelancers for various services, featuring real-time communication, job boards, and advanced location tracking for on-site services.

![Project Preview](https://via.placeholder.com/1200x600?text=Micro+Fiverr+Marketplace+Preview)

## ✨ Features

- **👤 Multi-Role Authentication**: Secure login and registration for Clients, Freelancers, and Admins using JWT and Bcrypt.
- **💼 Service Marketplace**: Browse, search, and book a wide variety of freelance services.
- **📝 Job Board**: Clients can post jobs, and freelancers can submit proposals.
- **💬 Real-time Messaging**: Instant chat between users powered by Socket.io.
- **📍 Live Location Tracking**: Real-time location sharing between freelancers and clients during active bookings (perfect for on-site service delivery).
- **💳 Payment Integration**: Secure transaction handling for service bookings.
- **⭐ Review & Rating System**: Build trust with a transparent feedback system for services.
- **🛠️ Admin Dashboard**: Comprehensive management tool for platform oversight.
- **📱 Responsive UI**: Beautifully designed with Tailwind CSS v4 and Framer Motion for smooth animations.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Hooks & Context API
- **Routing**: React Router 7
- **Maps**: Leaflet & React Leaflet
- **UI Components**: Radix UI

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Real-time**: Socket.io
- **Auth**: JSON Web Tokens (JWT) & BcryptJS
- **Deployment**: Vercel ready

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AbuzarDev7/Hackathon-Project-Micro-Fiverr.git
   cd Hackathon-Project-Micro-Fiverr
   ```

2. **Setup Backend**
   ```bash
   cd back-end
   npm install
   ```
   Create a `.env` file in the `back-end` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

### 🏃‍♂️ Running the Application

You can use the provided batch files to start the services easily (Windows):

- **Start All**: Run `start_app.bat` (Starts both frontend and backend)
- **Start Backend Only**: Run `start_backend.bat`
- **Stop All**: Run `stop_all.bat`

Alternatively, manual start:
- Backend: `cd back-end && npm run dev`
- Frontend: `cd frontend && npm run dev`

---

## 📂 Project Structure

```text
Hackathon-Project-Micro-Fiverr/
├── back-end/           # Node.js + Express API
│   ├── models/         # Mongoose Schemas
│   ├── routes/         # API Endpoints
│   ├── middleware/     # Auth & Error handling
│   └── server.js       # Entry point & Socket.io setup
├── frontend/           # React + Vite Application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page views
│   │   ├── context/    # Global state
│   │   └── assets/     # Static files
│   └── public/
└── scripts/            # Helper batch files
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the ISC License.

---

Developed with ❤️ by **AbuzarDev7**
