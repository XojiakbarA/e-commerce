import * as type from '../actions/types'

const initialState = {
    data: [],
    total: null
}

const cart = (state = initialState, action) => {

    const newState = null
    const newData = null
    const index = null

    switch (action.type) {
        case type.SET_CART:
            return action.payload

        case type.ADD_CART:
            newData = [ ...state.data ]

            index = newData.findIndex(item => item.id === action.payload.id)

            if (index === -1) {
                newData.unshift(action.payload)
            } else {
                newData[index] = action.payload
            }

            newState = { data: newData, total: action.total }
            return newState

        case type.REMOVE_CART:
            newData = [ ...state.data ]

            index = newData.findIndex(item => item.id === action.payload.id)

            newData[index] = action.payload

            newState = { data: newData, total: action.total }
            return newState

        case type.DELETE_CART:
            newData = state.data.filter(item => item.id !== action.payload)

            newState = { data: newData, total: action.total }
            return newState

        default:
            return state
    }
}

export default cart