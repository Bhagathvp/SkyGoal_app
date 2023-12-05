const express = require("express");
const app = express();
const cors = require('cors')
require('./config/database')
const mongoSanitize = require('express-mongo-sanitize');
const userRoute = require('./routes/userRoute')

app.use(cors({
    origin:["http://localhost:3000","http://localhost:3001"]
}))

app.use(mongoSanitize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//for user routes
app.use("/api/", userRoute);

app.listen(5500, ()=>{
    console.log("server running @ 5500");
})