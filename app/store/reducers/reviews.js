import * as type from '../actions/types'

const initialState = {}

const reviews = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_REVIEWS:
            return action.payload
        default:
            return state
    }
}

export default reviews