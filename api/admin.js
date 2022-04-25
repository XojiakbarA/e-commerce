import { instance } from "./common"

export const updateReview = (id, data) => {
    return instance.put(`api/reviews/${id}`, data)
}

export const fetchReviews = (query, cookie) => {
    return instance.get(`api/reviews`, {
        params: query,
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const fetchUsers = (query, cookie) => {
    return instance.get(`api/users`, {
        params: query,
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const fetchOrders = (query, cookie) => {
    return instance.get(`api/orders`, {
        params: query,
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const fetchTransactions = (query, cookie) => {
    return instance.get(`api/transactions`, {
        params: query,
        headers: {
            'Cookie': cookie,
            'Referer': 'http://localhost:3000/'
        }
    })
}

export const storeCategory = (data) => {
    return instance.post(`api/categories`, data)
}

export const storeSubCategory = (cat_id, data) => {
    return instance.post(`api/categories/${cat_id}/sub-categories`, data)
}

export const storeBrand = (data) => {
    return instance.post(`api/brands`, data)
}

export const updateCategory = (id, data) => {
    return instance.put(`api/categories/${id}`, data)
}

export const updateSubCategory = (id, data) => {
    return instance.put(`api/sub-categories/${id}`, data)
}

export const updateBrand = (id, data) => {
    return instance.put(`api/brands/${id}`, data)
}

export const storeBanner = (data) => {
    return instance.post(`api/banners`, data)
}

export const updateBanner = (id, data) => {
    return instance.post(`api/banners/${id}?_method=PUT`, data)
}

export const destroyBanner = (id) => {
    return instance.delete(`api/banners/${id}`)
}

export const destroyCategory = (id) => {
    return instance.delete(`api/categories/${id}`)
}

export const destroySubCategory = (id) => {
    return instance.delete(`api/sub-categories/${id}`)
}

export const destroyBrand = (id) => {
    return instance.delete(`api/brands/${id}`)
}

export const storeRegion = (data) => {
    return instance.post(`api/regions`, data)
}

export const updateRegion = (id, data) => {
    return instance.put(`api/regions/${id}`, data)
}

export const storeDistrict = (reg_id, data) => {
    return instance.post(`api/regions/${reg_id}/districts`, data)
}

export const destroyRegion = (id) => {
    return instance.delete(`api/regions/${id}`)
}

export const updateDistrict = (id, data) => {
    return instance.put(`api/districts/${id}`, data)
}

export const destroyDistrict = (id) => {
    return instance.delete(`api/districts/${id}`)
}