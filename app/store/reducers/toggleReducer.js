import * as type from '../actions/types'

const initialState = {
    isLoading: false,
    loginDialog: false,
    registerDialog: false,
    orderDialog: false,
    orderShipDialog: false,
    cancelOrderDialog: {isOpen: false, text: '', payload: ''},
    editProfileDialog: false,
    addProductDialog: false,
    viewProductDialog: {isOpen: false, payload: {}},
    editProductDialog: {isOpen: false, payload: {}},
    addReviewDialog: {isOpen: false, payload: ''},
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
    deleteRegionDialog: {
        isOpen: false,
        text: '',
        payload: {}
    },
    deleteDistrictDialog: {
        isOpen: false,
        text: '',
        payload: {}
    },
    deleteProductDialog: {
        isOpen: false,
        text: '',
        payload: {}
    },
    deleteProductImageDialog: {
        isOpen: false,
        text: '',
        product_id: null,
        image_id: null
    },
    deleteBannerDialog: {
        isOpen: false,
        text: '',
        payload: {}
    },
    snackbar: {
        open: false,
        text: '',
        color: 'success'
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

        case type.TOGGLE_DELETE_REGION_DIALOG:
            return {
                ...state,
                deleteRegionDialog: {
                    isOpen: action.isOpen,
                    text: action.text,
                    payload: action.payload
                }
            }

        case type.TOGGLE_DELETE_DISTRICT_DIALOG:
            return {
                ...state,
                deleteDistrictDialog: {
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

        case type.TOGGLE_DELETE_PRODUCT_IMAGE_DIALOG:
            return {
                ...state,
                deleteProductImageDialog: {
                    isOpen: action.isOpen,
                    text: action.text,
                    product_id: action.product_id,
                    image_id: action.image_id
                }
            }

        case type.TOGGLE_DELETE_BANNER_DIALOG:
            return {
                ...state,
                deleteBannerDialog: {
                    isOpen: action.isOpen,
                    text: action.text,
                    payload: action.payload
                }
            }

        case type.TOGGLE_SNACKBAR:
            return {
                ...state,
                snackbar: {
                    ...state.snackbar,
                    open: action.open,
                    text: action.text,
                    color: action.color
                }
            }

        case type.TOGGLE_EDIT_PROFILE_DIALOG:
            return { ...state, editProfileDialog: action.payload }
        case type.TOGGLE_ADD_PRODUCT_DIALOG:
            return { ...state, addProductDialog: action.payload }
        case type.TOGGLE_VIEW_PRODUCT_DIALOG:
            return {
                ...state,
                viewProductDialog: {
                    isOpen: action.isOpen,
                    payload: action.payload
                }
            }

        case type.TOGGLE_EDIT_PRODUCT_DIALOG:
            return {
                ...state,
                editProductDialog: {
                    isOpen: action.isOpen,
                    payload: action.payload
                }
            }

        case type.TOGGLE_ADD_REVIEW_DIALOG:
            return {
                ...state,
                addReviewDialog: {
                    isOpen: action.isOpen,
                    payload: action.payload
                }
            }

        case type.TOGGLE_CANCEL_ORDER_DIALOG:
            return {
                ...state,
                cancelOrderDialog: {
                    isOpen: action.isOpen,
                    text: action.text,
                    payload: action.payload
                }
            }

        case type.TOGGLE_CART_SIDEBAR:
            return { ...state, cartSidebar: action.payload }
        case type.TOGGLE_ACCOUNT_MENU:
            return { ...state, accountMenu: action.payload }
        default:
            return state
    }
}

export default toggleReducer