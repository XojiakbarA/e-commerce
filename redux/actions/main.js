import * as type from '../types'

export const setCart = (cart) => ({
    type: type.SET_CART,
    payload: cart
})

export const setUser = (user) => ({
    type: type.SET_USER,
    payload: user
})

export const setCats = (cats) => ({
    type: type.SET_CATS,
    payload: cats
})

export const setBrands = (brands) => ({
    type: type.SET_BRANDS,
    payload: brands
})

export const setBanners = (banners) => ({
    type: type.SET_BANNERS,
    payload: banners
})

export const setNewProducts = (products) => ({
    type: type.SET_NEW_PRODUCTS,
    payload: products
})

export const setSearchProducts = (products) => ({
    type: type.SET_SEARCH_PRODUCTS,
    payload: products
})

export const setProduct = (product) => ({
    type: type.SET_PRODUCT,
    payload: product
})

export const toggleCartSidebar = () => ({
    type: type.TOGGLE_CART_SIDEBAR
})

export const toggleLoginDialog = () => ({
    type: type.TOGGLE_LOGIN_DIALOG
})

export const toggleRegisterDialog = (bool) => ({
    type: type.TOGGLE_REGISTER_DIALOG,
    payload: bool
})

export const openAccountMenu = (anchorEl) => ({
    type: type.OPEN_ACCOUNT_MENU,
    payload: anchorEl
})

export const closeAccountMenu = () => ({
    type: type.CLOSE_ACCOUNT_MENU
})

export const setLoading = (bool) => ({
    type: type.IS_LOADING,
    payload: bool
})

export const setSnackbar = (bool) => ({
    type: type.IS_OPEN_SNACKBAR,
    payload: bool
})

export const setReviews = (reviews) => ({
    type: type.SET_REVIEWS,
    payload: reviews
})