import * as type from '../types'
import { fetchBanners, fetchCategories, fetchNewProducts } from '../../api/api'

export const setCats = (cats) => ({
    type: type.SET_CATS,
    payload: cats
})

export const setBanners = (banners) => ({
    type: type.SET_BANNERS,
    payload: banners
})

export const setNewProducts = (products) => ({
    type: type.SET_NEW_PRODUCTS,
    payload: products
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

export const getCategories = async (dispatch) => {
    try {
        const res = await fetchCategories()
        dispatch(setCats(res.data))
    } catch (e) {
        dispatch(setCats([{id: 1, title: 'server is offline'}]))
        console.log(e.errno, e.code)
    }
}

export const getBanners = async (dispatch) => {
    try {
        const res = await fetchBanners()
        dispatch(setBanners(res.data))
    } catch (e) {
        dispatch(setBanners([{id: 1, title: 'server is offline', image: 'server is offline'}]))
        console.log(e.errno, e.code)
    }
}

export const getNewProducts = async (dispatch) => {
    try {
        const res = await fetchNewProducts()
        dispatch(setNewProducts(res.data.data))
    } catch (e) {
        dispatch(setNewProducts([{id: 1, title: 'server is offline', price: 'server is offline'}]))
        console.log(e.errno, e.code)
    }
}