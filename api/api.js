import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
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

export const fetchNewProducts = async () => {
    return await instance.get('products?sort=new&count=8')
}

export const fetchProduct = async (id) => {
    return await instance.get('products/' + id)
}

export const fetchSearchResults = async (title, page, cat_id, sub_cat_id, sort, price_min, price_max, brand_id, rating) => {
    return await instance.get('products/', {
        params: {
            title,
            page,
            cat_id,
            sub_cat_id,
            sort,
            price_min,
            price_max,
            brand_id,
            rating
        }
    })
}