import router from 'next/router'
import { fetchProducts } from '../../../../api/common'
import {
    login, logout, fetchUser, register, addWishlist, fetchWishlist, deleteWishlist,
    storeOrder, fetchOrders, fetchOrder, cancellationOrder, storeShop,
    destroyUserImage, updateUser, storeReview
} from '../../../../api/user'

import {
    setUser, setCart, setLoading, toggleLoginDialog, toggleRegisterDialog, setWishlist, toggleOrderDialog,
    setOrders, setOrder, toggleEditProfileDialog, toggleAccountMenu, toggleAddReviewDialog,
    toggleSnackbar, toggleCancelOrderDialog
} from '../actionCreators'

export const getCart = (cookieCart) => {

    let query = {id: cookieCart.map(item => item.id)}

    return async (dispatch) => {
        try {
            const res = await fetchProducts(query)
            if (res.status === 200) {
                dispatch(setCart(res.data.data, cookieCart))
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

export const addToWishlist = (id, setIsWishClicked, setWishlistFetching) => {
    return async (dispatch) => {
        try {
            setWishlistFetching(true)
            const res = await addWishlist(id)
            if (res.status === 200) {
                dispatch(setWishlist(res.data.data))
                setWishlistFetching(false)
                setIsWishClicked(false)
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteFromWishlist = (id, setIsWishClicked, setWishlistFetching) =>{
    return async (dispatch) => {
        try {
            setWishlistFetching(true)
            const res = await deleteWishlist(id)
            if (res.status === 200) {
                dispatch(setWishlist(res.data.data))
                setWishlistFetching(false)
                setIsWishClicked(false)
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

export const editUser = (data, id, setSubmitting) => {
    return async (dispatch) => {
        try {
            const res = await updateUser(data, id)
            if (res.status === 200) {
                dispatch(setUser(res.data.data))
                setSubmitting(false)
                dispatch(toggleSnackbar(true, 'Сhanges completed successfully!'))
                dispatch(toggleEditProfileDialog(false))
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
                dispatch(toggleSnackbar(true, 'You are logged in!'))
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
                dispatch(toggleSnackbar(true, 'You are logged out!'))
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
                dispatch(toggleSnackbar(true, 'You are logged in!'))
                dispatch(toggleRegisterDialog(false))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const createReview = (id, data, setSubmitting) => {
    return async (dispatch) => {
        try {
            const res = await storeReview(id, data)
            if (res.status === 200) {
                setSubmitting(false)
                dispatch(toggleAddReviewDialog(false))
                dispatch(toggleSnackbar(true, 'Review created successfully!'))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const createOrder = (data, setSubmitting) => {
    return async (dispatch) => {
        try {
            const res = await storeOrder(data)
            if (res.status === 201) {
                dispatch(setOrder(res.data.data))
                setSubmitting(false)
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
                dispatch(toggleSnackbar(true, 'Order cancelled successfully!'))
                dispatch(toggleCancelOrderDialog(false, '', ''))
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
                dispatch(toggleSnackbar(true, 'Shop created successfully!'))
                router.push(`/vendor/${res.data.data.id}`)
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteUserImage = (image_id) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await destroyUserImage(image_id)
            if (res.status === 200) {
                dispatch(setUser(res.data.data))
                dispatch(setLoading(false))
                dispatch(toggleSnackbar(true,'Image deleted'))
            }
        } catch (e) {
            console.log(e)
        }
    }
}