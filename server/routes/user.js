const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const {User} = require('../models/user')



router.post('/login', asyncHandler(async (req, res, next ) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where : { email }
  });

  if(user && (await bcrypt.compare(password, user.password))){
    const generateTok = (id) => {
      return jwt.sign({ id }, process.env.JWT_SECRET , {
        expiresIn: '30d'
      })
    }
    res.json({
      _id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token: generateTok(user._id)
    })
  }else{
    res.status(400);
    throw new Error("Invalid credentials!")
  }
}));
module.exports = router;
