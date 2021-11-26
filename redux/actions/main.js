import * as type from '../types'
import { fetchBanners, fetchBrands, fetchCategories, fetchNewProducts, fetchProduct, fetchSearchResults } from '../../api/api'

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
        dispatch(setCats(res.data.data))
    } catch (e) {
        dispatch(setCats([{id: 1, title: 'server is offline'}]))
        console.log(e.errno, e.code)
    }
}

export const getBrands = async (dispatch) => {
    try {
        const res = await fetchBrands()
        dispatch(setBrands(res.data.data))
    } catch (e) {
        dispatch(setCats([{id: 1, title: 'server is offline'}]))
        console.log(e.errno, e.code)
    }
}

export const getBanners = async (dispatch) => {
    try {
        const res = await fetchBanners()
        dispatch(setBanners(res.data.data))
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

export const getProduct = async (id, dispatch) => {
    try {
        const res = await fetchProduct(id)
        dispatch(setProduct(res.data.data))
    } catch (e) {
        dispatch(setProduct({id: 1, title: 'server is offline', price: 'server is offline'}))
        console.log(e.errno, e.code)
    }
}

export const getSearchResults = async (title, page, cat_id, sub_cat_id, dispatch) => {
    try {
        const res = await fetchSearchResults(title, page, cat_id, sub_cat_id)
        dispatch(setSearchProducts(res.data))
    } catch (e) {
        dispatch(setSearchProducts({id: 1, title: 'server is offline', price: 'server is offline'}))
        console.log(e.errno, e.code)
    }
}