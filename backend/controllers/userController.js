const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
require("dotenv").config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY , {
      expiresIn: '30m',
    })
  }

  //register
const registerUser= asyncHandler(async(req,res)=>{
  try {
    const {name,email,password,phone, role} = req.body;
    console.log(name)

    if(!name || !email || !password){
        res.status(400).json('Add all the fields');
        return;
    }

    //check if user exists
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400).json('User already exists');
        return;
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        role
    })

    if(user){
        res.status(201).json('Registration successfull');
    }else{
        res.status(401)
        throw new Error("Invalid user data")
    }
  } catch (error) {
    res.status(400).json(error)
    return
  }
    
})


//login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log(email);

    // Check for user email
    const user = await User.findOne({ email })

    if(user){
      if(user.is_verified && user.is_admin===0){
        if (await bcrypt.compare(password, user.password)) {
          res.json({
            token: generateToken(user._id),
          })
        } else {
          res.status(400).json('Invalid Credentials');
        }
      }else{
          res.status(400).json('User Blocked by admin');
      }
    }else{
      res.status(400).json('Invalid Credentials');
    }
    
})


const editProfile = asyncHandler(async(req,res)=>{
    const {name,phone, role,email,imageUrl} = req.body;

    const user = await User.findOne({ email })

    if(user.is_verified && user.is_admin===0){
      if (user) {
        const user = await User.findOneAndUpdate({ email },
              {$set:{name,phone,role,imageUrl}},
              {new:true})
        res.json({
          _id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          url: user.imageUrl,
          is_verified: user.is_verified,
          token: generateToken(user._id),
        })
      } else {
        res.status(400)
        throw new Error('Invalid credentials')
      }
    }else{
        res.status(400)
        throw new Error('User Blocked by admin')
    }

})

const userDetails = asyncHandler(async(req,res) =>{
  const {id} = req.userId
  console.log(id);
  const user = await User.findOne({_id:id});
  console.log(user);
  if(user){
    res.status(200).json(user);
  }else{
    res.status(400).json('User details not found');
  }
})


module.exports = {
    registerUser,
    loginUser,
    userDetails,
    editProfile
}