import { user } from "./user"

export const fetchProducts = async (user_id, shop_id, query, cookie) => {
    return await user.get(`api/users/${user_id}/shops/${shop_id}/products`, {
        params: query,
        headers: cookie && {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const storeProduct = async (user_id, shop_id, data) => {
    return await user.post(`api/users/${user_id}/shops/${shop_id}/products`, data)
}

export const updateProduct = async (user_id, shop_id, product_id, data) => {
    return await user.post(`api/users/${user_id}/shops/${shop_id}/products/${product_id}?_method=PUT`, data)
}

export const destroyProduct = async (user_id, shop_id, product_id) => {
    return await user.delete(`api/users/${user_id}/shops/${shop_id}/products/${product_id}`)
}

export const destroyProductImage = async (product_id, image_id) => {
    return await user.delete(`api/products/${product_id}/product-images/${image_id}`)
}