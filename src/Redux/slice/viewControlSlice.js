import { createSlice } from "@reduxjs/toolkit";
import { MENU_ITEMS } from "@/constants";

const initialState = {
    zoom: 1
}

export const menuSlice = createSlice({
    name: 'viewControl',
    initialState,
    reducers: {
        setZoom: (state, action) => {
            state.zoom = action.payload;
        },
    }
})

export const {setZoom} = menuSlice.actions

export default menuSlice.reducer