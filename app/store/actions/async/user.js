import router from 'next/router'
import cookies from 'js-cookie'
import { fetchProducts } from '../../../../api/common'
import {
    login, logout, fetchUser, register, storeOrder, fetchOrders, fetchOrder,
    storeShop, destroyUserImage, updateUser, storeReview
} from '../../../../api/user'

import {
    setUser, setCart, setLoading, setWishlist, setOrders, setOrder, toggleAccountMenu,
    toggleSnackbar, setSubOrderStatus, dropUserImage
} from '../actionCreators'
import {
    toggleDialogLoading, toggleCancelOrderDialog, toggleAddReviewDialog,
    toggleDeleteProfileImageDialog, toggleOrderDialog, toggleLoginDialog,
    toggleRegisterDialog, toggleEditProfileDialog
} from '../dialogActions'
import { updateSubOrder } from '../../../../api/vendor'

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
    return async (dispatch, getState) => {
        try {
            const res = await login(data)
            if (res.status === 204) {
                await dispatch(getUser())
                setSubmitting(false)
                dispatch(toggleLoginDialog(false))
                const user = getState().user
                if (user.role == 'admin') {
                    await router.push('/admin')
                }
                if (router.pathname === '/login') {
                    await router.push('/')
                }
                dispatch(toggleSnackbar(true, 'You are logged in!'))
            }
        } catch ({ response }) {
            if (response.status === 422) {
                setSubmitting(false)
                dispatch(toggleSnackbar(true, 'Incorrect email and/or password', 'error'))
            }
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
                dispatch(toggleAccountMenu(null))
                const isProtectedPage = router.pathname.indexOf('/profile') === 0 ||
                                        router.pathname.indexOf('/vendor') === 0 ||
                                        router.pathname.indexOf('/checkout') === 0 ||
                                        router.pathname.indexOf('/admin') === 0
                if (isProtectedPage) {
                    await router.push('/')
                }
                dispatch(setUser(null))
                dispatch(toggleSnackbar(true, 'You are logged out!'))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const userRegister = (data, setSubmitting, setFieldError) => {
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
        } catch ({ response }) {
            if (response.status === 422) {
                setSubmitting(false)
                const errors = Object.entries(response.data.errors)
                errors.forEach(item => setFieldError(item[0], item[1][0]))
            }
        }
    }
}

export const createReview = (user_id, data, setSubmitting) => {
    return async (dispatch) => {
        try {
            const res = await storeReview(user_id, data)
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

export const createOrder = (user_id, data, setSubmitting) => {
    return async (dispatch) => {
        try {
            const res = await storeOrder(user_id, data)
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

export const getOrders = (user_id, query, cookie) => {
    return async (dispatch) => {
        try {
            const res = await fetchOrders(user_id, query, cookie)
            if (res.status === 200) {
                dispatch(setOrders(res.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const getOrder = (order_id, cookie) => {
    return async (dispatch) => {
        try {
            const res = await fetchOrder(order_id, cookie)
            if (res.status === 200) {
                dispatch(setOrder(res.data.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const cancelSubOrder = (sub_order_id, data) => {
    return async (dispatch) => {
        try {
            dispatch(toggleDialogLoading(true))
            const res = await updateSubOrder(sub_order_id, data)
            if (res.status === 200) {
                dispatch(setSubOrderStatus(sub_order_id, data.status))
                dispatch(toggleDialogLoading(false))
                dispatch(toggleSnackbar(true, 'Order cancelled successfully!'))
                dispatch(toggleCancelOrderDialog(false, null, null))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const createShop = (user_id, data, setSubmitting, setFieldError) => {
    return async (dispatch) => {
        try {
            const res = await storeShop(user_id, data)
            if(res.status === 201) {
                setSubmitting(false)
                await router.push(`/vendor`)
                dispatch(toggleSnackbar(true, 'Shop created successfully!'))
            }
        } catch ({ response }) {
            if (response.status === 422) {
                setSubmitting(false)
                const errors = Object.entries(response.data.errors)
                errors.forEach(item => setFieldError(item[0], item[1][0]))
            }
        }
    }
}

export const deleteUserImage = (user_id, image_id) => {
    return async (dispatch) => {
        try {
            dispatch(toggleDialogLoading(true))
            const res = await destroyUserImage(user_id, image_id)
            if (res.status === 204) {
                dispatch(dropUserImage())
                dispatch(toggleDialogLoading(false))
                dispatch(toggleDeleteProfileImageDialog(false, '', null))
                dispatch(toggleSnackbar(true, 'Image deleted'))
            }
        } catch (e) {
            console.log(e)
        }
    }
}