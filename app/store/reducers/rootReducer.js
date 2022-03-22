import { combineReducers } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import categories from './categories'
import brands from './brands'
import banners from './banners'
import products from './products'
import product from './product'
import user from './user'
import cart from './cart'
import toggle from './toggleReducer'
import reviews from './reviews'
import shops from './shops'
import shop from './shop'
import wishlist from './wishlist'
import orders from "./orders"
import order from "./order"
import subOrder from './subOrder'
import districts from './districts'
import regions from './regions'
import dialog from './dialog'

const combindedReducer = combineReducers({
    categories: categories,
    brands: brands,
    banners: banners,
    products: products,
    product: product,
    user: user,
    cart: cart,
    toggle: toggle,
    reviews: reviews,
    shops: shops,
    shop: shop,
    wishlist: wishlist,
    orders: orders,
    order: order,
    subOrder: subOrder,
    regions: regions,
    districts: districts,
    dialog: dialog
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