import * as type from '../actions/types'

const initialState = {
    isFetching: false,
    data: []
}

const districts = (state = initialState, action) => {

    const newState = null
    const dist_index = null

    switch (action.type) {
        case type.SET_DISTRICTS:
            return { ...state, data: action.payload }

        case type.ADD_DISTRICT:
            return { ...state, data: state.data.concat(action.payload) }

        case type.UPDATE_DISTRICTS:
            newState = { ...state, data: [ ...state.data ] }
            dist_index = newState.data.findIndex(district => district.id === action.payload.id)
            newState.data[dist_index] = action.payload
            return newState

        case type.DELETE_DISTRICT:
            return { ...state, data: state.data.filter(district => district.id !== action.payload) }

        case type.SET_DISTRICTS_FETCHING:
            return { ...state, isFetching: action.payload }

        default:
            return state
    }
}

export default districts