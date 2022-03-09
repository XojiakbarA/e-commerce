import cookies from 'js-cookie'
import { useDispatch, useSelector } from "react-redux"
import { addProductCart, decrementProductCart, incrementProductCart, removeProductCart, toggleSnackbar } from "../store/actions/actionCreators"

export const useCart = (product) => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart.data)

    const productInCart = cart.find(item => item.id === product.id)

    const addProduct = (e) => {
        e.preventDefault()
        dispatch(addProductCart(product))
        dispatch(toggleSnackbar(true, 'Product added to cart!', 'success'))

        let cart = cookies.get('cart') ? JSON.parse(cookies.get('cart')) : []
        cart.push({id: product.id, quantity: 1})
        cart = JSON.stringify(cart)
        cookies.set('cart', cart, { expires: 7 })
    }

    const removeProduct = (e) => {
        e.preventDefault()
        dispatch(removeProductCart(product.id))
        dispatch(toggleSnackbar(true, 'Product removed from cart!', 'success'))

        let cart = JSON.parse(cookies.get('cart'))
        cart = cart.filter(item => item.id !== product.id)
        cart = JSON.stringify(cart)
        cookies.set('cart', cart, { expires: 7 })
    }

    const incrementProduct = (e) => {
        e.preventDefault()
        dispatch(incrementProductCart(product.id))

        let cart = JSON.parse(cookies.get('cart'))
        cart.forEach(item => item.id === product.id && ++item.quantity)
        cart = JSON.stringify(cart)
        cookies.set('cart', cart, { expires: 7 })
    }

    const decrementProduct = (e) => {
        e.preventDefault()
        dispatch(decrementProductCart(product.id))

        let cart = JSON.parse(cookies.get('cart'))
        const item = cart.find(item => item.id === product.id)
        if (item.quantity === 1) {
            cart = cart.filter(item => item.id !== product.id)
        } else {
            cart.forEach(item => item.id === product.id && --item.quantity)
        }
        cart = JSON.stringify(cart)
        cookies.set('cart', cart, { expires: 7 })
    }

    return {
        productInCart,
        addProduct,
        removeProduct,
        incrementProduct,
        decrementProduct
    }
}