import * as type from '../actions/types'

const initialState = []

const regions = (state = initialState, action) => {

    const newState = null
    const reg_index = null

    switch (action.type) {
        case type.SET_REGIONS:
            return action.payload

        case type.ADD_REGION:
            return state.concat(action.payload)

        case type.UPDATE_REGIONS:
            newState = [ ...state ]
            reg_index = newState.findIndex(region => region.id === action.payload.id)
            newState[reg_index] = action.payload
            return newState

        case type.DELETE_REGION:
            return state.filter(region => region.id !== action.payload)

        default:
            return state
    }
}

export default regions