# 🚗 Fleet Management System

A modern full-stack Fleet Management System designed to monitor, manage, and optimize vehicle operations efficiently. This application provides real-time insights into vehicle status, driver management, trip tracking, and maintenance scheduling.

---

## 📌 Overview

The Fleet Management System helps organizations manage their transportation infrastructure by providing:

* Real-time vehicle monitoring
* Driver and trip management
* Maintenance tracking
* Data visualization through dashboards

This project is built with a scalable architecture using modern web technologies.

---

## 🚀 Features

### 🧑‍💼 Admin Dashboard

* View all vehicles and their status
* Monitor active/inactive vehicles
* Assign drivers to vehicles
* View trip history

### 🚘 Vehicle Management

* Add, update, delete vehicles
* Track vehicle usage
* Monitor fuel and maintenance logs

### 👨‍✈️ Driver Management

* Add and manage drivers
* Assign vehicles
* Track driver activity

### 🗺️ Trip Tracking

* Record trip details
* Track routes (future scope: live tracking)
* Maintain trip history

### 🔔 Maintenance & Alerts

* Schedule maintenance
* Get alerts for service due
* Track repair history

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Framer Motion (animations)
* Three.js (for 3D UI enhancements)

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### Tools & Deployment

* Vercel (Frontend)
* Render (Backend)
* Git & GitHub

---

## 🧩 Project Structure

```
fleet-management/
│
├── frontend/        # React frontend
│   ├── components/
│   ├── pages/
│   ├── assets/
│
├── backend/         # Node.js backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│
├── ai-service/      # (Optional AI microservice - FastAPI)
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/fleet-management.git
cd fleet-management
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
npm start
```

---

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

### 4️⃣ Environment Variables

Create a `.env` file in backend:

```
MONGO_URI=your_mongodb_connection
PORT=5000
JWT_SECRET=your_secret_key
```

---

## 🌐 API Endpoints (Sample)

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| GET    | /api/vehicles     | Get all vehicles |
| POST   | /api/vehicles     | Add new vehicle  |
| PUT    | /api/vehicles/:id | Update vehicle   |
| DELETE | /api/vehicles/:id | Delete vehicle   |

---

## 🎨 UI Highlights

* Smooth animations using Framer Motion
* Responsive layout (mobile + desktop)
* Modern dashboard design
* Optional 3D elements using Three.js

---

## 🔮 Future Enhancements

* 📍 Real-time GPS tracking (Google Maps / Mapbox)
* 📊 Advanced analytics dashboard
* 🤖 AI-based route optimization
* 🔐 Role-based authentication system
* 📱 Mobile app version

---

## 📸 Screenshots

(Add your project screenshots here)

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Chandu Giri**

* Full Stack Developer
* Passionate about building scalable web applications

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!
