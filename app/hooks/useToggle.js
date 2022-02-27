import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import {
    setProduct, toggleAccountMenu, toggleAddProductDialog, toggleAddReviewDialog,
    toggleCartSidebar, toggleDeleteBrandDialog, toggleDeleteCategoryDialog, toggleDeleteProductDialog,
    toggleDeleteSubCategoryDialog, toggleEditProductDialog, toggleEditProfileDialog,
    toggleLoginDialog, toggleOrderShipDialog, toggleRegisterDialog, toggleViewProductDialog
} from "../store/actions/actionCreators"

export const useToggle = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    const toggle = useSelector(state => state.toggle)
    const user = useSelector(state => state.user)

    const openOrderShipDialog = () => {
        dispatch(toggleOrderShipDialog(true))
    }
    const closeOrderShipDialog = () => {
        dispatch(toggleOrderShipDialog(false))
    }

    const openAddProductDialog = () => {
        dispatch(toggleAddProductDialog(true))
    }
    const closeAddProductDialog = () => {
        dispatch(toggleAddProductDialog(false))
    }

    const openEditProductDialog = (product) => {
        dispatch(toggleEditProductDialog(true, product))
    }
    const closeEditProductDialog = () => {
        dispatch(toggleEditProductDialog(false, {}))
    }

    const openViewProductDialog = (product) => {
        dispatch(setProduct(product))
        dispatch(toggleViewProductDialog(true))
    }
    const closeViewProductDialog = () => {
        dispatch(toggleViewProductDialog(false))
    }

    const openDeleteCategoryDialog = (text, payload) => {
        dispatch(toggleDeleteCategoryDialog(true, text, payload))
    }
    const closeDeleteCategoryDialog = () => {
        dispatch(toggleDeleteCategoryDialog(false, '', {}))
    }

    const openDeleteBrandDialog = (text, payload) => {
        dispatch(toggleDeleteBrandDialog(true, text, payload))
    }
    const closeDeleteBrandDialog = () => {
        dispatch(toggleDeleteBrandDialog(false, '', {}))
    }

    const openDeleteSubCategoryDialog = (text, payload) => {
        dispatch(toggleDeleteSubCategoryDialog(true, text, payload))
    }
    const closeDeleteSubCategoryDialog = () => {
        dispatch(toggleDeleteSubCategoryDialog(false, '', {}))
    }

    const openDeleteProductDialog = (text, payload) => {
        dispatch(toggleDeleteProductDialog(true, text, payload))
    }
    const closeDeleteProductDialog = () => {
        dispatch(toggleDeleteProductDialog(false, '', {}))
    }

    const openEditProfileDialog = () => {
        dispatch(toggleEditProfileDialog(true))
    }
    const closeEditProfileDialog = () => {
        dispatch(toggleEditProfileDialog(false))
    }

    const openLoginDialog = () => {
        if (router.pathname === '/login') {
            return
        } else {
            dispatch(toggleRegisterDialog(false))
            dispatch(toggleLoginDialog(true))
        }
    }
    const closeLoginDialog = () => {
        dispatch(toggleLoginDialog(false))
    }

    const openRegisterDialog = () => {
        if (router.pathname === '/login') {
            router.push('/register')
        } else {
            dispatch(toggleRegisterDialog(true))
            dispatch(toggleLoginDialog(false))
        }
    }
    const closeRegisterDialog = () => {
        dispatch(toggleRegisterDialog(false))
    }

    const closeOrderDialog = () => {
        router.push('/')
    }

    const openAccountMenu = (e) => {
        dispatch(toggleAccountMenu(e.currentTarget))
    }
    const closeAccountMenu = () => {
        dispatch(toggleAccountMenu(null))
    }

    const openSidebar = (cartCount) => {
        if (cartCount) {
            dispatch(toggleCartSidebar(true))
        }
    }
    const closeSidebar = () => {
        dispatch(toggleCartSidebar(false))
    }

    const openAddReviewDialog = (e, product) => {
        e.preventDefault()
        dispatch(setProduct(product))
        dispatch(toggleAddReviewDialog(true))
    }
    const closeAddReviewDialog = () => {
        dispatch(toggleAddReviewDialog(false))
    }

    const handleAccount = (e) => {
        if (user) {
            openAccountMenu(e)
        } else {
            openLoginDialog()
        }
    }

    return {
        ...toggle,

        openOrderShipDialog,
        closeOrderShipDialog,
        openAddProductDialog,
        closeAddProductDialog,
        openEditProductDialog,
        closeEditProductDialog,
        openViewProductDialog,
        closeViewProductDialog,
        openEditProfileDialog,
        closeEditProfileDialog,
        openLoginDialog,
        closeLoginDialog,
        openRegisterDialog,
        closeRegisterDialog,
        closeOrderDialog,
        openAccountMenu,
        closeAccountMenu,
        openSidebar,
        closeSidebar,
        openAddReviewDialog,
        closeAddReviewDialog,
        openDeleteCategoryDialog,
        closeDeleteCategoryDialog,
        openDeleteProductDialog,
        closeDeleteProductDialog,
        openDeleteSubCategoryDialog,
        closeDeleteSubCategoryDialog,
        openDeleteBrandDialog,
        closeDeleteBrandDialog,

        handleAccount
    }
}