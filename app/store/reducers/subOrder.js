import * as type from '../actions/types'

const initialState = {}

const subOrder = (state = initialState, action) => {

    switch (action.type) {
        case type.SET_SUB_ORDER:
            return action.payload

        case type.SHIP_SUB_ORDER:
            return { ...state, status: action.payload }

        case type.EDIT_QTY_ORDER_PRODUCTS:
            return {
                ...state,
                order_products: action.payload.order_products,
                total: action.payload.total
            }

        default:
            return state
    }
}

export default subOrder