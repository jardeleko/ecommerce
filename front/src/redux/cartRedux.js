import {createSlice} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';

const cartSlice = createSlice({
    name:"cart",
    initialState: {
        products:[],
        quantity:0,
        total:0,
    },
    reducers:{
        addProduct:(state, action)=> {
            state.quantity += 1
            state.products.push(action.payload)
            state.total += action.payload.price * action.payload.quantity
        },
        resetSkill:(state, action) => {
            storage.removeItem('root')
            state.quantity = 0
            state.products = []
            state.total = 0
        }
    },
});

export const { addProduct, resetSkill } = cartSlice.actions;
export default cartSlice.reducer;