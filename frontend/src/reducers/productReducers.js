
import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_CREATE_RESET, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_REQUEST, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_RESET} from "../constants/productConstants"




export const productListReducer = function(state = {products: []}, action) {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: []}
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload } // action payloadom napunit products
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload } // bacit error 
        default:
            return state //mora bit def
    }
}

export const productDetailsReducer = function(state = {product: { reviews: [] }}, action) { 
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state } //no need to ask - he's a spreeeeeeead operator
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productDeleteReducer = function(state = {}, action) { 
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true}
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productCreateReducer = function(state = {}, action) { 
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true}
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const productUpdateReducer = function(state = {product: {}}, action) { 
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true}
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_UPDATE_RESET:
            return {product: {}}
        default:
            return state
    }
}

/*export const productSizeReducer = function(state = {products: []}, action) {
    switch (action.type) {
        case PRODUCT_SIZE_DEC_REQUEST:
            return { loading: true, products: []}
        case PRODUCT_SIZE_DEC_SUCCESS:
            return { loading: false, products: action.payload } 
        case PRODUCT_SIZE_DEC_FAIL:
            return { loading: false, error: action.payload } // bacit error 
        default:
            return state //mora bit def
    }
}*/

