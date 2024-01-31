const express = require("express");
const asyncHandler = require("express-async-handler");

const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {User} = require("../models/user");



router.post('/', asyncHandler(async (req, res ) => {
  const { firstName, lastName, email, password } = req.body;

  if(!firstName || !lastName || !email || !password){
    res.status(400);
    throw new Error('Please include all fields');
  }
  const checkIfExistingUser = await User.findOne({
    where: { email }
  })

  if (checkIfExistingUser){
    res.status(400)
    throw new Error('User already exist!')
  }

  const salt = await bcrypt.genSalt(10)
  const hashPwd = await bcrypt.hash(password, salt)

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashPwd
  })

  if(user) {
    res.status(201).json({
      _id: user.id,
    })
  }else{
    res.status(400)
    throw new Error('Invalid user data!')
  }
}));
module.exports = router;
