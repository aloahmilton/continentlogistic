# Continent Logistic.org - Global Logistics & Tracking Platform

Continent Logistic.org is a premium, full-stack logistics management platform designed for modern shipping and supply chain operations. It features real-time parcel tracking, an integrated admin dashboard, automated customer notifications, lead generation, and comprehensive fleet management. Built as a monorepo with integrated Express backend and Vite frontend, it supports end-to-end logistics workflows from quote requests to delivery confirmation.

## 🚀 Features

- **Real-time Tracking**: Interactive Leaflet maps with shipment progress, status history, and geolocation updates.
- **Admin Dashboard**: Centralized hub for managing shipments, customers, drivers, leads, invoices, messages, and reports with role-based access (super admin, admin, user).
- **Lead Generation & Quotes**: Automated quote request system with SMTP notifications and customer follow-ups.
- **Fleet Management**: Driver tracking, vehicle management, trip logging, and performance ratings.
- **Customer Portal**: User dashboards for tracking shipments, managing profiles, and communicating with support.
- **Billing & Invoices**: Automated invoice generation linked to shipments, with payment tracking and overdue alerts.
- **Branded Communications**: Professional HTML email templates for updates, confirmations, and notifications.
- **Monorepo Architecture**: Seamless integration of Express backend (Vercel serverless) and Vite frontend in a single codebase.
- **Security**: JWT authentication, password hashing, and role-based permissions.
- **Reporting**: Analytics on shipments, drivers, leads, and revenue with charts and exports.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Radix UI, Lucide Icons, React Router, React Query, React Hook Form, Zod validation.
- **Backend**: Node.js, Express (Vercel Serverless Functions).
- **Database**: MongoDB Atlas with Mongoose ODM.
- **Maps**: Leaflet / React-Leaflet for real-time tracking.
- **Email**: Nodemailer with SMTP for automated notifications.
- **Charts**: Recharts for analytics and reporting.
- **PDF Generation**: jsPDF for invoices and reports.
- **Deployment**: Vercel (SPA routing, serverless APIs).
- **Testing**: Vitest, Playwright.
- **Linting**: ESLint, TypeScript.

## 📊 Database Entities

The system uses MongoDB with the following entities (defined in `api/models/`):

- **Shipment**: Tracks parcels with tracking numbers, sender/receiver details, origin/destination, status (pending to delivered), coordinates, updates history, and metadata.
- **User**: Customer and admin accounts with profiles, authentication, roles (user, admin, super_admin), and account types (individual/company).
- **Lead**: Quote requests with contact info, service types, locations, messages, and status tracking.
- **Driver**: Delivery personnel with vehicle details, location/coords, status, ratings, and trip counts.
- **Invoice**: Billing records linked to shipments/users, with amounts, taxes, statuses, and payment dates.
- **Message**: Internal communications between users/admins, with attachments and read status.
- **Setting**: Key-value store for app configurations (e.g., company name, support email).

## 📦 Project Structure

```
Continentlogistic/
├── api/                          # Express Backend (Vercel Functions)
│   ├── models/                  # Mongoose Data Models
│   ├── scripts/                 # Seeding and utility scripts
│   ├── utils/                   # Helpers (Email, Geocoding, Config)
│   └── index.js                 # Main server entry (for local dev)
├── src/                          # Vite Frontend
│   ├── components/              # Reusable UI Components (shadcn/ui)
│   ├── lib/                     # Shared Utilities (API client, utils)
│   ├── pages/                   # Page Views & Admin Modules
│   ├── hooks/                   # Custom React Hooks
│   ├── utils/                   # Helper functions
│   └── test/                    # Unit and E2E tests
├── public/                       # Static assets
├── dist/                         # Build output
├── .env                          # Environment variables (not committed)
├── vercel.json                   # Vercel deployment config
├── vite.config.ts                # Vite build config
├── tailwind.config.ts            # Tailwind CSS config
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- npm or bun
- MongoDB Atlas account (or local MongoDB instance)

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/aloahmilton/continentlogistic.git
    cd continentlogistic
    ```

2. Install dependencies:
    ```bash
    npm install --legacy-peer-deps
    # or
    bun install
    ```

3. Configure environment variables in a `.env` file (copy from `.env.example` if available):
    ```env
    MONGODB_URI=mongodb+srv://your_atlas_connection_string
    EMAIL_USER=your_smtp_email@gmail.com
    EMAIL_PASS=your_smtp_app_password
    ADMIN_NOTIFICATION_EMAIL=admin@yourdomain.com
    VITE_ADMIN_SLUG=admin5001  # Admin login slug
    JWT_SECRET=your_jwt_secret_key
    PORT=5001
    ```

4. Seed the database (optional, for development):
    ```bash
    # Seed all entities with sample data
    node api/scripts/seedEntities.js
    # Seed admin users
    node api/scripts/seedAdmins.js
    # Check population
    node api/scripts/checkDB.js
    ```

5. Start the development environment:
    ```bash
    # Run frontend + backend concurrently
    npm run dev:all
    # Or separately:
    npm run server  # Backend on port 5001
    npm run dev     # Frontend on port 5173
    ```

## 🧪 Testing

- **Unit Tests**: `npm run test`
- **E2E Tests**: `npx playwright test`
- **Linting**: `npm run lint`

## 🌐 Deployment

The platform is optimized for **Vercel**:

1. Connect your GitHub repo to Vercel.
2. Set environment variables in Vercel dashboard.
3. Deploy; APIs auto-route via `/api/*`.
4. SPA routing handled by `vercel.json`.

For production, ensure MongoDB Atlas IP whitelisting and SMTP credentials.

## 📈 Usage

- **Customers**: Register/login, request quotes, track shipments, view invoices.
- **Admins**: Access `/admin5001` dashboard to manage all entities, view reports, send messages.
- **Drivers**: (Future) Mobile app integration for real-time updates.

## 🤝 Contributing

1. Fork the repo.
2. Create a feature branch.
3. Commit changes.
4. Push and open a PR.

## 📄 License

© 2026 Continent Logistic.org. All rights reserved.

---

**Designed for Excellence in Global Logistics.**
