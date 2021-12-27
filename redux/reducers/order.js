import * as type from '../types'

const initialState = {}

const order = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_ORDER:
            return action.payload
        default:
            return state
    }
}

export default order