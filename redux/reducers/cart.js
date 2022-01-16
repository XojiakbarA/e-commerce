import * as type from '../types'

const initialState = {
    isFetching: false
}

const cart = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_CART_FETCHING:
            return { ...state, isFetching: action.payload }
        case type.SET_CART:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export default cart