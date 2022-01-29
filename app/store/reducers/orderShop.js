import * as type from '../actions/types'

const initialState = {}

const orderShop = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_ORDER_SHOP:
            return action.payload
        default:
            return state
    }
}

export default orderShop