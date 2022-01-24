import { instance } from "./common"

export const fetchProducts = async (shop_id, query, cookie) => {
    return await instance.get(`api/vendor/shops/${shop_id}/products`, {
        params: query,
        headers: cookie && {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const storeProduct = async (shop_id, data) => {
    return await instance.post(`api/vendor/shops/${shop_id}/products`, data)
}

export const updateProduct = async (shop_id, product_id, data) => {
    return await instance.post(`api/vendor/shops/${shop_id}/products/${product_id}?_method=PUT`, data)
}

export const destroyProduct = async (shop_id, product_id) => {
    return await instance.delete(`api/vendor/shops/${shop_id}/products/${product_id}`)
}

export const destroyProductImage = async (shop_id, product_id, image_id) => {
    return await instance.delete(`api/vendor/shops/${shop_id}/products/${product_id}/product-images/${image_id}`)
}