import {
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,
    ORDER_DETAILS_REQUEST, 
    ORDER_DETAILS_SUCCESS, 
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST, 
    ORDER_PAY_SUCCESS, 
    ORDER_PAY_FAIL,
     
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL ,
    ORDER_LIST_ALL_REQUEST,
    ORDER_LIST_ALL_SUCCESS,
    ORDER_LIST_ALL_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    
} from "../constants/orderConstants"
import {CART_RESET} from "../constants/cartConstants"
import axios from "axios"
              
export const createOrder = (cart) => async (dispatch, getState) => {
    console.log("Entering Thunk")
    try {
        // Initiate request
        console.log("I am going to create order")
        console.log("entering the try path")    
        dispatch({ type: ORDER_CREATE_REQUEST })
        console.log("1st dispatch sent")
        // This is double destruction
        const  {userLogin: {userInfo}} = getState() 
        console.log(`userInfo`, userInfo)
        console.log("The cart is" , cart)
        console.log("token", userInfo.token)
        // can I try useSelector here instead of getState? no, this is a function, not React Component
        // that is why I have to use GetState to get more info
        // Make real request to database
        const {data} = await axios.post("/api/orders", cart, {headers : {"Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`}} )
        console.log("reply from database", data)
        dispatch({ type: ORDER_CREATE_SUCCESS, payload : data})
        console.log("order_create_success")
        // clean up the cart since order is placed
        dispatch({ type: CART_RESET})
        localStorage.setItem("cartItems", "")
        console.log("I finish create Order")
    } catch (error) {
        console.log("entering error path")
        dispatch({type: ORDER_CREATE_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})
    }
}


export const getOrderDetails = (id) => async (dispatch, getState) => {
    console.log("Entering get Order details****")
    try {
        // Initiate request
        console.log("entering the try path of get order details")    
        dispatch({ type: ORDER_DETAILS_REQUEST })
        console.log("1st dispatch sent")
        // This is double destruction
        const  {userLogin: {userInfo}} = getState() 
       
        // can I try useSelector here instead of getState? no, this is a function, not React Component
        // that is why I have to use GetState to get more info
        // Make real request to database
        console.log(`/api/orders/${id}`)
        const {data} = await axios.get(`/api/orders/${id}` , {headers : {"Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`}} )
        console.log("reply from database get order detail by id", data)
        
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload : data})
        
        console.log("order details updated")
    } catch (error) {
        console.log("entering error path")
        dispatch({type: ORDER_DETAILS_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    console.log("Entering Pay Order")
    try {
        // Initiate request
        console.log("entering the try path")    
        dispatch({ type: ORDER_PAY_REQUEST })
        console.log("1st dispatch sent")
        // This is double destruction
        const  {userLogin: {userInfo}} = getState() 
       
        // Update backend server record
        const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResult , {headers : {"Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`}} )
        console.log("reply from database", data)
        dispatch({ type: ORDER_PAY_SUCCESS, payload : data})
        dispatch({ type: ORDER_CREATE_RESET})
        console.log("I updated Redux state")
    } catch (error) {
        console.log("entering error path")
        dispatch({type: ORDER_PAY_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    console.log("Entering Pay Order")
    try {
        // Initiate request
        console.log("entering the try path")    
        dispatch({ type: ORDER_LIST_MY_REQUEST })
        console.log("1st dispatch sent")
        // This is double destruction
        const  {userLogin: {userInfo}} = getState() 
       
        // Update backend server record
        const {data} = await axios.get("/api/orders/myorders", {headers : {"Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`}} )
        console.log("reply from database", data)
        dispatch({ type: ORDER_LIST_MY_SUCCESS, payload : data})
        console.log("I updated Redux state")
    } catch (error) {
        console.log("entering error path")
        dispatch({type: ORDER_LIST_MY_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})
    }
}

export const listAllOrders = () => async (dispatch, getState) => {
    console.log("Entering Pay Order")
    try {
        // Initiate request
        console.log("entering the try path")    
        dispatch({ type: ORDER_LIST_ALL_REQUEST })
        console.log("1st dispatch sent")
        // This is double destruction
        const  {userLogin: {userInfo}} = getState() 
       
        // Update backend server record
        const {data} = await axios.get('/api/orders', {headers : {"Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`}} )
        console.log("reply from database", data)
        dispatch({ type: ORDER_LIST_ALL_SUCCESS, payload : data})
        console.log("I updated Redux state")
    } catch (error) {
        console.log("entering error path")
        dispatch({type: ORDER_LIST_ALL_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    console.log("Entering DELIVER Order")
    try {
        // Initiate request
        console.log("entering the try path")    
        dispatch({ type: ORDER_DELIVER_REQUEST })
        console.log("1st dispatch sent")
        // This is double destruction
        const  {userLogin: {userInfo}} = getState() 
       
        // Update backend server record
        console.log(userInfo.token)
        const {data} = await axios.put(`/api/orders/${order._id}/deliver`, {}, {headers : {"Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`}} )
        console.log("reply from database", data)
        dispatch({ type: ORDER_DELIVER_SUCCESS, payload : data})
        console.log("I updated Redux state")
    } catch (error) {
        console.log("entering error path")
        dispatch({type: ORDER_DELIVER_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})
    }
}