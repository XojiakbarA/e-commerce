import * as type from '../actions/types'

const initialState = []

const brands = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_BRANDS:
            return action.payload
        default:
            return state
    }
}

export default brands