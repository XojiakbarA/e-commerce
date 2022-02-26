import { instance } from "./common"

export const updateProductPublished = (id, data) => {
    return instance.put(`api/admin/products/${id}`, data)
}

export const updateReviewPublished = (id, data) => {
    return instance.put(`api/admin/reviews/${id}`, data)
}

export const fetchReviews = (query, cookie) => {
    return instance.get(`api/admin/reviews`, {
        params: query,
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const fetchProducts = (query, cookie) => {
    return instance.get(`api/admin/products`, {
        params: query,
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const fetchUsers = (query, cookie) => {
    return instance.get(`api/admin/users`, {
        params: query,
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const fetchShops = (query, cookie) => {
    return instance.get(`api/admin/shops`, {
        params: query,
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const fetchOrders = (query, cookie) => {
    return instance.get(`api/admin/orders`, {
        params: query,
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const fetchTransactions = (query, cookie) => {
    return instance.get(`api/admin/transactions`, {
        params: query,
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const fetchCategories = (cookie) => {
    return instance.get(`api/admin/categories`, cookie &&
        {
            headers: {
                'Cookie': cookie,
                'Referer': 'http://localhost:3000/'
            }
        }
    )
}

export const storeCategory = (data) => {
    return instance.post(`api/admin/categories`, data)
}

export const storeSubCategory = (cat_id, data) => {
    return instance.post(`api/admin/categories/${cat_id}/sub-categories`, data)
}

export const storeBrand = (data) => {
    return instance.post(`api/admin/brands`, data)
}

export const updateCategory = (id, data) => {
    return instance.put(`api/admin/categories/${id}`, data)
}

export const updateSubCategory = (id, data) => {
    return instance.put(`api/admin/sub-categories/${id}`, data)
}

export const updateBrand = (id, data) => {
    return instance.put(`api/admin/brands/${id}`, data)
}

export const updateBanner = (id, data) => {
    return instance.post(`api/admin/banners/${id}?_method=PUT`, data)
}