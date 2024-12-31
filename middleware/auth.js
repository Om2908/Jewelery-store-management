const jwt = require('jsonwebtoken');
const User = require('../models/user');
const jwt_secrect="om";
exports.authenticate = async (req, res, next) => {
  const token = req.header('token');
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
      const decoded = jwt.verify(token,jwt_secrect);
      req.user = decoded;
      next();
  } catch (err) {
      res.status(400).json({ error: 'Invalid token or relogin' });
  }

};

exports.authorize = (role) => {
  return (req, res, next) => {
    if (req.user.userrole !== role) {
      return res.status(403).json({ success: false, message: 'invalid access' });
    }
    next();
  };
};