import router from 'next/router'
import {
    login, logout, fetchUser, fetchCart, addCart, removeCart,
    deleteCart, register, addWishlist, fetchWishlist,
    deleteWishlist, storeOrder, fetchOrders, fetchOrder, cancellationOrder,
    storeShop, storeReview, destroyUserImage, updateUser
} from '../../../../api/user'
import { fetchReviews } from '../../../../api/common'
import {
    setUser, setCart, setLoading, setSnackbar, toggleLoginDialog,
    toggleRegisterDialog, setReviews, setWishlist, toggleOrderDialog,
    setOrders, setOrder, toggleConfirmDialog, toggleEditProfileDialog,
    setCartFetching, toggleAccountMenu
} from '../actionCreators'

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
                dispatch(setUser(res.data.data))
            }
        } catch (e) {
            console.log(e.response)
        }
    }
}

export const editUser = (data, id, setPreview, setSubmitting) => {
    return async (dispatch) => {
        try {
            const res = await updateUser(data, id)
            if (res.status === 200) {
                dispatch(setUser(res.data.data))
                setSubmitting(false)
                dispatch(setSnackbar({isOpen: true, text: 'Сhanges completed successfully!'}))
                dispatch(toggleEditProfileDialog(false))
                setPreview(null)
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const userLogin = (data, setSubmitting) => {
    return async (dispatch) => {
        try {
            const res1 = await login(data)
            const res2 = await fetchUser()
            if (res1.status === 204 && res2.status === 200) {
                dispatch(setUser(res2.data.data))
                setSubmitting(false)
                dispatch(setSnackbar({isOpen: true, text: 'You are logged in!'}))
                if (router.pathname === '/login') {
                    router.push('/')
                } else {
                    dispatch(toggleLoginDialog(false))
                }
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

                const isProtectedPage = router.pathname.indexOf('/profile') === 0 ||
                                        router.pathname.indexOf('/vendor') === 0 ||
                                        router.pathname === '/checkout'

                dispatch(setLoading(false))
                if (isProtectedPage) {
                    await router.push('/')
                }
                dispatch(toggleAccountMenu(null))
                dispatch(setUser(null))
                dispatch(setCart({data: [], total: 0}))
                dispatch(setWishlist([]))
                dispatch(setSnackbar({isOpen: true, text: 'You are logged out!'}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const userRegister = (data, setSubmitting) => {
    return async (dispatch) => {
        try {
            const res1 = await register(data)
            const res2 = await fetchUser()
            if (res1.status === 201 && res2.status === 200) {
                dispatch(setUser(res2.data.data))
                setSubmitting(false)
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
            const res = await fetchReviews(id)
            if (res.status === 200) {
                dispatch(setReviews(res.data.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const createReview = (id, data, resetForm, setSubmitting) => {
    return async (dispatch) => {
        try {
            const res = await storeReview(id, data)
            if (res.status === 200) {
                dispatch(setReviews(res.data.data))
                setSubmitting(false)
                dispatch(setSnackbar({isOpen: true, text: 'Review created successfully!'}))
                resetForm()
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const createOrder = (data) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await storeOrder(data)
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

export const createShop = (data, setSubmitting) => {
    return async (dispatch) => {
        try {
            const res = await storeShop(data)
            if(res.status === 201) {
                setSubmitting(false)
                dispatch(setSnackbar({isOpen: true, text: 'Shop created successfully!'}))
                router.push(`/vendor/${res.data.data.id}`)
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteUserImage = (image_id, setPreview) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await destroyUserImage(image_id)
            if (res.status === 200) {
                dispatch(setUser(res.data.data))
                dispatch(setLoading(false))
                dispatch(setSnackbar({isOpen: true, text: 'Image deleted'}))
                setPreview(null)
            }
        } catch (e) {
            console.log(e)
        }
    }
}