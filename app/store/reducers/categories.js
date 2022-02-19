import * as type from '../actions/types'

const initialState = []

const categories = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_CATEGORIES:
            return action.payload
        case type.ADD_CATEGORY:
            return state.concat(action.payload)
        default:
            return state
    }
}

export default categories