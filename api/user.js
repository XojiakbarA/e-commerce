import axios from 'axios'

export const user = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/'
})

export const setToken = async () => {
    await user.get('sanctum/csrf-cookie')
}

export const fetchRegions = async () => {
    return await user.get('api/regions')
}

export const fetchDistricts = async (id) => {
    return await user.get(`api/regions/${id}/districts`)
}

export const storeShop = async (data) => {
    return await user.post('api/shops', data)
}

export const login = async (data) => {
    await user.get('sanctum/csrf-cookie')
    return await user.post('login', data)
}

export const logout = async () => {
    return await user.post('logout')
}

export const fetchUser = async (cookie) => {
    return await user.get('api/users', cookie && {
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const updateUser = async (data, id) => {
    return await user.post(`api/users/${id}?_method=PUT`, data)
}

export const register = async (data) => {
    await user.get('sanctum/csrf-cookie')
    return await user.post('register', data)
}

export const fetchCart = async (cookie) => {
    return await user.get('api/cart', {
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const addCart = async (id) => {
    return await user.post(`api/cart/${id}`)
}

export const removeCart = async (id) => {
    return await user.put(`api/cart/${id}`)
}

export const deleteCart = async (id) => {
    return await user.delete(`api/cart/${id}`)
}

export const fetchWishlist = async (cookie) => {
    return await user.get('api/wishlist', {
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const addWishlist = async (id) => {
    return await user.post(`api/wishlist/${id}`)
}

export const deleteWishlist = async (id) => {
    return await user.delete(`api/wishlist/${id}`)
}

export const fetchReviews = async (id) => {
    return await user.get(`api/products/${id}/reviews`)
}

export const storeReview = async (id, data) => {
    return await user.post(`api/products/${id}/reviews`, data)
}

export const storeOrder = async (data) => {
    return await user.post('api/orders', data)
}

export const fetchOrders = async (query, cookie) => {
    return await user.get('api/orders', {
        params: query,
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const fetchOrder = async (id, cookie) => {
    return await user.get(`api/orders/${id}`, {
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const cancellationOrder = async (id) => {
    return await user.put(`api/orders/${id}`, {status: 'cancelled'})
}

export const destroyUserImage = async (image_id) => {
    return await user.delete(`api/user-images/${image_id}`)
}