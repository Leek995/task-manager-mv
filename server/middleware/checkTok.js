
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const {User} = require("../models/user");

const protect = asyncHandler(async (req, res, next) => {  // Swap `res` and `req` parameters
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
      req.user = await User.findByPk(decoded.id)
      next();
    } catch (e) {
      console.error(e);  // Changed `console.log` to `console.error`
      res.status(401);
      throw new Error('Not authorized!');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized! Invalid or No Token!');
  }
});

module.exports = {
  protect
};

