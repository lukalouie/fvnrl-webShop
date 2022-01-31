import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer } from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import { userAdminUpdateReducer, userDeleteReducer, userLoginReducer, userUpdateReducer } from "./reducers/userReducers"
import { userRegisterReducer, userListReducer } from "./reducers/userReducers"
import { userDetailsReducer } from "./reducers/userReducers"
import { orderAdminListReducer, orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderPayReducer } from "./reducers/orderReducers"

const reducer = combineReducers({
    productList: productListReducer, //productList ce biti state (dio ukupnog statea)
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userAdminUpdate: userAdminUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderList: orderListReducer,
    adminOrderList: orderAdminListReducer
    //productSizes: productSizeReducer
})

const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

const shippingAddressFromStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {}

const paymentMethodFromStorage = localStorage.getItem("paymentMethod") ? JSON.parse(localStorage.getItem("paymentMethod")) : {}

const initialState = {
    cart: { cartItems: cartItemsFromStorage, 
            shippingAddress: shippingAddressFromStorage, },
    userLogin: { userInfo: userInfoFromStorage},
    //orderDetails: { orderItems: []}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
