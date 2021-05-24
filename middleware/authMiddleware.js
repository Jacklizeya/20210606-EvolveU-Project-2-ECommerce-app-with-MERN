const jwt = require("jsonwebtoken")
const {User} = require("../models/userModel")
const asyncHandler = require("express-async-handler")
const mongoose = require("mongoose")

//  In this middleware, they know which one is the next
const protect = asyncHandler (async(req, res, next) => {
    console.log("entering protect")
    let token
    console.log(req.headers.authorization)
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

        console.log("token found")
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)
            console.log(typeof User.findById)
            req.user = await User.findById(decoded.id).select("-password")
            // add more info to the request object
            console.log(req.user)
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error("Not authorized, token failed")
        }
    }
    
    if (!token) {res.status(401); throw newError("not authorized, no token")}
})

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin){ next()} else {res.status(401); throw new Error("not authorized as admin")}
}

module.exports = {protect, admin}