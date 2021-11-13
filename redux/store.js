import { configureStore } from '@reduxjs/toolkit'
import cartSidebarStateReducer from './cartSidebarState/cartSidebarState'
import loginDialogStateReducer from './loginDialogState/loginDialogState'

export default configureStore({
    reducer: {
        cartSidebarState: cartSidebarStateReducer,
        loginDialogState: loginDialogStateReducer
    }
})