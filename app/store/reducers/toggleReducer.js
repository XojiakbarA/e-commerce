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
    editProductDialog: {isOpen: false, payload: {}},
    addReviewDialog: false,
    cartSidebar: false,
    accountMenu: null,
    deleteCategoryDialog: {
        isOpen: false,
        text: '',
        payload: {}
    },
    deleteBrandDialog: {
        isOpen: false,
        text: '',
        payload: {}
    },
    deleteSubCategoryDialog: {
        isOpen: false,
        text: '',
        payload: {}
    },
    deleteProductDialog: {
        isOpen: false,
        text: '',
        payload: {}
    }
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

        case type.TOGGLE_DELETE_CATEGORY_DIALOG:
            return {
                ...state,
                deleteCategoryDialog: {
                    isOpen: action.isOpen,
                    text: action.text,
                    payload: action.payload
                }
            }

        case type.TOGGLE_DELETE_BRAND_DIALOG:
            return {
                ...state,
                deleteBrandDialog: {
                    isOpen: action.isOpen,
                    text: action.text,
                    payload: action.payload
                }
            }

        case type.TOGGLE_DELETE_SUB_CATEGORY_DIALOG:
            return {
                ...state,
                deleteSubCategoryDialog: {
                    isOpen: action.isOpen,
                    text: action.text,
                    payload: action.payload
                }
            }

        case type.TOGGLE_DELETE_PRODUCT_DIALOG:
            return {
                ...state,
                deleteProductDialog: {
                    isOpen: action.isOpen,
                    text: action.text,
                    payload: action.payload
                }
            }

        case type.TOGGLE_EDIT_PROFILE_DIALOG:
            return { ...state, editProfileDialog: action.payload }
        case type.TOGGLE_ADD_PRODUCT_DIALOG:
            return { ...state, addProductDialog: action.payload }
        case type.TOGGLE_VIEW_PRODUCT_DIALOG:
            return { ...state, viewProductDialog: action.payload }

        case type.TOGGLE_EDIT_PRODUCT_DIALOG:
            return {
                ...state,
                editProductDialog: {
                    isOpen: action.isOpen,
                    payload: action.payload
                }}

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