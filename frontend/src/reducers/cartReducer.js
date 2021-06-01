import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD, CART_RESET} from "../constants/cartConstants"

// This cartReducer didnot deal with Server and backend

export const cartReducer = (state = {cartItems: [], shippingAddress : {}} , action) => {
    switch(action.type) {
        case CART_ADD_ITEM    : {
            const item = action.payload  // this contains the information about what I want to buy
            // this contains the information about what I have in the cart already
            const existItem = state.cartItems.find(x => x.product === item.product)
//          return the first item that matches the criteria
            if (existItem) {
                return {...state, 
                    cartItems: state.cartItems.map(x => x.product === item.product? item : x )} // replace with payload or use the old one
            } else {return {...state, cartItems: [...state.cartItems, item]}}

        }
        case CART_REMOVE_ITEM : {
            return {...state, cartItems: state.cartItems.filter(x => x.product !== action.payload)}
        }
        case CART_SAVE_SHIPPING_ADDRESS : {
            return {...state, shippingAddress: action.payload}
        }
        case CART_SAVE_PAYMENT_METHOD : {
            return {...state, paymentMethod: action.payload}
        }
        // case CART_RESET: {
        //     return {cartItems: [], shippingAddress : {}}
        // }
        default: return state
    }



}