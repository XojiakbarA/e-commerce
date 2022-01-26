import * as type from '../actions/types'

const initialState = {
    isOpen: false,
    text: ''
}

const snackbar = (state = initialState, action) => {
    switch (action.type) {
        case type.IS_OPEN_SNACKBAR:
            return action.payload
        default:
            return state
    }
}

export default snackbar