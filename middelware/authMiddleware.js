// authMiddleware.js

const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const User = require('../model/user');

// Authorization middleware function
const authAuthorization = (role) => {
  return async (req, res, next) => {
    try {
      // Check if the user has the required role for accessing the route
      if (!req.user || req.user.role !== role) {
        return res.status(StatusCodes.FORBIDDEN).json({ error: 'Forbidden' });
      }
      
      // Call next to proceed with the request handling
      next();
    } catch (error) {
      console.error(error);
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
    }
  };
};

// Authentication middleware function
// Authentication middleware function

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
    }

    const authToken = token.split(' ')[1];
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
    }

    req.user = user;
    req.userId = decoded.userId;
    req.adminId = user.role === 'admin' ? decoded.userId : null; // Attach adminId if role is admin
    req.hrID =  decoded.adminId; // Attach hrID if role is hr

    next();
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
  }
};

  module.exports = { authMiddleware, authAuthorization };
