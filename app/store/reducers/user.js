import * as type from '../actions/types'

const initialState = null

const user = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_USER:
            return action.payload
        case type.DROP_USER_IMAGE:
            return { ...state, image: null }
        default:
            return state
    }
}

export default user