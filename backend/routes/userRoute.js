const express = require('express')
const userRoute = express()
const userController = require("../controllers/userController")
const authenticator = require('../middleware/authMiddleware')


userRoute.post("/", userController.registerUser);

userRoute.post('/login',userController.loginUser);

userRoute.use(authenticator);

userRoute.get('/userDetails', userController.userDetails);

// userRoute.post('/editProfile',userController.editProfile)

module.exports = userRoute;