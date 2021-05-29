  import {
        ORDER_CREATE_REQUEST, 
        ORDER_CREATE_SUCCESS, 
        ORDER_CREATE_FAIL,
        ORDER_DETAILS_REQUEST, 
        ORDER_DETAILS_SUCCESS, 
        ORDER_DETAILS_FAIL,
        ORDER_PAY_REQUEST, 
        ORDER_PAY_SUCCESS, 
        ORDER_PAY_FAIL,
        ORDER_PAY_RESET,
        ORDER_LIST_MY_REQUEST,
        ORDER_LIST_MY_SUCCESS,
        ORDER_LIST_MY_FAIL,
        ORDER_LIST_MY_RESET,
        ORDER_LIST_ALL_REQUEST,
        ORDER_LIST_ALL_SUCCESS,
        ORDER_LIST_ALL_FAIL,
        ORDER_DELIVER_REQUEST,
        ORDER_DELIVER_SUCCESS,
        ORDER_DELIVER_FAIL,
        ORDER_DELIVER_RESET,
    } from "../constants/orderConstants"

export const orderCreateReducer = (state = {} , action) => {
    switch(action.type) {
        case ORDER_CREATE_REQUEST    : {
            console.log("create request")
            return {loading: true}
        }
        case ORDER_CREATE_SUCCESS : {
            return { order: action.payload, loading: false , success: true}
        }
        case ORDER_CREATE_FAIL : {
            return {loading: false, error: action.payload}
        }       
        default: return state
    }
}

//* What is the best practise to design the initial point ??? */
export const orderDetailsReducer = (state = {order: [], shippingAddress: {}, loading: true} , action) => {
    switch(action.type) {
        case ORDER_DETAILS_REQUEST    : {
            console.log("DETAILS request")
            return {...state, loading: true}
        }
        case ORDER_DETAILS_SUCCESS : {
            return { order: action.payload, loading: false }
        }
        case ORDER_DETAILS_FAIL : {
            return {loading: false, error: action.payload}
        }       
        default: return state
    }
}

export const orderPayReducer = (state = {} , action) => {
    switch(action.type) {
        case ORDER_PAY_REQUEST    : {
            console.log("PAY request")
            return { loading: true}
        }
        case ORDER_PAY_SUCCESS : {
            return { loading: false,
                // there was one type here before
                      success: true
            }
        }
        case ORDER_PAY_FAIL : {
            return {loading: false, error: action.payload}
        }       
        case ORDER_PAY_RESET : {
            return { }
        }  
        default: return state
    }
}

//                                 why it has to be in this format?
export const orderListMyReducer = (state = {orders: []} , action) => {
    switch(action.type) {
        case ORDER_LIST_MY_REQUEST    : {
            console.log("LIST_MY request")
            return { loading: true}
        }
        case ORDER_LIST_MY_SUCCESS : {
            return { loading: false,
                     orders: action.payload
            }
        }
        case ORDER_LIST_MY_FAIL : {
            return {loading: false, error: action.load}
        }  
        case ORDER_LIST_MY_RESET : {
            return { orders: [] }
        }       
        default: return state
    }
}

export const orderListAllReducer = (state = { orders: []} , action) => {
    switch(action.type) {
        case ORDER_LIST_ALL_REQUEST    : {
            console.log("LIST_ALL request")
            return { loading: true}
        }
        case ORDER_LIST_ALL_SUCCESS : {
            return { loading: false,
                     orders: action.payload
            }
        }
        case ORDER_LIST_ALL_FAIL : {
            return {loading: false, error: action.load}
        }  
           
        default: return state
    }
}

export const orderDeliverReducer = (state = {} , action) => {
    switch(action.type) {
        case ORDER_DELIVER_REQUEST    : {
            console.log("DELIVER request")
            return { loading: true}
        }
        case ORDER_DELIVER_SUCCESS : {
            return { loading: false,
                     success: true
            }
        }
        case ORDER_DELIVER_FAIL : {
            return {loading: false, error: action.payload}
        }  
        case ORDER_DELIVER_RESET : {
            return { }
        }  
        default: return state
    }
}