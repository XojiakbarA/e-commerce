import { combineReducers } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import category from './category'
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
import orders from "./orders";
import order from "./order";
import districts from './districts'
import regions from './regions'

const combindedReducer = combineReducers({
    category: category,
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
    regions: regions,
    districts: districts,
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