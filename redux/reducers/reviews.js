import * as type from '../types'

const initialState = {
    isLoading: false,
    data: []
}

const reviews = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_REVIEWS:
            return { ...state, data: action.payload }
        case type.SET_REVIEWS_LOADING:
            return { ...state, isLoading: action.payload }
        default:
            return state
    }
}

export default reviews