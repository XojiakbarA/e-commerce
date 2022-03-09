import { instance } from "./common"

export const login = async (data) => {
    await instance.get('sanctum/csrf-cookie')
    return await instance.post('login', data)
}

export const logout = async () => {
    return await instance.post('logout')
}

export const fetchUser = async (cookie) => {
    return await instance.get('api/users', cookie && {
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const updateUser = async (data, id) => {
    return await instance.post(`api/users/${id}?_method=PUT`, data)
}

export const destroyUserImage = async (image_id) => {
    return await instance.delete(`api/user/user-images/${image_id}`)
}

export const register = async (data) => {
    await instance.get('sanctum/csrf-cookie')
    return await instance.post('register', data)
}

export const storeShop = async (data) => {
    return await instance.post('api/shops', data)
}

export const storeOrder = async (data) => {
    return await instance.post('api/user/orders', data)
}

export const fetchOrders = async (query, cookie) => {
    return await instance.get('api/user/orders', {
        params: query,
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const fetchOrder = async (id, cookie) => {
    return await instance.get(`api/user/orders/${id}`, {
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const cancellationOrder = async (id) => {
    return await instance.put(`api/user/orders/${id}`, {status: 'cancelled'})
}

export const storeReview = async (id, data) => {
    return await instance.post(`api/products/${id}/reviews`, data)
}