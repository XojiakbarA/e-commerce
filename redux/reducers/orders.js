import * as type from '../types'

const initialState = {
    isFetching: false
}

const orders = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_ORDERS_FETCHING:
            return { ...state, isFetching: action.payload }
        case type.SET_ORDERS:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export default orders