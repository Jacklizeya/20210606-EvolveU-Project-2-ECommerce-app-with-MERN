const {User} = require("../models/userModel")
const asyncHandler = require("express-async-handler")
const {generateToken} = require("../utils/generateToken") 
const mongoose = require("mongoose")

// @desc   Authorize user, ultimatly the token
// @route  POST API/user/login
// @access Public
const authUser = asyncHandler (async (req, res, next) => {
    const {email, password} = req.body
    const user = await User.findOne({email});
    console.log(user)
    console.log(typeof user.matchPassword)
    if (user && (await user.matchPassword(password))) {res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
    })} else {res.status(401); throw new Error("Invaild email or password")}
    })

// @desc   GET user profile
// @route  GET API/users/profile
// @access ***Private***
const getUserProfile = asyncHandler (async (req, res, next) => {
    console.log("enter the function")
    const user = await User.findById(req.user._id)
    if (user) {res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    })} else {res.status(404); throw new Error("User not found")}
    })    

// @desc   GET user profile
// @route  PUT API/users/profile
// @access ***Private***
const updateUserProfile = asyncHandler (async (req, res, next) => {
    console.log("enter the function")
    const user = await User.findById(req.user._id)
    if (user) {
        console.log(`the information passed from frontend is ${req.body}` )
        console.log(Object.keys(req.body), Object.values(req.body))
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {user.password = req.body.password}
        const updateUser = await user.save()

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser._id)
        })

    } else {res.status(404); throw new Error("User not found")}
    })  



// @desc   Register a new user
// @route  GET API/users/register
// @access ***Private***
const registerUser = asyncHandler (async (req, res, next) => {
    console.log("enter the register funciton")
    const {name, email, password} = req.body
    const userExists = await User.findOne({email})
    if (userExists) {res.status(400); throw new Error("User already exists")} else {

    const user = await User.create({
        name, email, password
    })

    if (user) {res.status(201).json(
        { _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,}
    )} else {res.status(400); throw new Error("Invalid User Data, failed to create")}
    }
    })    


// @desc   GET all users
// @route  GET API/users/profile
// @access ***Private/Admin
const getUsers = asyncHandler (async (req, res, next) => {     
    const users = await User.find({})
    res.json(users)
    })    


// @desc   Delete a user
// @route  delete API/users/profile
// @access ***Private/Admin
const deleteUser = asyncHandler (async (req, res, next) => {     
    const user = await User.findById(req.params.id)
    if (user) {await user.remove(); res.json({message: "user removed"})} else {res.status(404); throw new Error("user not found")}
    })    


// @desc   GET userBy Id
// @route  GET API/users/:id
// @access ***Private/Admin
const getUserById = asyncHandler (async (req, res, next) => {     
    const user = await User.findById(req.params.id).select("-password")
    if (user) {res.json(user)} else {res.status(404); throw new Error("user not found")}
    })  


// @desc   GET user profile
// @route  PUT API/users/:id
// @access ***Private / Admin***
const updateUser= asyncHandler (async (req, res, next) => {
    console.log("enter the function")
    const user = await User.findById(req.params.id)
    if (user) {
        console.log(`the information passed from frontend is ${req.body}` )
        console.log(Object.keys(req.body), Object.values(req.body))
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin 
        const updateUser = await user.save()

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            
        })

    } else {res.status(404); throw new Error("User not found")}
    }) 


module.exports = {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser}