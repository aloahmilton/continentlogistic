import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/config.js';

export const adminAuth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role === 'admin' || decoded.role === 'super_admin') {
      req.user = decoded;
      next();
    } else {
      res.status(403).json({ message: 'Admin access required' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const superAdminAuth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role === 'super_admin') {
      req.user = decoded;
      next();
    } else {
      res.status(403).json({ message: 'Super Admin access required' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
