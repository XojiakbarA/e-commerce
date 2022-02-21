import * as type from '../actions/types'

const initialState = []

const banners = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_BANNERS:
            return action.payload
        case type.UPDATE_BANNERS:
            const newState = [ ...state ]
            const i = newState.findIndex(item => item.id === action.payload.id)
            newState[i] = action.payload
            return newState
        default:
            return state
    }
}

export default banners