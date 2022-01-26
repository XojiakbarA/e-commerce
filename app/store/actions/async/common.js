import {
    fetchBanners, fetchBrands, fetchCategories, fetchDistricts,
    fetchProduct, fetchProducts, fetchRegions, fetchShop,
    fetchShopProducts, fetchShops
} from '../../../../api/common'
import {
    setCats, setBrands, setBanners, setProduct, setShops,
    setShop, setLoading, setRegions, setDistricts,
    setDistrictFetching, setProducts
} from '../actionCreators'

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
            dispatch(setProducts(res.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const getShopProducts = (id, query) => {
    return async (dispatch) => {
        try {
            const res = await fetchShopProducts(id, query)
            if (res.status === 200) {
                dispatch(setProducts(res.data))
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

export const getRegions = () => {
    return async (dispatch) => {
        try {
            const res = await fetchRegions()
            if (res.status === 200) {
                dispatch(setRegions(res.data.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const getDistricts = (id) => {
    return async (dispatch) => {
        try {
            dispatch(setDistrictFetching(true))
            const res = await fetchDistricts(id)
            if (res.status === 200) {
                dispatch(setDistricts(res.data.data))
                dispatch(setDistrictFetching(false))
            }
        } catch (e) {
            console.log(e)
        }
    }
}