import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/api/'
})

const auth = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/'
})

export const login = async (data) => {
    await auth.get('sanctum/csrf-cookie')
    await auth.post('login', data)
}

export const logout = async () => {
    await auth.post('logout')
}

export const fetchUser = async () => {
    return await auth.get('api/user')
}

export const fetchCategories = async () => {
    return await instance.get('categories')
}

export const fetchBrands = async () => {
    return await instance.get('brands')
}

export const fetchBanners = async () => {
    return await instance.get('banners')
}

export const fetchNewProducts = async () => {
    return await instance.get('products?sort=new&count=8')
}

export const fetchProduct = async (id) => {
    return await instance.get('products/' + id)
}

export const fetchSearchResults = async (query) => {
    return await instance.get('products/', {
        params: query
    })
}