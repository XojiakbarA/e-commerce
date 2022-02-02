import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToWishlist, deleteFromWishlist } from "../store/actions/async/user"

export const useWishlist = (id) => {

    const dispatch = useDispatch()

    const wishlist = useSelector(state => state.wishlist)

    const productInWishlist = wishlist.find(item => item.id === id)

    const [isWishClicked, setIsWishClicked] = useState(false)

    const [wishlistFetching, setWishlistFetching] = useState(false)

    const addProductWishlist = (e, clickedId) => {
        setIsWishClicked(clickedId === id)
        dispatch(addToWishlist(id, setIsWishClicked, setWishlistFetching))
    }

    const deleteProductWishlist = (e, clickedId) => {
        setIsWishClicked(clickedId === id)
        dispatch(deleteFromWishlist(id, setIsWishClicked, setWishlistFetching))
    }

    return {
        productInWishlist,
        wishlistFetching,
        isWishClicked,
        addProductWishlist,
        deleteProductWishlist
    }
}