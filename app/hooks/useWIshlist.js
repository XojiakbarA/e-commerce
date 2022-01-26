import { useDispatch, useSelector } from "react-redux"
import { addToWishlist, deleteFromWishlist } from "../store/actions/async/user"

export const useWIshlist = (id) => {

    const dispatch = useDispatch()

    const wishlist = useSelector(state => state.wishlist)

    const productInWishlist = wishlist.find(item => item.id === id)

    const addProductWishlist = () => {
        dispatch(addToWishlist(id))
    }

    const deleteProductWishlist = () => {
        dispatch(deleteFromWishlist(id))
    }

    return {
        productInWishlist,
        addProductWishlist,
        deleteProductWishlist
    }
}