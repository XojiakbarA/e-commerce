import * as type from '../actions/types'

const initialState = []

const brands = (state = initialState, action) => {

    const newState = null
    const index = null

    switch (action.type) {

        case type.SET_BRANDS:
            return action.payload

        case type.ADD_BRAND:
            return state.concat(action.payload)

        case type.UPDATE_BRANDS:
            newState = [ ...state ]
            index = newState.findIndex(item => item.id === action.payload.id)
            newState[index] = action.payload
            return newState

        case type.DELETE_BRAND:
            return state.filter(brand => brand.id !== action.payload)

        default:
            return state
    }
}

export default brands