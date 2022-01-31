// sve akcije u vezin producta idu tu
import axios from "axios"
import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL} from "../constants/productConstants"  //actions

//action creator
export const listProducts = (typeID) =>  async function(dispatch) {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST}) //poziva prvu akciju

        const { data } = await axios.get("/api/products")

        

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        }) // pozovi drugu akciju, napuni datom productse
    }
    catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })  // odabiranje errora, bit ce common
    }
}

export const listProductDetails = (id) =>  async function(dispatch) {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST}) 

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        }) 
    }
    catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })  
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => { 
    
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const { userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        await axios.delete(`/api/products/${id}`, config) 

        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        })
             
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

export const createProduct = () => async (dispatch, getState) => { //creates sample product
    
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const { userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const { data } = await axios.post(`/api/products`, {}, config) //radimo post req, ali ne saljemo datu

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
             
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

export const updateProduct = (product) => async (dispatch, getState) => { //updates product
    
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const { userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const { data } = await axios.put(`/api/products/${product._id}`, product, config)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
             
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

/*export const productSizeDec = (typeID) =>  async function(dispatch) {
    try {
        dispatch({ type: PRODUCT_SIZE_DEC_REQUEST}) 

        const { data } = await axios.put(`/api/products/${typeID}`)

        console.log(data)

        dispatch({
            type: PRODUCT_SIZE_DEC_SUCCESS,
            payload: data
        }) 
    }
    catch (error) {
        dispatch({
            type: PRODUCT_SIZE_DEC_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })  
    }
}*/


