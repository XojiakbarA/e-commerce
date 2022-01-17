import * as type from '../types'

const initialState = {
    isFetching: false,
    data: []
}

const districts = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_DISTRICTS:
            return { ...state, data: action.payload }
        case type.SET_DISTRICTS_FETCHING:
            return { ...state, isFetching: action.payload }
        default:
            return state
    }
}

export default districts