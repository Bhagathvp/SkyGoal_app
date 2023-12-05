const express = require('express')
const userRoute = express()
const userController = require("../controllers/userController")
const authenticator = require('../middleware/authMiddleware')
const multer = require('../middleware/multer')

userRoute.post("/", userController.registerUser);

userRoute.post('/login',userController.loginUser);

userRoute.use(authenticator);

userRoute.get('/userDetails', userController.userDetails);

userRoute.post('/editProPic',multer.upload.single('image'),userController.editProPic)

module.exports = userRoute;