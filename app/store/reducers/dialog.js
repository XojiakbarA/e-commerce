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

    order_id: null,
    cat_id: null,
    sub_cat_id: null,
    brand_id: null,
    region_id: null,
    district_id: null,
    prod_id: null,
    image_id: null,
    banner_id: null,
    review_id: null,
}

const dialog = (state = initialState, action) => {

    switch (action.type) {

        case type.TOGGLE_DIALOG_LOADING:
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
                order_id: action.id
            }

        case type.TOGGLE_DELETE_CATEGORY_DIALOG:
            return {
                ...state,
                deleteCategoryDialog: action.bool,
                text: action.text,
                cat_id: action.id
            }

        case type.TOGGLE_DELETE_BRAND_DIALOG:
            return {
                ...state,
                deleteBrandDialog: action.bool,
                text: action.text,
                brand_id: action.id
            }

        case type.TOGGLE_DELETE_SUB_CATEGORY_DIALOG:
            return {
                ...state,
                deleteSubCategoryDialog: action.bool,
                text: action.text,
                sub_cat_id: action.id
            }

        case type.TOGGLE_DELETE_REGION_DIALOG:
            return {
                ...state,
                deleteRegionDialog: action.bool,
                text: action.text,
                region_id: action.id
            }

        case type.TOGGLE_DELETE_DISTRICT_DIALOG:
            return {
                ...state,
                deleteDistrictDialog: action.bool,
                text: action.text,
                district_id: action.id
            }

        case type.TOGGLE_DELETE_PRODUCT_DIALOG:
            return {
                ...state,
                deleteProductDialog: action.bool,
                text: action.text,
                prod_id: action.id
            }

        case type.TOGGLE_DELETE_PRODUCT_IMAGE_DIALOG:
            return {
                ...state,
                deleteProductImageDialog: action.bool,
                text: action.text,
                image_id: action.id
            }

        case type.TOGGLE_DELETE_PROFILE_IMAGE_DIALOG:
            return {
                ...state,
                deleteProfileImageDialog: action.bool,
                text: action.text,
                image_id: action.id
            }

        case type.TOGGLE_DELETE_BANNER_DIALOG:
            return {
                ...state,
                deleteBannerDialog: action.bool,
                text: action.text,
                banner_id: action.id
            }

        case type.TOGGLE_ADD_REVIEW_DIALOG:
            return {
                ...state,
                addReviewDialog: action.bool,
                review_id: action.id
            }

        case type.TOGGLE_VIEW_PRODUCT_DIALOG:
            return {
                ...state,
                viewProductDialog: action.bool,
                prod_id: action.id
            }

        case type.TOGGLE_EDIT_PRODUCT_DIALOG:
            return {
                ...state,
                editProductDialog: action.bool,
                prod_id: action.id
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