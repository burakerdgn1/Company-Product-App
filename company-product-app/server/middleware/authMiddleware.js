const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, 'secret-key');
      req.userId = decoded.userId;
      next();
    } catch (error) {
      res.status(401).send('Authentication failed.');
    }
  }

  module.exports = authMiddleware;
