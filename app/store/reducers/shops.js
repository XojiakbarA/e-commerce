import * as type from '../actions/types'

const initialState = []

const shops = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_SHOPS:
            return action.payload
        default:
            return state
    }
}

export default shops