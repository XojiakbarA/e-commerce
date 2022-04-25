import { editQtyOrderProducts, setLoading, setProducts, setShop, setSubOrder, shipSubOrder, toggleSnackbar } from "../actionCreators"
import {
    destroyProduct, destroyProductImage, fetchProducts, fetchShop, fetchSubOrder,
    storeProduct, updateSubOrder, updateProduct, updateShop
} from "../../../../api/vendor"
import {
    toggleDialogLoading, toggleEditProductDialog,
    toggleDeleteProductDialog, toggleDeleteProductImageDialog,
    toggleAddProductDialog, toggleOrderShipDialog
} from "../dialogActions"

export const getProducts = (user_id, query, cookie) => {
    return async (dispatch) => {
        try {
            const res = await fetchProducts(user_id, query, cookie)
            if (res.status === 200) {
                dispatch(setProducts(res.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const createProduct = (user_id, data, setSubmitting) => {
    return async (dispatch) => {
        try {
            const res = await storeProduct(user_id, data)
            if (res.status === 201) {
                await dispatch(getProducts(user_id))
                setSubmitting(false)
                dispatch(toggleAddProductDialog(false))
                dispatch(toggleSnackbar(true, 'Product created successfully!'))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const editProduct = (user_id, product_id, data, setSubmitting) => {
    return async (dispatch) => {
        try {
            const res = await updateProduct(product_id, data)
            if (res.status === 200) {
                await dispatch(getProducts(user_id))
                setSubmitting(false)
                dispatch(toggleEditProductDialog(false, null))
                dispatch(toggleSnackbar(true, 'Product updated successfully!'))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteProduct = (user_id, product_id) => {
    return async (dispatch) => {
        try {
            dispatch(toggleDialogLoading(true))
            const res = await destroyProduct(product_id)
            if (res.status === 204) {
                await dispatch(getProducts(user_id))
                dispatch(toggleDialogLoading(false))
                dispatch(toggleDeleteProductDialog(false, null, null))
                dispatch(toggleSnackbar(true, 'Product deleted successfully!'))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteProductImage = (user_id, product_id, image_id) => {
    return async (dispatch) => {
        try {
            dispatch(toggleDialogLoading(true))
            const res = await destroyProductImage(product_id, image_id)
            if (res.status === 200) {
                await dispatch(getProducts(user_id))
                dispatch(toggleDialogLoading(false))
                dispatch(toggleDeleteProductImageDialog(false, null, null))
                dispatch(toggleSnackbar(true, 'Image deleted successfully!'))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const getSubOrder = (id, cookie) => {
    return async (dispatch) => {
        try {
            const res = await fetchSubOrder(id, cookie)
            if (res.status === 200) {
                dispatch(setSubOrder(res.data.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const orderShipping = (sub_order_id, data) => {
    return async (dispatch) => {
        try {
            dispatch(toggleDialogLoading(true))
            const res = await updateSubOrder(sub_order_id, data)
            if (res.status === 200) {
                dispatch(shipSubOrder(data.status))
                dispatch(toggleDialogLoading(false))
                dispatch(toggleOrderShipDialog(false))
                dispatch(toggleSnackbar(true, 'Order shipped successfully!'))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const editSubOrder = (sub_order_id, setSaveDisabled, data) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await updateSubOrder(sub_order_id, data)
            if (res.status === 200) {
                dispatch(editQtyOrderProducts(res.data.data))
                dispatch(setLoading(false))
                setSaveDisabled(true)
                dispatch(toggleSnackbar(true, 'Order products updated successfully!'))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const getShop = (user_id, cookie) => {
    return async (dispatch) => {
        try {
            const res = await fetchShop(user_id, cookie)
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