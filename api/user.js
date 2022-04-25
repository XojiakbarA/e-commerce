import { instance } from "./common"

export const register = async (data) => {
    await instance.get('sanctum/csrf-cookie')
    return await instance.post('register', data)
}

export const login = async (data) => {
    await instance.get('sanctum/csrf-cookie')
    return await instance.post('login', data)
}

export const logout = async () => {
    return await instance.post('logout')
}

export const fetchUser = async (cookie) => {
    return await instance.get('api/me', cookie && {
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const updateUser = async (data, id) => {
    return await instance.post(`api/users/${id}?_method=PUT`, data)
}

export const destroyUserImage = async (user_id, image_id) => {
    return await instance.delete(`api/users/${user_id}/images/${image_id}`)
}

export const storeShop = async (user_id, data) => {
    return await instance.post(`api/users/${user_id}/shops`, data)
}

export const storeOrder = async (user_id, data) => {
    return await instance.post(`api/users/${user_id}/orders`, data)
}

export const fetchOrders = async (user_id, query, cookie) => {
    return await instance.get(`api/users/${user_id}/orders`, {
        params: query,
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const fetchOrder = async (order_id, cookie) => {
    return await instance.get(`api/orders/${order_id}`, {
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const storeReview = async (user_id, data) => {
    return await instance.post(`api/users/${user_id}/reviews`, data)
}