import {
    setLoading, setProduct, setProducts, setSnackbar,
    toggleAddProductDialog, toggleDeleteProductDialog,
    toggleEditProductDialog
} from "../actionCreators"
import {
    destroyProduct, destroyProductImage,
    fetchProducts, storeProduct, updateProduct
} from "../../../../api/vendor"

export const getProducts = (shop_id, query, cookie) => {
    return async (dispatch) => {
        try {
            const res = await fetchProducts(shop_id, query, cookie)
            if (res.status === 200) {
                dispatch(setProducts(res.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const createProduct = (shop_id, data, resetForm, setSubmitting) => {
    return async (dispatch) => {
        try {
            const res = await storeProduct(shop_id, data)
            if (res.status === 201) {
                setSubmitting(false)
                dispatch(toggleAddProductDialog(false))
                dispatch(setSnackbar({isOpen: true, text: 'Product created successfully!'}))
                resetForm()
                dispatch(getProducts(shop_id))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const editProduct = (shop_id, product_id, data, resetForm, setPreview, setSubmitting) => {
    return async (dispatch) => {
        try {
            const res = await updateProduct(shop_id, product_id, data)
            if (res.status === 200) {
                setSubmitting(false)
                dispatch(toggleEditProductDialog(false))
                dispatch(setSnackbar({isOpen: true, text: 'Product updated successfully!'}))
                resetForm()
                setPreview([])
                dispatch(getProducts(shop_id))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteProduct = (shop_id, product_id) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await destroyProduct(shop_id, product_id)
            if (res.status === 200) {
                dispatch(setLoading(false))
                dispatch(toggleDeleteProductDialog(false))
                dispatch(setSnackbar({isOpen: true, text: 'Product deleted successfully!'}))
                dispatch(getProducts(shop_id))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteProductImage = (shop_id, product_id, image_id) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await destroyProductImage(shop_id, product_id, image_id)
            if (res.status === 200) {
                dispatch(setProduct(res.data.data))
                dispatch(setLoading(false))
                dispatch(getProducts(shop_id))
            }
        } catch (e) {
            console.log(e)
        }
    }
}