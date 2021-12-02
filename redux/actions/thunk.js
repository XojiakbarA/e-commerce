import { fetchBanners, fetchBrands, fetchCategories, fetchNewProducts, fetchProduct, fetchSearchResults, fetchUser } from '../../api/api'
import { setCats, setBrands, setBanners, setNewProducts, setProduct, setSearchProducts, setUser } from './main'

export const getUser = async (dispatch) => {
    try {
        const res = await fetchUser()
        if (res.status === 200) {
            dispatch(setUser(res.data))
        }
    } catch (e) {
        console.log(e)
    }
}

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
        dispatch(setBrands([{id: 1, title: 'server is offline'}]))
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

export const getSearchResults = async (query, dispatch) => {
    try {
        const res = await fetchSearchResults(query)
        dispatch(setSearchProducts(res.data))
    } catch (e) {
        dispatch(setSearchProducts({id: 1, title: 'server is offline', price: 'server is offline'}))
        console.log(e.errno, e.code)
    }
}