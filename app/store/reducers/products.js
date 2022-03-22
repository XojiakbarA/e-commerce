import * as type from '../actions/types'

const initialState = {}

const products = (state = initialState, action) => {
    switch (action.type) {

        case type.SET_PRODUCTS:
            return action.payload

        case type.SET_PRODUCT_PUBLISHED:
            return {
                ...state,
                data: state.data.map(product => {
                    if (product.id === action.id) {
                        product.published = action.payload
                    }
                    return product
                })
            }

        default:
            return state
    }
}

export default products