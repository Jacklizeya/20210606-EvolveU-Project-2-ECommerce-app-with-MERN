var createError = require('http-errors');
var express = require('express');
require("colors")
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require("dotenv")
dotenv.config()
const morgan = require("morgan")


//  This is going to make the connection script running
require("./models/databaseSetup")


var indexRoutes = require('./routes/indexRoutes');
var usersRoutes = require('./routes/usersRoutes');
let productsRoutes = require("./routes/productsRoutes");
let orderRoutes = require("./routes/orderRoutes")
let uploadRoutes = require("./routes/uploadRoutes")

const {notFound, errorHandler} = require("./middleware/errorMiddleware");





var app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
} 


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');;

app.use(logger('dev'));
app.use(express.json()); // This will allow us to access json data in body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//  The sequence really matters
//  first option is backend router
app.get("/api/config/paypal", (req, res) => {console.log("paypal api");res.send(process.env.PAYPAL_CLIENT_ID)})
app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes)
//   this is the key for build folder in the frontend
// const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))
app.use(express.static((process.env.NODE_ENV === "production")? ("./frontend/build") : (path.join(__dirname, 'public'))))
// //  addinng this line in the deploy + refresh case, so it does not get lost when it is not started at the HomePage, this is a file path format
app.get("*", (req, res) => {res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"))})



//*******************The following 2 matches Video 24 as error handling middleware */
// catch 404 and forward to error handler 
app.use(notFound);

// error handler: This matches video 24 Udemy 
app.use(errorHandler);

module.exports = app;
