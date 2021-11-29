import * as type from '../types'

const initialState = null

const accountMenu = (state = initialState, action) => {
    switch (action.type) {
        case type.OPEN_ACCOUNT_MENU:
            return action.payload
            debugger
        case type.CLOSE_ACCOUNT_MENU:
            return null
        default:
            return state
    }
}

export default accountMenu