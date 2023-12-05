const mongoose = require('mongoose')
require('dotenv').config();

const mongourl = process.env.MONGO_CLOUD_URL

mongoose.set("strictQuery", true);
mongoose.connect(mongourl);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database Connected');
  })