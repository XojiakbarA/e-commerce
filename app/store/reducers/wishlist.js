import * as type from '../actions/types'

const initialState = []

const wishlist = (state = initialState, action) => {

    switch (action.type) {

        case type.SET_WISHLIST:
            return action.payload

        case type.ADD_WISHLIST:
            return state.concat(action.payload)

        case type.REMOVE_WISHLIST:
            return state.filter(item => item.id !== action.id)

        default:
            return state
    }
}

export default wishlist