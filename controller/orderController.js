const {Order} = require("../models/orderModel")
const asyncHandler = require("express-async-handler")
const mongoose = require("mongoose")


// @desc   Create New Order
// @route  POST API/orders
// @access Private
const addOrderItems = asyncHandler (async (req, res, next) => {
    console.log("entering backend controller add order items")
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body
    if (orderItems && orderItems.length ===0 ) { res.status(400); throw new Error ("no order Items"); return } 
    else {
        const order = new Order({
            orderItems,
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice,
            user: req.user._id
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
    })


// @desc   GET Order by ID
// @route  get API/orders/:ID
// @access Private    
const getOrderById = asyncHandler (async (req, res, next) => {
    console.log("getorderby id")
    const order = await Order.findById(req.params.id).populate("user", "name email")  // add more information refer to other collections

    if (order) {res.json(order)} else {res.status(404); throw new Error("order not found")}
    })


// @desc   Update order to paid
// @route  get API/orders/:ID/pay
// @access Private    
const updateOrderToPaid = asyncHandler (async (req, res, next) => {
    console.log("entering update Order to pay")
    const order = await Order.findById(req.params.id)   // add more information refer to other collections

    if (order) {
        order.isPaid = true; 
        order.paidAt = Date.now(); 
        order.paymentResult = {
                    id: req.body.id,
                    status: req.body.status,
                    update_time: req.body.update_time,
                    email_address: req.body.payer.email_address
                        };
        const updatedOrder = await order.save()
         res.json(updatedOrder)} else {res.status(404); throw new Error("order not found")}
    })

// @desc   get loggedin user order
// @route  get api/orders/myorders
// @access Private   


const getMyOrders = asyncHandler (async (req, res, next) => {
    console.log("entering get my orders")
    const orders = await Order.find ({user: req.user._id})   // add more information refer to other collections
    res.json(orders)
    })


// @desc   get loggedin user order
// @route  get api/orders
// @access Private  / admin
const getOrders = asyncHandler (async (req, res, next) => {
    console.log("entering get my orders")
    const orders = await Order.find ({}).populate("user", "id name")   // add more information refer to other collections
    res.json(orders)
    })


// @desc   Update order to delivered
// @route  get API/orders/:ID/delivered
// @access Private    
const updateOrderToDelivered = asyncHandler (async (req, res, next) => {
    console.log("entering update Order to pay")
    const order = await Order.findById(req.params.id)   // add more information refer to other collections

    if (order) {
        order.isDelivered = true; 
        order.deliveredAt = Date.now(); 
       
        const updatedOrder = await order.save()
        res.json(updatedOrder)} else {res.status(404); throw new Error("order not found")}
    })    

module.exports = {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered}