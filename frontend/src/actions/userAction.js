import axios from "axios"
import {
    USER_LOGIN_REQEUST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAIL, 
    USER_LOGOUT,
    USER_REGISTER_REQEUST, 
    USER_REGISTER_SUCCESS, 
    USER_REGISTER_FAIL,
    USER_LIST_REQEUST, 
    USER_LIST_SUCCESS, 
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DETAILS_REQEUST, 
    USER_DETAILS_SUCCESS, 
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQEUST, 
    USER_UPDATE_PROFILE_SUCCESS, 
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_DELETE_REQEUST, 
    USER_DELETE_SUCCESS, 
    USER_DELETE_FAIL,
    USER_UPDATE_REQEUST, 
    USER_UPDATE_SUCCESS, 
    USER_UPDATE_FAIL,
    
} from "../constants/userConstant" 

import {ORDER_LIST_MY_RESET} from "../constants/orderConstants" 

export const login = (email, password) => async (dispatch) => {
    try {
        // Initiate request
        dispatch({ type: USER_LOGIN_REQEUST })
        // Make real request to database
        const {data} = await axios.post("api/users/login", {email, password}, {headers : {"Content-Type": "application/json"}} )
        dispatch({ type: USER_LOGIN_SUCCESS, payload : data})
        localStorage.setItem("UserInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({type: USER_LOGIN_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})
    }
}

export const logout = ( ) => async (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_DETAILS_RESET})
    dispatch({type: USER_UPDATE_PROFILE_RESET})
    dispatch({type: ORDER_LIST_MY_RESET})
    dispatch({type: USER_LIST_RESET})
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        // Initiate request
        dispatch({ type: USER_REGISTER_REQEUST })
        // Make real request to database
        const {data} = await axios.post("api/users", {name, email, password}, {headers : {"Content-Type": "application/json"}} )
        dispatch({ type: USER_REGISTER_SUCCESS, payload : data})
        dispatch({ type: USER_LOGIN_SUCCESS, payload : data})
        localStorage.setItem("UserInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({type: USER_REGISTER_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})
    }
}

//  get User Details, go to api/users/profile
export const getUserDetails = (inputInfo) => async (dispatch, getState) => {
    console.log("I am going to getUserDetails")
    try {
        // Initiate request
        dispatch({ type: USER_DETAILS_REQEUST })
        // This is double destruction
        const  {userLogin: {userInfo}} = getState() 
        // can I try useSelector here instead of getState? no, this is a function, not React Component
        // that is why I have to use GetState to get more info
        // Make real request to database
        
        const {data} = await axios.get(`/api/users/${inputInfo}`, {headers : {"Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`}} )
        dispatch({ type: USER_DETAILS_SUCCESS, payload : data})
        console.log("I got user details now")
    } catch (error) {
        dispatch({type: USER_DETAILS_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})
    }
}


export const updateUserProfile = (user) => async (dispatch, getState) => {
    console.log("I am going to getUserDetails")
    try {
        // Initiate request
        dispatch({ type: USER_UPDATE_PROFILE_REQEUST })
        // This is double destruction
        const  {userLogin: {userInfo}} = getState() 
        
        // can I try useSelector here instead of getState? no, this is a function, not React Component
        // that is why I have to use GetState to get more info
        // Make real request to database
        const {data} = await axios.put(`/api/users/profile`, user, {headers : {"Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`}} )
        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload : data})
        dispatch({ type: USER_LOGIN_SUCCESS, payload : data})

        localStorage.setItem("userInfo", JSON.stringify(data))
        console.log("I got user UPDATE_PROFILE now")
    } catch (error) {
        dispatch({type: USER_UPDATE_PROFILE_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})
    }
}


export const listUsers = () => async (dispatch, getState) => {
    console.log("I am going to getUserDetails")
    try {
        // Initiate request
        dispatch({ type: USER_LIST_REQEUST })
        // This is double destruction
        const  {userLogin: {userInfo}} = getState() 
        

        const {data} = await axios.get(`/api/users`,{headers : {"Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`}} )
        dispatch({ type: USER_LIST_SUCCESS, payload : data})
        console.log("I got user LIST now")
    } catch (error) {
        dispatch({type: USER_LIST_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})
    }
}
// Register/Login/Update/Logout

export const deleteUsers = (id) => async (dispatch, getState) => {
    console.log("I am going to getUserDetails")
    try {
        // Initiate request
        dispatch({ type: USER_DELETE_REQEUST })
        // This is double destruction
        const  {userLogin: {userInfo}} = getState() 
        

        await axios.delete(`/api/users/${id}`,{headers : {"Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`}} )
        dispatch({ type: USER_DELETE_SUCCESS})
        console.log("I got user DELETE now")
    } catch (error) {
        dispatch({type: USER_DELETE_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})
    }
}

export const updateUsers = (user) => async (dispatch, getState) => {
    console.log("I am going to getUserDetails")
    try {
        // Initiate request
        dispatch({ type: USER_UPDATE_REQEUST })
        // This is double destruction
        const  {userLogin: {userInfo}} = getState() 
        

        const data = await axios.put(`/api/users/${user._id}`, user, {headers : {"Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`}} )
        dispatch({ type: USER_UPDATE_SUCCESS})
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data})
        console.log("I got user UPDATE now")
    } catch (error) {
        dispatch({type: USER_UPDATE_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})
    }
}