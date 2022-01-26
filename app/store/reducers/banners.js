import * as type from '../actions/types'

const initialState = []

const banners = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_BANNERS:
            return action.payload
        default:
            return state
    }
}

export default banners