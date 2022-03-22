import * as type from '../actions/types'

const initialState = {}

const order = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_ORDER:
            return action.payload

        case type.SET_SUB_ORDER_STATUS:
            return {
                ...state,
                sub_orders: state.sub_orders.map(sub_order => {
                    if (sub_order.id === action.payload.id) {
                        sub_order.status = action.payload.status
                    }
                    return sub_order
                })
            }

        default:
            return state
    }
}

export default order