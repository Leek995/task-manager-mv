const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/checkTok')

// with protect
// different model routers
router.use('/tasks', protect, require('./tasks'));
router.use('/users', require('./user'));
router.use('/register', require('./register'));


module.exports = router;
