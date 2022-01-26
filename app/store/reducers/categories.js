import * as type from '../actions/types'

const initialState = []

const categories = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_CATS:
            return action.payload
        default:
            return state
    }
}

export default categories