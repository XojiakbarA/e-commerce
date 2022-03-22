import * as type from '../actions/types'

const initialState = {}

const reviews = (state = initialState, action) => {
    switch (action.type) {

        case type.SET_REVIEWS:
            return action.payload

        case type.SET_REVIEW_PUBLISHED:
            return {
                ...state,
                data: state.data.map(review => {
                    if (review.id === action.id) {
                        review.published = action.payload
                    }
                    return review
                })
            }

        default:
            return state
    }
}

export default reviews