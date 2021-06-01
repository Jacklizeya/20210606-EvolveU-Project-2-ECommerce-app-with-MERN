import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, 
    PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, 
    PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, 
    PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, 
    PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS, PRODUCT_TOP_FAIL,
    PRODUCT_UPDATE_INSTOCK_REQUEST, PRODUCT_UPDATE_INSTOCK_SUCCESS, PRODUCT_UPDATE_INSTOCK_FAIL,
} from "../constants/productConstants"

import axios from "axios"


export const listProducts = (keyword = "", pageNumber = "", category= "") => async(dispatch) => {
    try {
        // console.log("enter thunk")
        dispatch({type: PRODUCT_LIST_REQUEST})  //start loading
        const {data} = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}&category=${category}`)
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data}) // start displaying
        // console.log("exit thunk")
    }
    catch (error) {console.log(error)
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message}) // start displaying
    }
}

export const listProductDetails = (id) => async(dispatch) => {
    try {
        // console.log("enter thunk")
        dispatch({type: PRODUCT_DETAILS_REQUEST})  //start loading
        const {data} = await axios.get(`/api/products/${id}`)
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data}) // start displaying
        // console.log("exit thunk")
    }
    catch (error) {console.log(error)
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message}) // start displaying
    }

}

export const deleteProduct = (id) => async (dispatch, getState) => {
    console.log("Entering Pay Order")
    try {
        // Initiate request
        // console.log("entering the try path")    
        dispatch({ type: PRODUCT_DELETE_REQUEST })
        // console.log("1st dispatch sent")
        // This is double destruction
        const  {userLogin: {userInfo}} = getState() 
       
        // Update backend server record
        await axios.delete(`/api/products/${id}`, {headers : {"Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`}} )
        // console.log("reply from database")
        dispatch({ type: PRODUCT_DELETE_SUCCESS})
        // console.log("I updated Redux state")
    } catch (error) {
        console.log("entering error path")
        dispatch({type: PRODUCT_DELETE_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})
    }
}

export const createProduct = () => async (dispatch, getState) => {
    // console.log("Entering Pay Order")
    try {
        // Initiate request
        // console.log("entering the try path")    
        dispatch({ type: PRODUCT_CREATE_REQUEST })
        // console.log("1st dispatch sent")
        // This is double destruction
        const  {userLogin: {userInfo}} = getState() 
       
        // Update backend server record
        const {data} = await axios.post(`/api/products`, {}, {headers : {"Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`}} )
        // console.log("DATA From create", data)
        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data})
        // console.log("I send data to store")
    } catch (error) {
        // console.log("entering error path")
        dispatch({type: PRODUCT_CREATE_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    // console.log("Entering Pay Order")
    try {
        // Initiate request
        // console.log("entering the try path")    
        dispatch({ type: PRODUCT_UPDATE_REQUEST })
        // console.log("1st dispatch sent")
        // This is double destruction
        const  {userLogin: {userInfo}} = getState() 
       
        // Update backend server record
        const {data} = await axios.put(`/api/products/${product._id}`, product,  {headers : {"Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`}} )
        // console.log("reply from database")
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data})
        // console.log("I updated Redux state")
    } catch (error) {
        // console.log("entering error path")
        dispatch({type: PRODUCT_UPDATE_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})
    }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    // console.log("Entering Pay Order")
    try {
        // Initiate request
        // console.log("entering the try path")    
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })
        // console.log("1st dispatch sent")
        // This is double destruction
        const  {userLogin: {userInfo}} = getState() 
       
        // Update backend server record
         await axios.post(`/api/products/${productId}/reviews`, review ,  {headers : {"Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`}} )
        // console.log("reply from database")
        dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS})
        // console.log("I updated Redux state")
    } catch (error) {
        // console.log("entering error path")
        dispatch({type: PRODUCT_CREATE_REVIEW_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})
    }
}

export const listTopProducts = () => async(dispatch) => {
    try {
        // console.log("enter listop product thunk")
        dispatch({type: PRODUCT_TOP_REQUEST})  //start loading
        const {data} = await axios.get(`/api/products/top`)
        // console.log("data from backend", data)
        dispatch({type: PRODUCT_TOP_SUCCESS, payload: data}) // start displaying
        // console.log("data in top", data)
        // console.log("exit thunk")
    }
    catch (error) {console.log(error)
        dispatch({type: PRODUCT_TOP_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message}) // start displaying
    }
}

export const updateProductInStock = (product) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_UPDATE_INSTOCK_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(
        `/api/products/${product._id}/stock`,
        product,
        config
      );
  
      dispatch({
        type: PRODUCT_UPDATE_INSTOCK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_INSTOCK_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  