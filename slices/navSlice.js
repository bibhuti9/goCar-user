import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    price:0,
};

export const navSlice = createSlice({
    name:"nav",
    initialState,
    reducers:{
        setPrice:(state,action)=>{
            state.price=action.payload;
        }
    }
});

export const {setPrice}=navSlice.actions;

// Selector

export const selectPrice = (state)=>state.nav.price;

export default navSlice.reducer;
