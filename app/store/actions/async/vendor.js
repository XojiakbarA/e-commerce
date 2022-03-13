import {
    setLoading, setOrderShop, setProduct, setProducts, setShop,
    toggleAddProductDialog, toggleDeleteProductDialog, toggleEditProductDialog,
    toggleOrderShipDialog, toggleSnackbar
} from "../actionCreators"
import {
    destroyProduct, destroyProductImage, fetchSubOrder, fetchProducts, fetchShop,
    orderShip, storeProduct, updateOrderProducts, updateProduct, updateShop
} from "../../../../api/vendor"

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

export const createProduct = (data, resetForm, setSubmitting) => {
    return async (dispatch) => {
        try {
            const res = await storeProduct(data)
            if (res.status === 201) {
                setSubmitting(false)
                dispatch(toggleAddProductDialog(false))
                dispatch(toggleSnackbar(true, 'Product created successfully!'))
                resetForm()
                dispatch(getProducts(shop_id))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const editProduct = (id, data, resetForm, setSubmitting) => {
    return async (dispatch) => {
        try {
            const res = await updateProduct(id, data)
            if (res.status === 200) {
                setSubmitting(false)
                dispatch(toggleEditProductDialog(false))
                dispatch(toggleSnackbar(true, 'Product updated successfully!'))
                resetForm()
                dispatch(getProducts(shop_id))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteProduct = (id, setSubmitting) => {
    return async (dispatch) => {
        try {
            setSubmitting(true)
            const res = await destroyProduct(id)
            if (res.status === 200) {
                setSubmitting(false)
                dispatch(toggleDeleteProductDialog(false, '', {}))
                dispatch(toggleSnackbar(true, 'Product deleted successfully!'))
                dispatch(getProducts(shop_id))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteProductImage = (product_id, image_id) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await destroyProductImage(product_id, image_id)
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

export const orderShipping = (id) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await orderShip(id)
            if (res.status === 200) {
                dispatch(setOrderShop(res.data))
                dispatch(setLoading(false))
                dispatch(toggleOrderShipDialog(false))
                dispatch(toggleSnackbar(true, 'Order shipped successfully!'))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const editOrderProducts = (id, setSaveDisabled, data) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await updateOrderProducts(id, data)
            if (res.status === 200) {
                dispatch(setOrderShop(res.data))
                dispatch(setLoading(false))
                setSaveDisabled(true)
                dispatch(toggleSnackbar(true, 'Order products updated successfully!'))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const getShop = (cookie) => {
    return async (dispatch) => {
        try {
            const res = await fetchShop(cookie)
            if (res.status === 200) {
                dispatch(setShop(res.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const editShop = (shop_id, data, setSubmitting) => {
    return async (dispatch) => {
        try {
            const res = await updateShop(shop_id, data)
            if (res.status === 200) {
                dispatch(setShop(res.data))
                setSubmitting(false)
                dispatch(toggleSnackbar(true, 'Shop updated successfully!'))
            }
        } catch (e) {
            console.log(e)
        }
    }
}