# Continental Track - Global Logistics & Tracking Platform

Continental Track is a premium, full-stack logistics management platform designed for modern shipping and supply chain operations. It features real-time parcel tracking, an integrated admin dashboard, and automated customer notifications.

## 🚀 Features

- **Real-time Tracking**: Interactive Leaflet maps showing shipment progress and status history.
- **Admin Dashboard**: Centralized hub for managing shipments, leads, and logistics workflows.
- **Lead Generation**: Integrated quote request system with automated SMTP notifications.
- **Branded Communications**: Professional HTML email templates for customer updates.
- **Monorepo Architecture**: Integrated Express backend and Vite frontend in a single codebase.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express (Vercel Serverless).
- **Database**: MongoDB with Mongoose ODM.
- **Maps**: Leaflet / React-Leaflet.
- **Email**: Nodemailer (SMTP).
- **Deployment**: Vercel.

## 📦 Project Structure

```bash
continentaltrack/
├── api/                # Express Backend (Vercel Functions)
│   ├── models/        # Mongoose Data Models
│   ├── routes/        # API Endpoint Definitions
│   └── utils/         # Helpers (Email, etc.)
├── src/                # Vite Frontend
│   ├── components/    # Reusable UI Components
│   ├── lib/           # Shared Utilities (API Client)
│   └── pages/         # Page Views & Admin Modules
└── vercel.json         # Deployment & Routing Config
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local instance.

### Installation
1. Clone the repository and install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Configure environment variables in a `.env` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   EMAIL_USER=continentaltrack01@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ```

3. Start the development environment:
   ```bash
   npm run dev
   ```

## 🌐 Deployment

The platform is optimized for **Vercel**. 

- **SPA Routing**: Handled via `vercel.json` to prevent 404s on refresh.
- **API Functions**: Located in the `/api` directory for zero-config serverless deployment.

---
© 2026 Continental Track Logistics. Designed for Excellence.
