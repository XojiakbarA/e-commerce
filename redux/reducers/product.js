import * as type from '../types'

const initialState = {}

const product = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_PRODUCT:
            return action.payload
        default:
            return state
    }
}

export default product