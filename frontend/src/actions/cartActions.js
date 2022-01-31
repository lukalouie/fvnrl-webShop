import axios from "axios"
import { CART_ADD_ITEM, CART_PAID, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants"

export const addToCart = (id, size) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)


    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            typeID: data.typeID,
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countAndSize: data.countAndSize,
            size
        }
    })

    

    /*switch(size) {
        case "xs":
            try {
                await Product.updateMany( { typeID: data.typeID }, {
                    $inc: { count: 1 }
                  }).exec()
            }
    }*/

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
    
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem("shippingAddress", JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem("paymentMethod", JSON.stringify(data))
}

export const cartPaid = () => (dispatch) => {
    
    dispatch({
        type: CART_PAID
    })

    localStorage.removeItem("cartItems")
}
