const mongoose = require('mongoose')

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/SkyGoal?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2");

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database Connected');
  })