import * as type from './types'

export const toggleLoadingConfirmDialog = (bool) => ({
    type: type.TOGGLE_LOADING_CONFIRM_DIALOG,
    bool
})

export const toggleOrderShipDialog = (bool, text) => ({
    type: type.TOGGLE_ORDER_SHIP_DIALOG,
    bool,
    text
})

export const toggleCancelOrderDialog = (bool, text, payload) => ({
    type: type.TOGGLE_CANCEL_ORDER_DIALOG,
    bool,
    text,
    payload
})

export const toggleDeleteCategoryDialog = (bool, text, payload) => ({
    type: type.TOGGLE_DELETE_CATEGORY_DIALOG,
    bool,
    text,
    payload
})

export const toggleDeleteSubCategoryDialog = (bool, text, payload) => ({
    type: type.TOGGLE_DELETE_SUB_CATEGORY_DIALOG,
    bool,
    text,
    payload
})

export const toggleDeleteBrandDialog = (bool, text, payload) => ({
    type: type.TOGGLE_DELETE_BRAND_DIALOG,
    bool,
    text,
    payload
})

export const toggleDeleteRegionDialog = (bool, text, payload) => ({
    type: type.TOGGLE_DELETE_REGION_DIALOG,
    bool,
    text,
    payload
})

export const toggleDeleteDistrictDialog = (bool, text, payload) => ({
    type: type.TOGGLE_DELETE_DISTRICT_DIALOG,
    bool,
    text,
    payload
})

export const toggleDeleteProductDialog = (bool, text, payload) => ({
    type: type.TOGGLE_DELETE_PRODUCT_DIALOG,
    bool,
    text,
    payload
})

export const toggleDeleteProductImageDialog = (bool, text, product_id, image_id) => ({
    type: type.TOGGLE_DELETE_PRODUCT_IMAGE_DIALOG,
    bool,
    text,
    payload: { product_id, image_id }
})

export const toggleDeleteProfileImageDialog = (bool, text, id) => ({
    type: type.TOGGLE_DELETE_PROFILE_IMAGE_DIALOG,
    bool,
    text,
    payload: id
})

export const toggleDeleteBannerDialog = (bool, text, payload) => ({
    type: type.TOGGLE_DELETE_BANNER_DIALOG,
    bool,
    text,
    payload
})

export const toggleAddReviewDialog = (bool, payload) => ({
    type: type.TOGGLE_ADD_REVIEW_DIALOG,
    bool,
    payload
})

export const toggleViewProductDialog = (bool, payload) => ({
    type: type.TOGGLE_VIEW_PRODUCT_DIALOG,
    bool,
    payload
})

export const toggleEditProductDialog = (bool, payload) => ({
    type: type.TOGGLE_EDIT_PRODUCT_DIALOG,
    bool,
    payload
})

export const toggleAddProductDialog = (bool) => ({
    type: type.TOGGLE_ADD_PRODUCT_DIALOG,
    bool
})

export const toggleEditProfileDialog = (bool) => ({
    type: type.TOGGLE_EDIT_PROFILE_DIALOG,
    bool
})

export const toggleLoginDialog = (bool) => ({
    type: type.TOGGLE_LOGIN_DIALOG,
    bool
})

export const toggleRegisterDialog = (bool) => ({
    type: type.TOGGLE_REGISTER_DIALOG,
    bool
})

export const toggleOrderDialog = (bool) => ({
    type: type.TOGGLE_ORDER_DIALOG,
    bool
})