import {createSlice} from "@reduxjs/toolkit"

const productSlice = createSlice({
    name:"product",
    initialState: {
        list: [],
        isFetching: false,
        error: false,
    },
    reducers:{
      //GET ALL
      getProductStart:(state) => {
        state.isFetching = true
        state.error = false
      },
      getProductSuccess:(state, action) => {
        state.isFetching = false
        state.list = action.payload
      },
      getProductFailure:(state) => {
        state.isFetching = false
        state.error = true
      },
      //DELETE METHODS
      deleteProductStart:(state) => {
        state.isFetching = true
        state.error = false
      },
      deleteProductSuccess:(state, action) => {
        state.isFetching = false
        state.list.splice(
          state.list.findIndex((item) => item._id === action.payload), 1
        )
      },
      deleteProductFailure:(state) => {
        state.isFetching = false
        state.error = true
      },
      //UPDATE METHODS
      updateProductStart:(state) => {
        state.isFetching = true
        state.error = false
      },
      updateProductSuccess:(state, action) => {
        state.isFetching = false
        state.list[state.list.findIndex((item) => item._id === action.payload.id)] = action.payload.user
      },
      updateProductFailure:(state) => {
        state.isFetching = false
        state.error = true
      },
            //UPDATE METHODS
      updateProductStart:(state) => {
        state.isFetching = true
        state.error = false
      },
      updateProductSuccess:(state, action) => {
        state.isFetching = false
        state.list[state.list.findIndex((item) => item._id === action.payload.id)] = action.payload.product
      },
      updateProductFailure:(state) => {
        state.isFetching = false
        state.error = true
      },
      //CREATE
      addProductStart:(state) => {
        state.isFetching = true
        state.error = false
      },
      addProductSuccess:(state, action) => {
        state.isFetching = false
        state.list.push(action.payload)
      },
      addProductFailure:(state) => {
        state.isFetching = false
        state.error = true
      },
    },
})

export const { 
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
} = productSlice.actions

export default productSlice.reducer