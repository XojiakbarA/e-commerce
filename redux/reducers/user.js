import * as type from '../types'

const initialState = null

const user = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_USER:
            return action.payload
        default:
            return state
    }
}

export default user