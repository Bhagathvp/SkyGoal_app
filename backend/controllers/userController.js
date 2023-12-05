const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const { saveImage } = require('../utils/cloudinaryImage')
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
    const mailReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!mailReg.test(email)){
      res.status(400).json('Enter a valid email id');
        return;
    }
    const no = /^\d{10}$/;
    if(!no.test(phone)){
      res.status(400).json('Enter a valid phone number');
        return;
    }
    if(password.length < 5){
      res.status(400).json('Password should have least 5 chars');
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

    const mailReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!mailReg.test(email)){
      res.status(400).json('Enter a valid email id');
        return;
    }

    if(password.length < 5){
      res.status(400).json('Password should have least 5 chars');
        return;
    }
    
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


const editProPic = asyncHandler(async(req,res)=>{

  const {id} = req.userId

  const cloudImg= await saveImage(req.file?.buffer)
  console.log(cloudImg)
  const updateUser = await User.findOneAndUpdate({_id:id},
    {$set:{
      imageUrl: cloudImg?.secure_url
    }},
    {new:true}
    )

  if(updateUser){
    res.status(200).json('Profile Pic Updated')
  }else{
    res.status(400).json('Profile pic updation failed')
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
    editProPic
}