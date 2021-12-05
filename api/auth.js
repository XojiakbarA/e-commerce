import axios from 'axios'

const auth = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/'
})

export const login = async (data) => {
    await auth.get('sanctum/csrf-cookie')
    return await auth.post('login', data)
}

export const logout = async () => {
    return await auth.post('logout')
}

export const fetchUser = async () => {
    return await auth.get('api/user')
}

export const fetchCart = async () => {
    return await auth.get('api/cart')
}

export const addCart = async (id) => {
    return await auth.post('api/cart/' + id)
}

export const removeCart = async (id) => {
    return await auth.put('api/cart/' + id)
}

export const deleteCart = async (id) => {
    return await auth.delete('api/cart/' + id)
}
