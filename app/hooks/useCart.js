import { useDispatch, useSelector } from "react-redux"
import { addToCart, deleteFromCart, removeFromCart } from "../store/actions/async/user"

export const useCart = (id) => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart.data)

    const productInCart = cart.find(item => item.id === id)

    const addProductCart = (e) => {
        e.preventDefault()
        dispatch(addToCart(id))
    }

    const removeProductCart = (e) => {
        e.preventDefault()
        dispatch(removeFromCart(id))
    }

    const deleteProductCart = (e) => {
        e.preventDefault()
        dispatch(deleteFromCart(id))
    }

    return {
        productInCart,
        addProductCart,
        removeProductCart,
        deleteProductCart
    }
}