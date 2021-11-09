import { configureStore } from '@reduxjs/toolkit'
import cartSidebarStateReducer from './cartSidebarState/cartSidebarState'

export default configureStore({
    reducer: {
        cartSidebarState: cartSidebarStateReducer
    }
})