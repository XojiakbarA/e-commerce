import * as type from '../actions/types'

const initialState = []

const categories = (state = initialState, action) => {

    const newState = null
    const cat_index = null
    const sub_cat_index = null

    switch (action.type) {
        case type.SET_CATEGORIES:
            return action.payload

        case type.ADD_CATEGORY:
            return state.concat(action.payload)

        case type.DELETE_CATEGORY:
            return state.filter(item => item.id !== action.payload)

        case type.DELETE_SUB_CATEGORY:
            newState = [ ...state ]
            cat_index = newState.findIndex(cat => (
                cat.sub_categories.find(sub_cat => (
                    sub_cat.id === action.payload
                ))
            ))
            const newSubCats = newState[cat_index].sub_categories.filter(sub_cat => sub_cat.id !== action.payload)
            newState[cat_index].sub_categories = newSubCats
            return newState

        case type.ADD_SUB_CATEGORY:
            newState = [ ...state ]
            cat_index = newState.findIndex(item => item.id === action.category_id)
            newState[cat_index].sub_categories.push(action.payload)
            return newState

        case type.UPDATE_CATEGORIES:
            newState = [ ...state ]
            cat_index = newState.findIndex(item => item.id === action.payload.id)
            newState[cat_index] = action.payload
            return newState

        case type.UPDATE_SUB_CATEGORIES:
            newState = [ ...state ]
            cat_index = newState.findIndex(cat => (
                cat.sub_categories.find(sub_cat => (
                    sub_cat.id === action.payload.id
                ))
            ))
            sub_cat_index = newState[cat_index].sub_categories.findIndex(sub_cat => (
                sub_cat.id === action.payload.id)
            )
            newState[cat_index].sub_categories[sub_cat_index] = action.payload
            return newState

        default:
            return state
    }
}

export default categories