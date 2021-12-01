import * as type from '../types'

const initialState = false

const loginDialog = (state = initialState, action) => {
    switch (action.type) {
        case type.TOGGLE_LOGIN_DIALOG:
            return !state
        default:
            return state
    }
}

export default loginDialog