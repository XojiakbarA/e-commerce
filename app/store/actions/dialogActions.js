import * as type from './types'

export const toggleDialogLoading = (bool) => ({
    type: type.TOGGLE_DIALOG_LOADING,
    bool
})

export const toggleOrderShipDialog = (bool, text) => ({
    type: type.TOGGLE_ORDER_SHIP_DIALOG,
    bool,
    text
})

export const toggleCancelOrderDialog = (bool, text, id) => ({
    type: type.TOGGLE_CANCEL_ORDER_DIALOG,
    bool,
    text,
    id
})

export const toggleDeleteCategoryDialog = (bool, text, id) => ({
    type: type.TOGGLE_DELETE_CATEGORY_DIALOG,
    bool,
    text,
    id
})

export const toggleDeleteSubCategoryDialog = (bool, text, id) => ({
    type: type.TOGGLE_DELETE_SUB_CATEGORY_DIALOG,
    bool,
    text,
    id
})

export const toggleDeleteBrandDialog = (bool, text, id) => ({
    type: type.TOGGLE_DELETE_BRAND_DIALOG,
    bool,
    text,
    id
})

export const toggleDeleteRegionDialog = (bool, text, id) => ({
    type: type.TOGGLE_DELETE_REGION_DIALOG,
    bool,
    text,
    id
})

export const toggleDeleteDistrictDialog = (bool, text, id) => ({
    type: type.TOGGLE_DELETE_DISTRICT_DIALOG,
    bool,
    text,
    id
})

export const toggleDeleteProductDialog = (bool, text, id) => ({
    type: type.TOGGLE_DELETE_PRODUCT_DIALOG,
    bool,
    text,
    id
})

export const toggleDeleteProductImageDialog = (bool, text, id) => ({
    type: type.TOGGLE_DELETE_PRODUCT_IMAGE_DIALOG,
    bool,
    text,
    id
})

export const toggleDeleteProfileImageDialog = (bool, text, id) => ({
    type: type.TOGGLE_DELETE_PROFILE_IMAGE_DIALOG,
    bool,
    text,
    id
})

export const toggleDeleteBannerDialog = (bool, text, id) => ({
    type: type.TOGGLE_DELETE_BANNER_DIALOG,
    bool,
    text,
    id
})

export const toggleAddReviewDialog = (bool, id) => ({
    type: type.TOGGLE_ADD_REVIEW_DIALOG,
    bool,
    id
})

export const toggleViewProductDialog = (bool, id) => ({
    type: type.TOGGLE_VIEW_PRODUCT_DIALOG,
    bool,
    id
})

export const toggleEditProductDialog = (bool, id) => ({
    type: type.TOGGLE_EDIT_PRODUCT_DIALOG,
    bool,
    id
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