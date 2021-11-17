import * as type from '../types'
import { fetchCategories } from '../../api/api'

export const setCat = (cats) => ({
    type: type.SET_CAT,
    payload: cats
})

export const openCartSidebar = () => ({
    type: type.OPEN_CART_SIDEBAR
})

export const closeCartSidebar = () => ({
    type: type.CLOSE_CART_SIDEBAR
})

export const openLoginDialog = () => ({
    type: type.OPEN_LOGIN_DIALOG
})

export const closeLoginDialog = () => ({
    type: type.CLOSE_LOGIN_DIALOG
})

export const getCategories = async (store) => {
    try {
        const res = await fetchCategories()
        store.dispatch(setCat(res.data))
    } catch (e) {
        store.dispatch(setCat([{id: 1, title: 'server is offline'}]))
        console.log(e.errno, e.code)
    }
}