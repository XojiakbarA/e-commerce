import { useDispatch } from "react-redux"
import { addToCart, deleteFromCart, removeFromCart } from "../../redux/actions"

export const useCart = (id) => {

    const dispatch = useDispatch()

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

    return [addProductCart, removeProductCart, deleteProductCart]
}