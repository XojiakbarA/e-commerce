import * as type from '../actions/types'

const initialState = {
    loading: false,
    orderShipDialog: false,
    cancelOrderDialog: false,
    deleteCategoryDialog: false,
    deleteBrandDialog: false,
    deleteSubCategoryDialog: false,
    deleteRegionDialog: false,
    deleteDistrictDialog: false,
    deleteProductDialog: false,
    deleteProductImageDialog: false,
    deleteProfileImageDialog: false,
    deleteBannerDialog: false,
    addReviewDialog: false,
    viewProductDialog: false,
    addProductDialog: false,
    editProductDialog: false,
    editProfileDialog: false,
    loginDialog: false,
    registerDialog: false,
    orderDialog: false,

    text: null,
    payload: null
}

const dialog = (state = initialState, action) => {

    switch (action.type) {

        case type.TOGGLE_LOADING_CONFIRM_DIALOG:
            return {
                ...state,
                loading: action.bool
            }

        case type.TOGGLE_ORDER_SHIP_DIALOG:
            return {
                ...state,
                orderShipDialog: action.bool,
                text: action.text
            }

        case type.TOGGLE_CANCEL_ORDER_DIALOG:
            return {
                ...state,
                cancelOrderDialog: action.bool,
                text: action.text,
                payload: action.payload
            }

        case type.TOGGLE_DELETE_CATEGORY_DIALOG:
            return {
                ...state,
                deleteCategoryDialog: action.bool,
                text: action.text,
                payload: action.payload
            }

        case type.TOGGLE_DELETE_BRAND_DIALOG:
            return {
                ...state,
                deleteBrandDialog: action.bool,
                text: action.text,
                payload: action.payload
            }

        case type.TOGGLE_DELETE_SUB_CATEGORY_DIALOG:
            return {
                ...state,
                deleteSubCategoryDialog: action.bool,
                text: action.text,
                payload: action.payload
            }

        case type.TOGGLE_DELETE_REGION_DIALOG:
            return {
                ...state,
                deleteRegionDialog: action.bool,
                text: action.text,
                payload: action.payload
            }

        case type.TOGGLE_DELETE_DISTRICT_DIALOG:
            return {
                ...state,
                deleteDistrictDialog: action.bool,
                text: action.text,
                payload: action.payload
            }

        case type.TOGGLE_DELETE_PRODUCT_DIALOG:
            return {
                ...state,
                deleteProductDialog: action.bool,
                text: action.text,
                payload: action.payload
            }

        case type.TOGGLE_DELETE_PRODUCT_IMAGE_DIALOG:
            return {
                ...state,
                deleteProductImageDialog: action.bool,
                text: action.text,
                payload: action.payload
            }

        case type.TOGGLE_DELETE_PROFILE_IMAGE_DIALOG:
            return {
                ...state,
                deleteProfileImageDialog: action.bool,
                text: action.text,
                payload: action.payload
            }

        case type.TOGGLE_DELETE_BANNER_DIALOG:
            return {
                ...state,
                deleteBannerDialog: action.bool,
                text: action.text,
                payload: action.payload
            }

        case type.TOGGLE_ADD_REVIEW_DIALOG:
            return {
                ...state,
                addReviewDialog: action.bool,
                payload: action.payload
            }

        case type.TOGGLE_VIEW_PRODUCT_DIALOG:
            return {
                ...state,
                viewProductDialog: action.bool,
                payload: action.payload
            }

        case type.TOGGLE_EDIT_PRODUCT_DIALOG:
            return {
                ...state,
                editProductDialog: action.bool,
                payload: action.payload
            }

        case type.TOGGLE_ADD_PRODUCT_DIALOG:
            return {
                ...state,
                addProductDialog: action.bool
            }

        case type.TOGGLE_EDIT_PROFILE_DIALOG:
            return {
                ...state,
                editProfileDialog: action.bool
            }

        case type.TOGGLE_LOGIN_DIALOG:
            return {
                ...state,
                loginDialog: action.bool
            }

        case type.TOGGLE_REGISTER_DIALOG:
            return {
                ...state,
                registerDialog: action.bool
            }

        case type.TOGGLE_ORDER_DIALOG:
            return {
                ...state,
                orderDialog: action.bool
            }

        default:
            return state
    }
}

export default dialog