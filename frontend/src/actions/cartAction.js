import axios from "axios"
import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD} from "../constants/cartConstants"

export const addToCart = (id, qty) => {
    return async(dispatch, getState) => {
        const {data} = await axios.get(`/api/products/${id}`)
        // console.log("id and qty", id, qty, typeof(qty))
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty: Number(qty)
                // this is a shorthand
            },
        })
//      this sounds like a cache
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
    }
}

export const removeFromCart = (id) => {
    return async(dispatch, getState) => {    
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: id},
        )
//      this sounds like a cache
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
    }
}

export const savingShippingAddress = (data) => {
    return async(dispatch) => {    
        dispatch({
            type: CART_SAVE_SHIPPING_ADDRESS,
            payload: data},
        )
//      this sounds like a cache
        localStorage.setItem("shippingAddress", JSON.stringify(data))
    }
}

export const savePaymentMethod = (data) => {
    return async(dispatch) => {    
        dispatch({
            type: CART_SAVE_PAYMENT_METHOD,
            payload: data},
        )
//      this sounds like a cache
        localStorage.setItem("paymentMethod", JSON.stringify(data))
    }
}