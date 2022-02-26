import { fetchCategories, fetchProducts, fetchReviews, storeBrand, storeCategory, storeSubCategory, updateBanner, updateBrand, updateCategory, updateProductPublished, updateReviewPublished, updateSubCategory } from "../../../../api/admin"
import { addBrand, addCategory, addSubCategory, setCategories, setLoading, setProducts, setReviews, setSnackbar, updateBanners, updateBrands, updateCategories, updateSubCategories } from "../actionCreators"
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

export const createCategory = (data, resetForm, setSubmitting, setEdit) => {
    return async (dispatch) => {
        try {
            const res = await storeCategory(data)
            if (res.status === 201) {
                dispatch(addCategory(res.data.data))
                resetForm()
                setSubmitting(false)
                setEdit(false)
                dispatch(setSnackbar({isOpen: true, text: `Category created successfully!`}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const createSubCategory = (cat_id, data, resetForm, setSubmitting, setEdit) => {
    return async (dispatch) => {
        try {
            const res = await storeSubCategory(cat_id, data)
            if (res.status === 201) {
                dispatch(addSubCategory(res.data.data, cat_id))
                resetForm()
                setSubmitting(false)
                setEdit(false)
                dispatch(setSnackbar({isOpen: true, text: `Sub Category created successfully!`}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const createBrand = (data, resetForm, setSubmitting, setEdit) => {
    return async (dispatch) => {
        try {
            const res = await storeBrand(data)
            if (res.status === 201) {
                dispatch(addBrand(res.data.data))
                resetForm()
                setSubmitting(false)
                setEdit(false)
                dispatch(setSnackbar({isOpen: true, text: `Brand created successfully!`}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const editCategory = (id, data, resetForm, setSubmitting, setEdit) => {
    return async (dispatch) => {
        try {
            const res = await updateCategory(id, data)
            if (res.status === 200) {
                dispatch(updateCategories(res.data.data))
                resetForm()
                setSubmitting(false)
                setEdit(false)
                dispatch(setSnackbar({isOpen: true, text: `Category updated successfully!`}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const editSubCategory = (id, data, resetForm, setSubmitting, setEdit) => {
    return async (dispatch) => {
        try {
            const res = await updateSubCategory(id, data)
            if (res.status === 200) {
                dispatch(updateSubCategories(res.data.data))
                resetForm()
                setSubmitting(false)
                setEdit(false)
                dispatch(setSnackbar({isOpen: true, text: `Sub Category updated successfully!`}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const editBrand = (id, data, resetForm, setSubmitting, setEdit) => {
    return async (dispatch) => {
        try {
            const res = await updateBrand(id, data)
            if (res.status === 200) {
                dispatch(updateBrands(res.data.data))
                resetForm()
                setSubmitting(false)
                setEdit(false)
                dispatch(setSnackbar({isOpen: true, text: `Brand updated successfully!`}))
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