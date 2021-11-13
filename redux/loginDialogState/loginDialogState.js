import { createSlice } from "@reduxjs/toolkit"

export const loginDialogStateSlice = createSlice({
    name: 'loginDialogState',
    initialState: {
        value: false
    },
    reducers: {
        dialogOpen: (state) => { state.value = true },
        dialogClose: (state) => { state.value = false }
    }
})

export const { dialogOpen, dialogClose } = loginDialogStateSlice.actions

export default loginDialogStateSlice.reducer