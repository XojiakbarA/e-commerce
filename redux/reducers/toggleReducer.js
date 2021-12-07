import * as type from '../types'

const initialState = {
    loginDialog: false,
    registerDialog: false,
    cartSidebar: false
}

const toggleReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.TOGGLE_LOGIN_DIALOG:
            return { ...state, loginDialog: !state.loginDialog }
        case type.TOGGLE_REGISTER_DIALOG:
            return { ...state, registerDialog: !state.registerDialog }
        case type.TOGGLE_CART_SIDEBAR:
            return { ...state, cartSidebar: !state.cartSidebar }
        default:
            return state
    }
}

export default toggleReducer