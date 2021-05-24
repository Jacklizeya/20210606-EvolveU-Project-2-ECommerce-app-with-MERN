const notFound = function(req, res, next) { 
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404)
    next(error)
  }

//  Bad internet access
const errorHandler = function(err, req, res, next) {
    // set locals, only providing error in development
    const statusCode = res.statusCode === 200? 500: res.statusCode;
    res.status(statusCode)
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "production"? null: err.stack
    })
  }

module.exports = {notFound, errorHandler}