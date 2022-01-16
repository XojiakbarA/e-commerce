import { fetchBanners, fetchBrands, fetchCategories, fetchProduct, fetchProducts, fetchShop, fetchShopProducts, fetchShops } from '../../../api/api'
import { setCats, setBrands, setBanners, setProduct, setSearchProducts, setShops, setShop, setShopProducts, setLoading } from '..'

export const getCategories = () => {
    return async (dispatch) => {
        try {
            const res = await fetchCategories()
            dispatch(setCats(res.data.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const getBrands = () => {
    return async (dispatch) => {
        try {
            const res = await fetchBrands()
            dispatch(setBrands(res.data.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const getBanners = () => {
    return async (dispatch) => {
        try {
            const res = await fetchBanners()
            dispatch(setBanners(res.data.data))
        } catch (e) {
            dispatch(setBanners([{id: 1, title: 'server is offline', image: 'server is offline'}]))
            console.log(e.errno, e.code)
        }
    }
}

export const getProduct = (id) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await fetchProduct(id)
            dispatch(setProduct(res.data.data))
            dispatch(setLoading(false))
        } catch (e) {
            console.log(e)
        }
    }
}

export const getProducts = (query) => {
    return async (dispatch) => {
        try {
            const res = await fetchProducts(query)
            dispatch(setSearchProducts(res.data))
        } catch (e) {
            dispatch(setSearchProducts({id: 1, title: 'server is offline', price: 'server is offline'}))
            console.log(e.response.data)
        }
    }
}

export const getShopProducts = (id, query) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await fetchShopProducts(id, query)
            if (res.status === 200) {
                dispatch(setShopProducts(res.data))
                dispatch(setLoading(false))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const getShops = (query) => {
    return async (dispatch) => {
        try {
            const res = await fetchShops(query)
            if (res.status === 200) {
                dispatch(setShops(res.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const getShop = (id) => {
    return async (dispatch) => {
        try {
            const res = await fetchShop(id)
            if (res.status === 200) {
                dispatch(setShop(res.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

