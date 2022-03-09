import * as type from '../actions/types'

const initialState = {
    data: [],
    total: null
}

const cart = (state = initialState, action) => {

    let newState = null
    let newData = null
    let newTotal = null
    let item = null

    switch (action.type) {

        case type.SET_CART:
            newData = action.payload.map(product => {
                const cookieProduct = action.cookieCart.find(cookieItem => cookieItem.id === product.id)
                product.quantity = cookieProduct.quantity
                return product
            })
            newTotal = newData.reduce((sum, current) => {
                return sum + current.quantity * (current.sale_price ?? current.price)
            }, 0)
            newState = { data: newData, total: newTotal }
            return newState

        case type.ADD_CART:
            item = { ...action.payload, quantity: 1 }

            newData = [ ...state.data ]

            newData.push(item)

            newData.sort((a, b) => b.id - a.id)

            newTotal = state.data + item.sale_price ?? item.price

            newState = { data: newData, total: newTotal }
            return newState

        case type.REMOVE_CART:
            item = state.data.find(product => product.id === action.id)

            newData = state.data.filter(item => item.id !== action.id)

            newTotal = state.total - item.quantity * (item.sale_price ?? item.price)

            newState = { data: newData, total: newTotal }
            return newState

        case type.INCREMENT_CART:
            item = state.data.find(product => product.id === action.id)

            newData = state.data.map(item => {
                if (item.id === action.id) ++item.quantity
                return item
            })

            newTotal = state.total + (item.sale_price ?? item.price)

            newState = { data: newData, total: newTotal }
            return newState

        case type.DECREMENT_CART:
            item = state.data.find(product => product.id === action.id)

            if (item.quantity === 1) {
                newData = state.data.filter(item => item.id !== action.id)
            } else {
                newData = state.data.map(item => {
                    if (item.id === action.id) --item.quantity
                    return item
                })
            }

            newTotal = state.total - (item.sale_price ?? item.price)

            newState = { data: newData, total: newTotal }
            return newState

        default:
            return state
    }
}

export default cart