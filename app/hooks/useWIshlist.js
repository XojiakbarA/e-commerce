import cookies from 'js-cookie'
import { useDispatch, useSelector } from "react-redux"
import { addToWishlist, removeFromWishlist, toggleSnackbar } from "../store/actions/actionCreators"


export const useWishlist = (product) => {

    const dispatch = useDispatch()

    const wishlist = useSelector(state => state.wishlist)

    const productInWishlist = wishlist.find(item => item.id === product.id)

    const addProductWishlist = (e) => {
        e.preventDefault()
        dispatch(addToWishlist(product))
        dispatch(toggleSnackbar(true, 'Product added to wishlist!', 'success'))

        let wishlist = cookies.get('wishlist') ? JSON.parse(cookies.get('wishlist')) : []
        wishlist.push(product.id)
        wishlist = JSON.stringify(wishlist)
        cookies.set('wishlist', wishlist, { expires: 7 })
    }

    const deleteProductWishlist = (e) => {
        e.preventDefault()
        dispatch(removeFromWishlist(product.id))
        dispatch(toggleSnackbar(true, 'Product removed from wishlist!', 'success'))

        let wishlist = JSON.parse(cookies.get('wishlist'))
        wishlist = wishlist.filter(item => item !== product.id)
        if (wishlist.length === 0) {
            cookies.remove('wishlist')
            return
        }
        wishlist = JSON.stringify(wishlist)
        cookies.set('wishlist', wishlist, { expires: 7 })
    }

    return {
        productInWishlist,
        addProductWishlist,
        deleteProductWishlist
    }
}