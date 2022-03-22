import * as type from '../actions/types'

const initialState = {
    isLoading: false,
    cartSidebar: false,
    accountMenu: null,

    snackbar: {
        open: false,
        text: '',
        color: 'success'
    }
}

const toggleReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.IS_LOADING:
            return { ...state, isLoading: action.payload }

        case type.TOGGLE_SNACKBAR:
            return {
                ...state,
                snackbar: {
                    ...state.snackbar,
                    open: action.open,
                    text: action.text,
                    color: action.color
                }
            }

        case type.TOGGLE_CART_SIDEBAR:
            return { ...state, cartSidebar: action.payload }
        case type.TOGGLE_ACCOUNT_MENU:
            return { ...state, accountMenu: action.payload }
        default:
            return state
    }
}

export default toggleReducer