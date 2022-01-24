import axios from 'axios'

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/'
})

export const setToken = async () => {
    await instance.get('sanctum/csrf-cookie')
}

export const fetchCategories = async () => {
    return await instance.get('api/categories')
}

export const fetchBrands = async () => {
    return await instance.get('api/brands')
}

export const fetchBanners = async () => {
    return await instance.get('api/banners')
}

export const fetchProduct = async (id) => {
    return await instance.get(`api/products/${id}`)
}

export const fetchProducts = async (query) => {
    return await instance.get('api/products', {
        params: query
    })
}

export const fetchShops = async (query) => {
    return await instance.get('api/shops', {
        params: query
    })
}

export const fetchShop = async (id) => {
    return await instance.get(`api/shops/${id}`)
}

export const fetchShopProducts = async (id, query) => {
    return await instance.get(`api/shops/${id}/products`, {
        params: query
    })
}

export const fetchRegions = async () => {
    return await instance.get('api/regions')
}

export const fetchDistricts = async (id) => {
    return await instance.get(`api/regions/${id}/districts`)
}

export const fetchReviews = async (id) => {
    return await instance.get(`api/products/${id}/reviews`)
}

export const storeReview = async (id, data) => {
    return await instance.post(`api/products/${id}/reviews`, data)
}