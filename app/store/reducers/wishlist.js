import * as type from '../actions/types'

const initialState = []

const wishlist = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_WISHLIST:
            return action.payload
        default:
            return state
    }
}

export default wishlist