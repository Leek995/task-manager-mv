const express = require("express");
const router = express.Router();

// different model routers
router.use('/tasks', require('./tasks'));


module.exports = router;
