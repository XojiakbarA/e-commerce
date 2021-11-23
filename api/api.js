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
    return await instance.get('products?sort=new&count=8')
}

export const fetchProduct = async (id) => {
    return await instance.get('products/' + id)
}