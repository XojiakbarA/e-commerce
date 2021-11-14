import { combineReducers } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import cartSidebar from './cartSidebar'
import loginDialog from './loginDialog'
import categories from './categories'

const combindedReducer = combineReducers({
    cartSidebar: cartSidebar,
    loginDialog: loginDialog,
    categories: categories
})

const rootReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload
        }
        if (state.count) nextState.count = state.count
        return nextState
        } else {
            return combindedReducer(state, action)
    }
}

export default rootReducer