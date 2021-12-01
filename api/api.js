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
    const csrf = await auth.get('sanctum/csrf-cookie')
    const login = await auth.post('login', data)
    const user = await auth.get('api/user')
    if (user.status === 200) {
        const token = login.config.headers['X-XSRF-TOKEN']
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user.data))
    }
}

export const logout = async () => {
    const res = await auth.post('logout')
    if (res.status === 204) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
}

export const fetchUser = async () => {
    try {
        return await auth.get('api/user')
    } catch (e) {
        console.log(e.response.data)
    }
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