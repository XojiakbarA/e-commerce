import * as type from '../actions/types'

const initialState = []

const banners = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_BANNERS:
            return action.payload

        case type.ADD_BANNER:
            return state.concat(action.payload)

        case type.UPDATE_BANNERS:
            const newState = [ ...state ]
            const i = newState.findIndex(item => item.id === action.payload.id)
            newState[i] = action.payload
            return newState

        case type.DELETE_BANNER:
            return state.filter(banner => banner.id !== action.payload)

        default:
            return state
    }
}

export default banners