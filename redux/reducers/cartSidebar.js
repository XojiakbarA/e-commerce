import * as type from '../types'

const initialState = {
    isOpen: false
}

const cartSidebar = (state = initialState, action) => {
    switch (action.type) {
        case type.OPEN_CART_SIDEBAR:
            return { isOpen: true }
        case type.CLOSE_CART_SIDEBAR:
            return { isOpen: false }
        default:
            return state
    }
}

export default cartSidebar