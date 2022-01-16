import router from 'next/router'
import {
    login,
    logout,
    fetchUser,
    fetchCart,
    addCart,
    removeCart,
    deleteCart,
    register,
    fetchReviews,
    addReview,
    addWishlist,
    fetchWishlist,
    deleteWishlist,
    order,
    clearCart,
    fetchOrders, fetchOrder, cancellationOrder, sendUserData, storeShop, storeProduct, destroyProductImage, updateProduct, destroyProduct, storeReview
} from '../../../api/user'
import {
    setUser,
    setCart,
    setLoading,
    closeAccountMenu,
    setSnackbar,
    toggleLoginDialog,
    toggleRegisterDialog,
    setReviews,
    setWishlist,
    toggleOrderDialog,
    setOrders, setOrder, toggleConfirmDialog, toggleEditProfileDialog, toggleAddProductDialog, getShopProducts, setReviewsLoading, setProduct, toggleEditProductDialog, toggleDeleteProductDialog, setOrdersFetching, setCartFetching
} from '..'

export const getCart = (cookie) => {
    return async (dispatch) => {
        try {
            dispatch(setCartFetching(true))
            const res = await fetchCart(cookie)
            if (res.status === 200) {
                dispatch(setCart(res.data))
                dispatch(setCartFetching(false))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const addToCart = (id) => {
    return async (dispatch) => {
        try {
            dispatch(setCartFetching(true))
            const res = await addCart(id)
            if (res.status === 200) {
                dispatch(setCart(res.data))
                dispatch(setCartFetching(false))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const removeFromCart = (id) => {
    return async (dispatch) => {
        try {
            dispatch(setCartFetching(true))
            const res = await removeCart(id)
            if (res.status === 200) {
                dispatch(setCart(res.data))
                dispatch(setCartFetching(false))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteFromCart = (id) => {
    return async (dispatch) => {
        try {
            dispatch(setCartFetching(true))
            const res = await deleteCart(id)
            if (res.status === 200) {
                dispatch(setCart(res.data))
                dispatch(setCartFetching(false))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const clearAllCart = () => {
    return async (dispatch) => {
        try {
            dispatch(setCartFetching(true))
            const res = await clearCart()
            if (res.status === 200) {
                dispatch(setCart(res.data))
                dispatch(setCartFetching(false))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const getWishlist = (cookie) => {
    return async (dispatch) => {
        try {
            const res = await fetchWishlist(cookie)
            if (res.status === 200) {
                dispatch(setWishlist(res.data.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const addToWishlist = (id) => {
    return async (dispatch) => {
        try {
            const res = await addWishlist(id)
            if (res.status === 200) {
                dispatch(setWishlist(res.data.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteFromWishlist = (id) =>{
    return async (dispatch) => {
        try {
            const res = await deleteWishlist(id)
            if (res.status === 200) {
                dispatch(setWishlist(res.data.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const getUser = (cookie) => {
    return async (dispatch) => {
        try {
            const res = await fetchUser(cookie)
            if (res.status === 200) {
                dispatch(setUser(res.data))
            }
        } catch (e) {
            console.log(e.response)
        }
    }
}

export const editUser = (data, id) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await sendUserData(data, id)
            if (res.status === 200) {
                dispatch(setUser(res.data))
                dispatch(setLoading(false))
                dispatch(setSnackbar({isOpen: true, text: 'Сhanges completed successfully!'}))
                dispatch(toggleEditProfileDialog(false))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const userLogin = (data) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res1 = await login(data)
            const res2 = await fetchUser()
            if (res1.status === 204 && res2.status === 200) {
                dispatch(setUser(res2.data))
                dispatch(setLoading(false))
                dispatch(setSnackbar({isOpen: true, text: 'You are logged in!'}))
                dispatch(toggleLoginDialog(false))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const userLogout = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await logout()
            if (res.status === 204) {
                dispatch(setLoading(false))
                dispatch(closeAccountMenu())
                dispatch(setUser(null))
                dispatch(setCart([]))
                dispatch(setSnackbar({isOpen: true, text: 'You are logged out!'}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const userRegister = (data) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res1 = await register(data)
            const res2 = await fetchUser()
            if (res1.status === 201 && res2.status === 200) {
                dispatch(setUser(res2.data))
                dispatch(setLoading(false))
                dispatch(setSnackbar({isOpen: true, text: 'You are logged in!'}))
                dispatch(toggleRegisterDialog(false))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const getReviews = (id) => {
    return async (dispatch) => {
        try {
            dispatch(setReviewsLoading(true))
            const res = await fetchReviews(id)
            if (res.status === 200) {
                dispatch(setReviews(res.data.data))
                dispatch(setReviewsLoading(false))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const createReview = (id, data, resetForm) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await storeReview(id, data)
            if (res.status === 200) {
                dispatch(setReviews(res.data.data))
                dispatch(setLoading(false))
                dispatch(setSnackbar({isOpen: true, text: 'Review created successfully!'}))
                resetForm()
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const userOrder = (data) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await order(data)
            if (res.status === 201) {
                dispatch(setLoading(false))
                dispatch(toggleOrderDialog(true))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const getOrders = (query, cookie) => {
    return async (dispatch) => {
        try {
            const res = await fetchOrders(query, cookie)
            if (res.status === 200) {
                dispatch(setOrders(res.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const getOrder = (id, cookie) => {
    return async (dispatch) => {
        try {
            const res = await fetchOrder(id, cookie)
            if (res.status === 200) {
                dispatch(setOrder(res.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const cancelOrder = (id) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await cancellationOrder(id)
            if (res.status === 200) {
                dispatch(setOrder(res.data))
                dispatch(setLoading(false))
                dispatch(setSnackbar({isOpen: true, text: 'Order cancelled successfully!'}))
                dispatch(toggleConfirmDialog(false))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const createShop = (data) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await storeShop(data)
            if(res.status === 201) {
                dispatch(setLoading(false))
                dispatch(setSnackbar({isOpen: true, text: 'Shop created successfully!'}))
                router.push(`/vendor/${res.data.data.id}`)
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const createProduct = (data, resetForm) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await storeProduct(data)
            if (res.status === 201) {
                dispatch(setLoading(false))
                dispatch(toggleAddProductDialog(false))
                dispatch(setSnackbar({isOpen: true, text: 'Product created successfully!'}))
                resetForm()
                dispatch(getShopProducts(res.data.data.shop.id))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const editProduct = (id, data, resetForm, setPreview) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await updateProduct(id, data)
            if (res.status === 200) {
                dispatch(setLoading(false))
                dispatch(toggleEditProductDialog(false))
                dispatch(setSnackbar({isOpen: true, text: 'Product updated successfully!'}))
                resetForm()
                setPreview([])
                dispatch(getShopProducts(res.data.data.shop.id))
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
            dispatch(setLoading(false))
            dispatch(toggleDeleteProductDialog(false))
            dispatch(setSnackbar({isOpen: true, text: 'Product deleted successfully!'}))
            dispatch(getShopProducts(res.data.data.id))
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
            }
        } catch (e) {
            console.log(e)
        }
    }
}