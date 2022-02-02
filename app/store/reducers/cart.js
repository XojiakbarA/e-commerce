import * as type from '../actions/types'

const initialState = {
    data: [],
    total: null
}

const cart = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_CART:
            return action.payload
        default:
            return state
    }
}

export default cart