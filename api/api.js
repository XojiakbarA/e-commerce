import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
})

export const fetchCategories = async () => {
    return await instance.get('categories')
}

export const fetchBanners = async () => {
    return await instance.get('banners')
}

export const fetchNewProducts = async () => {
    return await instance.get('products?order=new&count=8')
}