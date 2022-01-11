import * as type from '../types'

const initialState = []

const regions = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_REGIONS:
            return action.payload
        default:
            return state
    }
}

export default regions