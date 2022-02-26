import * as type from '../actions/types'

const initialState = {
    isLoading: false,
    loginDialog: false,
    registerDialog: false,
    orderDialog: false,
    orderShipDialog: false,
    editProfileDialog: false,
    addProductDialog: false,
    viewProductDialog: false,
    editProductDialog: false,
    deleteProductDialog: false,
    deleteCategoryDialog: false,
    addReviewDialog: false,
    cartSidebar: false,
    accountMenu: null,
    confirmDialog: { isOpen: false, text: '', payload: {} }
}

const toggleReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.IS_LOADING:
            return { ...state, isLoading: action.payload }
        case type.TOGGLE_LOGIN_DIALOG:
            return { ...state, loginDialog: action.payload }
        case type.TOGGLE_REGISTER_DIALOG:
            return { ...state, registerDialog: action.payload }
        case type.TOGGLE_ORDER_DIALOG:
            return { ...state, orderDialog: action.payload }
        case type.TOGGLE_ORDER_SHIP_DIALOG:
            return { ...state, orderShipDialog: action.payload }
        case type.TOGGLE_CONFIRM_DIALOG:
            return {
                ...state,
                confirmDialog: {
                    isOpen: action.isOpen,
                    text: action.text,
                    payload: action.payload
                }}
        case type.TOGGLE_EDIT_PROFILE_DIALOG:
            return { ...state, editProfileDialog: action.payload }
        case type.TOGGLE_ADD_PRODUCT_DIALOG:
            return { ...state, addProductDialog: action.payload }
        case type.TOGGLE_VIEW_PRODUCT_DIALOG:
            return { ...state, viewProductDialog: action.payload }
        case type.TOGGLE_EDIT_PRODUCT_DIALOG:
            return { ...state, editProductDialog: action.payload }
        case type.TOGGLE_DELETE_PRODUCT_DIALOG:
            return { ...state, deleteProductDialog: action.payload }
        case type.TOGGLE_DELETE_CATEGORY_DIALOG:
            return { ...state, deleteCategoryDialog: action.payload }
        case type.TOGGLE_ADD_REVIEW_DIALOG:
            return { ...state, addReviewDialog: action.payload }
        case type.TOGGLE_CART_SIDEBAR:
            return { ...state, cartSidebar: action.payload }
        case type.TOGGLE_ACCOUNT_MENU:
            return { ...state, accountMenu: action.payload }
        default:
            return state
    }
}

export default toggleReducer