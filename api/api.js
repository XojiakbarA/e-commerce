import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/api/'
})

export const fetchCategories = async () => {
    return await instance.get('categories')
}

export const fetchBrands = async () => {
    return await instance.get('brands')
}

export const fetchBanners = async () => {
    return await instance.get('banners')
}

export const fetchProduct = async (id) => {
    return await instance.get(`products/${id}`)
}

export const fetchProducts = async (query) => {
    return await instance.get('products/', {
        params: query
    })
}

export const fetchShops = async () => {
    return await instance.get('shops')
}

export const fetchShop = async (id) => {
    return await instance.get(`shops/${id}`)
}

export const fetchShopProducts = async (id, query) => {
    return await instance.get(`shops/${id}/products`, {
        params: query
    })
}