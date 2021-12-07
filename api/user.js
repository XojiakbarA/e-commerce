import axios from 'axios'

const user = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/'
})

export const login = async (data) => {
    await user.get('sanctum/csrf-cookie')
    return await user.post('login', data)
}

export const logout = async () => {
    return await user.post('logout')
}

export const fetchUser = async () => {
    return await user.get('api/user')
}

export const register = async (data) => {
    await user.get('sanctum/csrf-cookie')
    return await user.post('register', data)
}

export const fetchCart = async () => {
    return await user.get('api/cart')
}

export const addCart = async (id) => {
    return await user.post('api/cart/' + id)
}

export const removeCart = async (id) => {
    return await user.put('api/cart/' + id)
}

export const deleteCart = async (id) => {
    return await user.delete('api/cart/' + id)
}

export const addReview = async (data) => {
    return await user.post('api/reviews', data)
}