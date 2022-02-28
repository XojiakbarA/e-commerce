import * as type from './types'

export const setCart = (cart) => ({
    type: type.SET_CART,
    payload: cart
})

export const setWishlist = (wishlist) => ({
    type: type.SET_WISHLIST,
    payload: wishlist
})

export const setUser = (user) => ({
    type: type.SET_USER,
    payload: user
})

export const setCategory = (category) => ({
    type: type.SET_CATEGORY,
    payload: category
})

export const setCategories = (categories) => ({
    type: type.SET_CATEGORIES,
    payload: categories
})

export const updateCategories = (category) => ({
    type: type.UPDATE_CATEGORIES,
    payload: category
})

export const updateSubCategories = (sub_category) => ({
    type: type.UPDATE_SUB_CATEGORIES,
    payload: sub_category
})

export const updateBrands = (brand) => ({
    type: type.UPDATE_BRANDS,
    payload: brand
})

export const addCategory = (category) => ({
    type: type.ADD_CATEGORY,
    payload: category
})

export const dropCategory = (id) => ({
    type: type.DELETE_CATEGORY,
    payload: id
})

export const addSubCategory = (sub_category, category_id) => ({
    type: type.ADD_SUB_CATEGORY,
    payload: sub_category,
    category_id
})

export const dropSubCategory = (id) => ({
    type: type.DELETE_SUB_CATEGORY,
    payload: id
})

export const addBrand = (brand) => ({
    type: type.ADD_BRAND,
    payload: brand
})

export const dropBrand = (id) => ({
    type: type.DELETE_BRAND,
    payload: id
})

export const setBrands = (brands) => ({
    type: type.SET_BRANDS,
    payload: brands
})

export const setBanners = (banners) => ({
    type: type.SET_BANNERS,
    payload: banners
})

export const updateBanners = (banner) => ({
    type: type.UPDATE_BANNERS,
    payload: banner
})

export const setProducts = (products) => ({
    type: type.SET_PRODUCTS,
    payload: products
})

export const setProduct = (product) => ({
    type: type.SET_PRODUCT,
    payload: product
})

export const toggleCartSidebar = (bool) => ({
    type: type.TOGGLE_CART_SIDEBAR,
    payload: bool
})

export const toggleLoginDialog = (bool) => ({
    type: type.TOGGLE_LOGIN_DIALOG,
    payload: bool
})

export const toggleRegisterDialog = (bool) => ({
    type: type.TOGGLE_REGISTER_DIALOG,
    payload: bool
})

export const toggleOrderDialog = (bool) => ({
    type: type.TOGGLE_ORDER_DIALOG,
    payload: bool
})

export const toggleOrderShipDialog = (bool) => ({
    type: type.TOGGLE_ORDER_SHIP_DIALOG,
    payload: bool
})

export const toggleDeleteCategoryDialog = (bool, text, payload) => ({
    type: type.TOGGLE_DELETE_CATEGORY_DIALOG,
    isOpen: bool,
    text: text,
    payload: payload
})

export const toggleDeleteSubCategoryDialog = (bool, text, payload) => ({
    type: type.TOGGLE_DELETE_SUB_CATEGORY_DIALOG,
    isOpen: bool,
    text: text,
    payload: payload
})

export const toggleDeleteBrandDialog = (bool, text, payload) => ({
    type: type.TOGGLE_DELETE_BRAND_DIALOG,
    isOpen: bool,
    text: text,
    payload: payload
})

export const toggleDeleteRegionDialog = (bool, text, payload) => ({
    type: type.TOGGLE_DELETE_REGION_DIALOG,
    isOpen: bool,
    text: text,
    payload: payload
})

export const toggleDeleteDistrictDialog = (bool, text, payload) => ({
    type: type.TOGGLE_DELETE_DISTRICT_DIALOG,
    isOpen: bool,
    text: text,
    payload: payload
})

export const toggleDeleteProductDialog = (bool, text, payload) => ({
    type: type.TOGGLE_DELETE_PRODUCT_DIALOG,
    isOpen: bool,
    text: text,
    payload: payload
})

export const toggleEditProfileDialog = (bool) => ({
    type: type.TOGGLE_EDIT_PROFILE_DIALOG,
    payload: bool
})

export const toggleAddProductDialog = (bool) => ({
    type: type.TOGGLE_ADD_PRODUCT_DIALOG,
    payload: bool
})

export const toggleViewProductDialog = (bool) => ({
    type: type.TOGGLE_VIEW_PRODUCT_DIALOG,
    payload: bool
})

export const toggleEditProductDialog = (bool, payload) => ({
    type: type.TOGGLE_EDIT_PRODUCT_DIALOG,
    isOpen: bool,
    payload: payload
})

export const toggleAddReviewDialog = (bool) => ({
    type: type.TOGGLE_ADD_REVIEW_DIALOG,
    payload: bool
})

export const toggleAccountMenu = (anchorEl) => ({
    type: type.TOGGLE_ACCOUNT_MENU,
    payload: anchorEl
})

export const setLoading = (bool) => ({
    type: type.IS_LOADING,
    payload: bool
})

export const setSnackbar = (obj) => ({
    type: type.IS_OPEN_SNACKBAR,
    payload: obj
})

export const setReviews = (reviews) => ({
    type: type.SET_REVIEWS,
    payload: reviews
})

export const setShops = (shops) => ({
    type: type.SET_SHOPS,
    payload: shops
})

export const setShop = (shop) => ({
    type: type.SET_SHOP,
    payload: shop
})

export const setOrders = (orders) => ({
    type: type.SET_ORDERS,
    payload: orders
})

export const setOrder = (order) => ({
    type: type.SET_ORDER,
    payload: order
})

export const setOrderShop = (order) => ({
    type: type.SET_ORDER_SHOP,
    payload: order
})

export const setRegions = (regions) => ({
    type: type.SET_REGIONS,
    payload: regions
})

export const setDistricts = (regions) => ({
    type: type.SET_DISTRICTS,
    payload: regions
})

export const setDistrictFetching = (bool) => ({
    type: type.SET_DISTRICTS_FETCHING,
    payload: bool
})

export const toggleFormSnackbar = (bool, text) => ({
    type: type.TOGGLE_FORM_SNACKBAR,
    isOpen: bool,
    text: text
})

export const addRegion = (region) => ({
    type: type.ADD_REGION,
    payload: region
})

export const updateRegions = (region) => ({
    type: type.UPDATE_REGIONS,
    payload: region
})

export const dropRegion = (id) => ({
    type: type.DELETE_REGION,
    payload: id
})

export const addDistrict = (district, region_id) => ({
    type: type.ADD_DISTRICT,
    payload: district,
    region_id
})

export const updateDistricts = (district) => ({
    type: type.UPDATE_DISTRICTS,
    payload: district
})

export const dropDistrict = (id) => ({
    type: type.DELETE_DISTRICT,
    payload: id
})