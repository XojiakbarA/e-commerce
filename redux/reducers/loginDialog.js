import * as type from '../types'

const initialState = {
    isOpen: false
}

const loginDialog = (state = initialState, action) => {
    switch (action.type) {
        case type.OPEN_LOGIN_DIALOG:
            return { isOpen: true }
        case type.CLOSE_LOGIN_DIALOG:
            return { isOpen: false }
        default:
            return state
    }
}

export default loginDialog