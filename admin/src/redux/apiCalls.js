import {  
    loginStart, 
    loginSuccess, 
    loginFailure 
} from "./userRedux"
import { 
    getProductStart, 
    getProductSuccess,
    getProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure 
} from "./productRedux"

import { userRequest } from "../requestMethods"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    await userRequest.post("/auth/login", user).then((res) => {        
        dispatch(loginSuccess(res.data))       
    }).catch(() => {
        dispatch(loginFailure())
    })
}

export const getProducts = async (dispatch) => {
    dispatch(getProductStart())
    await userRequest.get("/products").then((res) => {        
        dispatch(getProductSuccess(res.data))       
    }).catch(() => {
        dispatch(getProductFailure())
    })
}

export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart())
    await userRequest.delete(`/products/${id}`).then((res) => {        
        dispatch(deleteProductSuccess(id))       
    }).catch(() => {
        dispatch(deleteProductFailure())
    })
}

export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart())
    await userRequest.put(`/products/${id}`, product).then((res) => {    
        dispatch(updateProductSuccess({id, product}))       
    }).catch(() => {
        dispatch(updateProductFailure())
    })
}

export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart())
    await userRequest.post('/products', product).then((res) => {        
        dispatch(addProductSuccess(res.data))       
    }).catch(() => {
        dispatch(addProductFailure())
    })
}

