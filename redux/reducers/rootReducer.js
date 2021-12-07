import { combineReducers } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import categories from './categories'
import brands from './brands'
import banners from './banners'
import products from './products'
import product from './product'
import accountMenu from './accountMenu'
import isLoading from './isLoading'
import snackbar from './snackbar'
import user from './user'
import cart from './cart'
import toggle from './toggleReducer'

const combindedReducer = combineReducers({
    categories: categories,
    brands: brands,
    banners: banners,
    products: products,
    product: product,
    accountMenu: accountMenu,
    isLoading: isLoading,
    snackbar: snackbar,
    user: user,
    cart: cart,
    toggle: toggle
})

const rootReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload
        }
        if (state.count) nextState.count = state.count
        return nextState
        } else {
            return combindedReducer(state, action)
    }
}

export default rootReducer