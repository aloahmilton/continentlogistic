import dotenv from 'dotenv';
dotenv.config();

const ADMIN_PASSWORD = process.env.VITE_ADMIN_PASSWORD || "admin_password_123";
const SUPER_ADMIN_PASSWORD = process.env.VITE_SUPER_ADMIN_PASSWORD || "super_admin_secret_999";

export const adminAuth = (req, res, next) => {
  const authHeader = req.headers['x-admin-password'];
  
  if (authHeader === ADMIN_PASSWORD || authHeader === SUPER_ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized: Admin access required' });
  }
};

export const superAdminAuth = (req, res, next) => {
  const authHeader = req.headers['x-admin-password'];
  
  if (authHeader === SUPER_ADMIN_PASSWORD) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Super Admin access required for this operation' });
  }
};
