# Campaign Submission Tracker

A full-stack **Campaign Submission Tracker** for **influencers and brands** to manage campaigns, track submissions, and monitor performance.

## 🛠 Tech Stack

### **Backend** (NestJS + MongoDB)
- **NestJS** - Backend framework
- **MongoDB** with **Mongoose** - Database
- **JWT Authentication** - Security
- **Swagger** - API Documentation

### **Frontend** (React or Angular)
- **React/Next.js** or **Angular** - Frontend
- **Tailwind CSS** - Styling
- **Axios** - API Calls

---

## 🚀 Setup Guide

### 1️⃣ Backend Setup (NestJS)

#### **1. Clone the Repository**
```sh
git clone https://github.com/your-repo/campaign-tracker.git
cd campaign-tracker/backend
```

#### **2. Install Dependencies**
```sh
npm install
```

#### **3. Configure Environment Variables**
Create a `.env` file:
```sh
MONGO_URI=mongodb://localhost:27017/campaigns
JWT_SECRET=your_secret_key
PORT=5000
```

#### **4. Start the Backend Server**
```sh
npm run start:dev/ npm run go
```

The API will run at `http://localhost:3000`

#### **5. Test API Endpoints** (Optional)
```sh
npm run test
```

---

### 2️⃣ Frontend Setup (React/Next.js)

#### **1. Navigate to the Frontend Directory**
```sh
cd ../frontend
```

#### **2. Install Dependencies**
```sh
yarn install
```

#### **3. Configure Environment Variables**
Create a `.env.local` file:
```sh
NEXT_PUBLIC_API_URL=http://localhost:3001
```

#### **4. Start the Frontend**
```sh
yarn dev
```
The frontend will run at `http://localhost:3001`

---

## 🔥 Features

### **Influencer View**
✅ View ongoing campaigns
✅ Submit campaign content (TikTok, Instagram links)
✅ Track submission status
✅ Monitor engagement metrics

### **Brand/SME View**
✅ Monitor influencers' participation
✅ Approve/reject submissions
✅ View performance analytics

---

## 📌 API Endpoints

### **Auth Routes**
- `POST /auth/signup` → Register user
- `POST /auth/login` → Login user

### **Campaign Routes**
- `GET /campaigns` → List all campaigns
- `POST /campaigns` → Create a campaign (Admin only)

### **Submission Routes**
- `POST /campaigns/:id/submit` → Submit content
- `GET /campaigns/:id/submissions` → View submissions
- `PATCH /submissions/:id/approve` → Approve/reject submissions

---

## 🤝 Contribution Guide
1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## 📜 License
MIT License © 2025 @beckynayere

