import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productCreateReviewReducer, productTopRatedReducer, productUpdateInStockReducer } from "./reducers/productReducer"
import { cartReducer } from "./reducers/cartReducer"
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from "./reducers/userReducer"
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, orderListAllReducer, orderDeliverReducer } from "./reducers/orderReducer"

const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderListAll: orderListAllReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productCreateReview: productCreateReviewReducer,
    productTopRated: productTopRatedReducer,
    productUpdateInStock: productUpdateInStockReducer,
})

// This is from Cache
const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
const shippingAddressFromStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {}
const initalState = { cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage }, userLogin: { userInfo: userInfoFromStorage } }

const middleware = [thunk]

const store = createStore(
    rootReducer,
    initalState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store