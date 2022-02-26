import * as type from '../actions/types'

const initialState = {}

const category = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_CATEGORY:
            return action.payload
        default:
            return state
    }
}

export default category