import { instance } from "./common"

export const fetchProducts = async (user_id, query, cookie) => {
    return await instance.get(`api/users/${user_id}/products`, {
        params: query,
        headers: cookie && {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const storeProduct = async (user_id, data) => {
    return await instance.post(`api/users/${user_id}/products`, data)
}

export const updateProduct = async (product_id, data) => {
    return await instance.post(`api/products/${product_id}?_method=PUT`, data)
}

export const destroyProduct = async (product_id) => {
    return await instance.delete(`api/products/${product_id}`)
}

export const destroyProductImage = async (product_id, image_id) => {
    return await instance.delete(`api/products/${product_id}/images/${image_id}`)
}

export const fetchSubOrders = async (user_id, cookie, query) => {
    return await instance.get(`api/users/${user_id}/sub-orders`, {
        params: query,
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const fetchSubOrder = async (id, cookie) => {
    return await instance.get(`api/sub-orders/${id}`, {
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const updateSubOrder = async (sub_order_id, data) => {
    return await instance.put(`api/sub-orders/${sub_order_id}`, data)
}

export const fetchShop = async (user_id, cookie) => {
    return await instance.get(`api/users/${user_id}/shops`, {
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const updateShop = async (shop_id, data) => {
    return await instance.post(`api/shops/${shop_id}?_method=PUT`, data)
}