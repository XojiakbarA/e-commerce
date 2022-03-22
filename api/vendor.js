import { instance } from "./common"

export const fetchProducts = async (query, cookie) => {
    return await instance.get(`api/user/products`, {
        params: query,
        headers: cookie && {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const storeProduct = async (data) => {
    return await instance.post(`api/user/products`, data)
}

export const updateProduct = async (id, data) => {
    return await instance.post(`api/user/products/${id}?_method=PUT`, data)
}

export const destroyProduct = async (id) => {
    return await instance.delete(`api/user/products/${id}`)
}

export const destroyProductImage = async (product_id, image_id) => {
    return await instance.delete(`api/user/products/${product_id}/product-images/${image_id}`)
}

export const fetchSubOrders = async (cookie, query) => {
    return await instance.get(`api/user/sub-orders`, {
        params: query,
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const fetchSubOrder = async (id, cookie) => {
    return await instance.get(`api/user/sub-orders/${id}`, {
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const updateOrderProducts = async (id, data) => {
    return await instance.put(`api/user/sub-orders/${id}`, data)
}

export const fetchShop = async (cookie) => {
    return await instance.get(`api/user/shops`, {
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const updateShop = async (shop_id, data) => {
    return await instance.post(`api/user/shops/${shop_id}?_method=PUT`, data)
}