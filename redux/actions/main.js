import * as type from '../types'

export const setCat = (cats) => ({
    type: type.SET_CAT,
    payload: cats
})

export const openCartSidebar = () => ({
    type: type.OPEN_CART_SIDEBAR
})

export const closeCartSidebar = () => ({
    type: type.CLOSE_CART_SIDEBAR
})

export const openLoginDialog = () => ({
    type: type.OPEN_LOGIN_DIALOG
})

export const closeLoginDialog = () => ({
    type: type.CLOSE_LOGIN_DIALOG
})