const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const getTokenFromHeader = (req) => {
  const auth = req.headers.authorization;
  if (!auth) return null;
  const parts = auth.split(' ');
  if (parts.length !== 2) return null;
  return parts[1];
};

const requireAuth = (req, res, next) => {
  const token = getTokenFromHeader(req);
  if (!token) return res.status(401).json({ message: 'Authentication required' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, role: payload.role, email: payload.email };
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Authentication required' });
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  return next();
};

module.exports = { requireAuth, requireRole };
