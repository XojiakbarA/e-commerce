import * as type from '../types'

const initialState = false

const cartSidebar = (state = initialState, action) => {
    switch (action.type) {
        case type.TOGGLE_CART_SIDEBAR:
            return !state
        default:
            return state
    }
}

export default cartSidebar