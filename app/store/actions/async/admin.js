import { fetchCategories, fetchProducts, fetchReviews, storeCategory, updateBanner, updateProductPublished, updateReviewPublished } from "../../../../api/admin"
import { addCategory, setCategories, setLoading, setProducts, setReviews, setSnackbar, updateBanners } from "../actionCreators"
import router from "next/router"

export const getProducts = (query, cookie) => {
    return async (dispatch) => {
        try {
            const res = await fetchProducts(query, cookie)
            if (res.status === 200) {
                dispatch(setProducts(res.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const getReviews = (query, cookie) => {
    return async (dispatch) => {
        try {
            const res = await fetchReviews(query, cookie)
            if (res.status === 200) {
                dispatch(setReviews(res.data))
            }
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}

export const editProductPublished = (id, query, setIsClicked, data) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await updateProductPublished(id, data)
            if (res.status === 200) {
                setIsClicked(false)
                dispatch(setLoading(false))
                await router.push({query})
                dispatch(setSnackbar({isOpen: true, text: `Product ${!data.published ? 'un' : ''}published successfully!`}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const editReviewPublished = (id, query, setIsClicked, data) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await updateReviewPublished(id, data)
            if (res.status === 200) {
                setIsClicked(false)
                dispatch(setLoading(false))
                await router.push({query}, null, {scroll: false})
                dispatch(setSnackbar({isOpen: true, text: `Review ${!data.published ? 'un' : ''}published successfully!`}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const getCategories = (cookie) => {
    return async (dispatch) => {
        try {
            const res = await fetchCategories(cookie)
            if (res.status === 200) {
                dispatch(setCategories(res.data.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const createCategory = (data, resetForm, setSubmitting) => {
    return async (dispatch) => {
        try {
            const res = await storeCategory(data)
            if (res.status === 201) {
                dispatch(addCategory(res.data.data))
                resetForm()
                setSubmitting(false)
                dispatch(setSnackbar({isOpen: true, text: `Category created successfully!`}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const editBanner = (id, data, setSubmitting, resetForm) => {
    return async (dispatch) => {
        try {
            const res = await updateBanner(id, data)
            if (res.status === 200) {
                dispatch(updateBanners(res.data.data))
                resetForm()
                setSubmitting(false)
                dispatch(setSnackbar({isOpen: true, text: `Banner updated successfully!`}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}