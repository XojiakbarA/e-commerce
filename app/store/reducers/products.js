import * as type from '../actions/types'

const initialState = {}

const products = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_PRODUCTS:
            return action.payload
        default:
            return state
    }
}

export default products