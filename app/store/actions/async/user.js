import router from 'next/router'
import cookies from 'js-cookie'
import { fetchProducts } from '../../../../api/common'
import {
    login, logout, fetchUser, register, storeOrder, fetchOrders, fetchOrder,
    storeShop, destroyUserImage, updateUser, storeReview, updateSubOrderStatus
} from '../../../../api/user'

import {
    setUser, setCart, setLoading, setWishlist, setOrders, setOrder, toggleAccountMenu,
    toggleSnackbar, setSubOrderStatus
} from '../actionCreators'
import {
    toggleDialogLoading, toggleCancelOrderDialog, toggleAddReviewDialog,
    toggleDeleteProfileImageDialog, toggleOrderDialog, toggleLoginDialog,
    toggleRegisterDialog, toggleEditProfileDialog
} from '../dialogActions'

export const getCart = (cookieCart) => {

    const query = {id: cookieCart.map(item => item.id)}

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

export const getWishlist = (cookieWishlist) => {

    const query = {id: cookieWishlist}

    return async (dispatch) => {
        try {
            const res = await fetchProducts(query)
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
            if (res.status === 201) {
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
                cookies.remove('cart')
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
                dispatch(setOrder(res.data.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const cancelOrder = (id, data) => {
    return async (dispatch) => {
        try {
            dispatch(toggleDialogLoading(true))
            const res = await updateSubOrderStatus(id, data)
            if (res.status === 200) {
                dispatch(setSubOrderStatus(id, data.status))
                dispatch(toggleDialogLoading(false))
                dispatch(toggleSnackbar(true, 'Order cancelled successfully!'))
                dispatch(toggleCancelOrderDialog(false, null, null))
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
            dispatch(toggleDialogLoading(true))
            const res = await destroyUserImage(image_id)
            if (res.status === 200) {
                dispatch(setUser(res.data.data))
                dispatch(toggleDialogLoading(false))
                dispatch(toggleDeleteProfileImageDialog(false, '', null))
                dispatch(toggleSnackbar(true,'Image deleted'))
            }
        } catch (e) {
            console.log(e)
        }
    }
}