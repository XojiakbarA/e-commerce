import * as type from '../types'

const initialState = false

const isLoading = (state = initialState, action) => {
    switch (action.type) {
        case type.IS_LOADING:
            return action.payload
        default:
            return state
    }
}

export default isLoading