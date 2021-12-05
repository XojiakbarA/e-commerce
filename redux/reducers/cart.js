import * as type from '../types'

const initialState = []

const cart = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_CART:
            return action.payload
        default:
            return state
    }
}

export default cart