import { login, logout, fetchUser, fetchCart, addCart, removeCart, deleteCart, register, fetchReviews, addReview, addWishlist, fetchWishlist, deleteWishlist } from '../../../api/user'
import { setUser, setCart, setLoading, closeAccountMenu, setSnackbar, toggleLoginDialog, toggleRegisterDialog, setReviews, setWishlist } from '..'

export const getCart = () => {
    return async (dispatch) => {
        try {
            const res = await fetchCart()
            if (res.status === 200) {
                dispatch(setCart(res.data.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const addToCart = (id) => {
    return async (dispatch) => {
        try {
            const res = await addCart(id)
            if (res.status === 200) {
                dispatch(setCart(res.data.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const removeFromCart = (id) => {
    return async (dispatch) => {
        try {
            const res = await removeCart(id)
            if (res.status === 200) {
                dispatch(setCart(res.data.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteFromCart = (id) => {
    return async (dispatch) => {
        try {
            const res = await deleteCart(id)
            if (res.status === 200) {
                dispatch(setCart(res.data.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const getWishlist = () => {
    return async (dispatch) => {
        try {
            const res = await fetchWishlist()
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

export const getUser = () => {
    return async (dispatch) => {
        try {
            const res = await fetchUser()
            if (res.status === 200) {
                dispatch(setUser(res.data))
            }
        } catch (e) {
            //console.log(e.response?.statusText)
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
            const res = await fetchReviews(id)
            if (res.status === 200) {
                dispatch(setReviews(res.data.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const userReview = (data) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await addReview(data)
            if (res.status === 201) {
                dispatch(setLoading(false))
                dispatch(setSnackbar({isOpen: true, text: 'Review created successfully!'}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}