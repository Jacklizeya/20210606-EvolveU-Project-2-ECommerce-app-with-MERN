/***************Database portion here */
var mongoose = require("mongoose")
require("colors")
//  if I want to try local: 1. start server 2. start T3 3. change url "mongodb://localhost:27017/fullStackWar"
var mongoDBAtlasUrl = "backupURL"
//To connect action: *First option url         backup option ulr */
mongoose.connect(process.env.MONGODB_URL || mongoDBAtlasUrl, { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false })

// This is to monitor the conncection
var databaseconnection = mongoose.connection
databaseconnection.on("connected", ()=> {console.log("MongoDB database connected!".cyan.underline)})
databaseconnection.on('error', console.error.bind(console, 'MongoDB connection error:'.red.underline.bold))
