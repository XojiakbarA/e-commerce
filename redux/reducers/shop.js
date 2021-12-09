import * as type from '../types'

const initialState = {}

const shop = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_SHOP:
            return action.payload
        default:
            return state
    }
}

export default shop