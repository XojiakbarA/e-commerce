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

export const fetchShops = async (query) => {
    return await instance.get('shops', {
        params: query
    })
}

export const fetchShop = async (id) => {
    return await instance.get(`shops/${id}`)
}

export const fetchShopProducts = async (id, query, cookie) => {
    return await instance.get(`shops/${id}/products`, {
        params: query,
        headers: cookie && {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const fetchRegions = async () => {
    return await instance.get('regions')
}

export const fetchDistricts = async (id) => {
    return await instance.get(`regions/${id}/districts`)
}