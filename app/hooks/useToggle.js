import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import {
    setDialogContent,
    setProduct, toggleAccountMenu, toggleAddProductDialog, toggleAddReviewDialog,
    toggleCartSidebar, toggleConfirmDialog, toggleDeleteCategoryDialog, toggleDeleteProductDialog, toggleDeleteSubCategoryDialog, toggleEditProductDialog, toggleEditProfileDialog,
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

    const openConfirmDialog = (text, payload) => {
        // dispatch(setOrderShop(obj))
        dispatch(toggleConfirmDialog(true, text, payload))
    }
    const closeConfirmDialog = () => {
        dispatch(toggleConfirmDialog(false, '', {}))
    }

    const openDeleteCategoryDialog = (text, payload) => {
        dispatch(toggleDeleteCategoryDialog(true))
        dispatch(setDialogContent(text, payload))
    }
    const closeDeleteCategoryDialog = () => {
        dispatch(toggleDeleteCategoryDialog(false))
        dispatch(setDialogContent('', {}))
    }

    const openDeleteSubCategoryDialog = (text, payload) => {
        dispatch(toggleDeleteSubCategoryDialog(true))
        dispatch(setDialogContent(text, payload))
    }
    const closeDeleteSubCategoryDialog = () => {
        dispatch(toggleDeleteSubCategoryDialog(false))
        dispatch(setDialogContent('', {}))
    }

    const openDeleteProductDialog = (text, payload) => {
        dispatch(toggleDeleteProductDialog(true))
        dispatch(setDialogContent(text, payload))
    }
    const closeDeleteProductDialog = () => {
        dispatch(toggleDeleteProductDialog(false))
        dispatch(setDialogContent('', {}))
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
        openConfirmDialog,
        closeConfirmDialog,
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

        handleAccount
    }
}