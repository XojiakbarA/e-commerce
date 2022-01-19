import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { 
    setProduct, toggleAccountMenu, toggleAddProductDialog, toggleCartSidebar, toggleConfirmDialog,
    toggleDeleteProductDialog, toggleEditProductDialog,
    toggleEditProfileDialog, toggleLoginDialog, toggleRegisterDialog,
    toggleViewProductDialog
} from "../../redux/actions"

export const useToggle = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    const toggle = useSelector(state => state.toggle)
    const user = useSelector(state => state.user)

    const {
        addProductDialog, deleteProductDialog,
        editProductDialog, viewProductDialog,
        confirmDialog, editProfileDialog,
        loginDialog, registerDialog,
        orderDialog, accountMenu, cartSidebar
    } = toggle

    const openAddProductDialog = () => {
        dispatch(toggleAddProductDialog(true))
    }
    const closeAddProductDialog = () => {
        dispatch(toggleAddProductDialog(false))
    }

    const openDeleteProductDialog = (product) => {
        dispatch(setProduct(product))
        dispatch(toggleDeleteProductDialog(true))
    }
    const closeDeleteProductDialog = () => {
        dispatch(toggleDeleteProductDialog(false))
    }

    const openEditProductDialog = (product) => {
        dispatch(setProduct(product))
        dispatch(toggleEditProductDialog(true))
    }
    const closeEditProductDialog = (setPreview) => {
        dispatch(toggleEditProductDialog(false))
        setPreview([])
    }

    const openViewProductDialog = (product) => {
        dispatch(setProduct(product))
        dispatch(toggleViewProductDialog(true))
    }
    const closeViewProductDialog = () => {
        dispatch(toggleViewProductDialog(false))
    }

    const openConfirmDialog = () => {
        dispatch(toggleConfirmDialog(true))
    }
    const closeConfirmDialog = () => {
        dispatch(toggleConfirmDialog(false))
    }

    const openEditProfileDialog = () => {
        dispatch(toggleEditProfileDialog(true))
    }
    const closeEditProfileDialog = (setPreview, setFieldValue) => {
        dispatch(toggleEditProfileDialog(false))
        setPreview(null)
        setFieldValue('image', null)
    }

    const openLoginDialog = () => {
        dispatch(toggleRegisterDialog(false))
        dispatch(toggleLoginDialog(true))
    }
    const closeLoginDialog = () => {
        dispatch(toggleLoginDialog(false))
    }

    const openRegisterDialog = () => {
        dispatch(toggleRegisterDialog(true))
        dispatch(toggleLoginDialog(false))
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

    const handleAccount = (e) => {
        if (user) {
            openAccountMenu(e)
        } else {
            openLoginDialog()
        }
    }

    return {
        addProductDialog,
        deleteProductDialog,
        editProductDialog,
        viewProductDialog,
        confirmDialog,
        orderDialog,
        editProfileDialog,
        loginDialog,
        registerDialog,
        accountMenu,
        cartSidebar,

        openAddProductDialog,
        closeAddProductDialog,
        openDeleteProductDialog,
        closeDeleteProductDialog,
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

        handleAccount
    }
}