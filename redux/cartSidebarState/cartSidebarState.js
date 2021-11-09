import { createSlice } from "@reduxjs/toolkit"

export const cartSidebarStateSlice = createSlice({
    name: 'cartSidebarState',
    initialState: {
        value: false
    },
    reducers: {
        cartOpen: (state) => { state.value = true },
        cartClose: (state) => { state.value = false }
    }
})

export const {cartOpen, cartClose} = cartSidebarStateSlice.actions

export default cartSidebarStateSlice.reducer