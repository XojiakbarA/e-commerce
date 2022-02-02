import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, deleteFromCart, removeFromCart } from "../store/actions/async/user"

export const useCart = (id) => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart.data)

    const [isClicked, setIsClicked] = useState(false)

    const [cartFetching, setCartFetching] = useState(false)

    const productInCart = cart.find(item => item.id === id)

    const addProductCart = (e, clickedId) => {
        setIsClicked(clickedId === id)
        e.preventDefault()
        dispatch(addToCart(id, setIsClicked, setCartFetching))
    }

    const removeProductCart = (e, clickedId) => {
        setIsClicked(clickedId === id)
        e.preventDefault()
        dispatch(removeFromCart(id, setIsClicked, setCartFetching))
    }

    const deleteProductCart = (e, clickedId) => {
        setIsClicked(clickedId === id)
        e.preventDefault()
        dispatch(deleteFromCart(id, setIsClicked, setCartFetching))
    }

    return {
        productInCart,
        cartFetching,
        isClicked,
        addProductCart,
        removeProductCart,
        deleteProductCart
    }
}