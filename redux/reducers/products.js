import * as type from '../types'

const initialState = {}

const products = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_NEW_PRODUCTS:
            return action.payload
        case type.SET_SEARCH_PRODUCTS:
            return action.payload
        case type.SET_SHOP_PRODUCTS:
            return action.payload
        default:
            return state
    }
}

export default products