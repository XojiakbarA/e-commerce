import * as type from '../types'

const initialState = []

const categories = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_CAT:
            return action.payload
        default:
            return state
    }
}

export default categories