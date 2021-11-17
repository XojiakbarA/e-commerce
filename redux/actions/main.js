import * as type from '../types'
import { fetchBanners, fetchCategories } from '../../api/api'

export const setCat = (cats) => ({
    type: type.SET_CAT,
    payload: cats
})

export const setBanners = (banners) => ({
    type: type.SET_BANNERS,
    payload: banners
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
        dispatch(setCat(res.data))
    } catch (e) {
        dispatch(setCat([{id: 1, title: 'server is offline'}]))
        console.log(e.errno, e.code)
    }
}

export const getBanners = async (dispatch) => {
    try {
        const res = await fetchBanners()
        dispatch(setBanners(res.data))
    } catch (e) {
        console.log(e.errno, e.code)
    }
}