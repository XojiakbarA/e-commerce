import * as type from '../actions/types'

const initialState = []

const orders = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_ORDERS:
            return action.payload
        default:
            return state
    }
}

export default orders