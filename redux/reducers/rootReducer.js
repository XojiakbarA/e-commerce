import { combineReducers } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import cartSidebar from './cartSidebar'
import loginDialog from './loginDialog'
import categories from './categories'
import brands from './brands'
import banners from './banners'
import products from './products'
import product from './product'
import accountMenu from './accountMenu'

const combindedReducer = combineReducers({
    cartSidebar: cartSidebar,
    loginDialog: loginDialog,
    categories: categories,
    brands: brands,
    banners: banners,
    products: products,
    product: product,
    accountMenu: accountMenu
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