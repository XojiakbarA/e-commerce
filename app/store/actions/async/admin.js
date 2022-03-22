import {
    destroyBanner, destroyBrand, destroyCategory, destroyDistrict, destroyRegion, destroySubCategory,
    fetchCategories, fetchProducts, fetchRegions, fetchReviews, storeBanner, storeBrand, storeCategory,
    storeDistrict, storeRegion, storeSubCategory, updateBanner, updateBrand, updateCategory, updateDistrict,
    updateProductPublished, updateRegion, updateReviewPublished, updateSubCategory
} from "../../../../api/admin"
import {
    addBanner, addBrand, addCategory, addDistrict, addRegion, addSubCategory, dropBanner, dropBrand,
    dropCategory, dropDistrict, dropRegion, dropSubCategory, setCategories, setLoading, setProductPublished, setProducts,
    setRegions, setReviewPublished, setReviews, toggleSnackbar, updateBanners, updateBrands, updateCategories,
    updateDistricts, updateRegions, updateSubCategories
} from "../actionCreators"
import {
    toggleDialogLoading, toggleDeleteCategoryDialog, toggleDeleteSubCategoryDialog,
    toggleDeleteBrandDialog, toggleDeleteDistrictDialog, toggleDeleteRegionDialog,
    toggleDeleteBannerDialog
} from "../dialogActions"

export const getProducts = (query, cookie) => {
    return async (dispatch) => {
        try {
            const res = await fetchProducts(query, cookie)
            if (res.status === 200) {
                dispatch(setProducts(res.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const getReviews = (query, cookie) => {
    return async (dispatch) => {
        try {
            const res = await fetchReviews(query, cookie)
            if (res.status === 200) {
                dispatch(setReviews(res.data))
            }
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}

export const getRegions = (cookie) => {
    return async (dispatch) => {
        try {
            const res = await fetchRegions(cookie)
            if (res.status === 200) {
                dispatch(setRegions(res.data.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const editProductPublished = (id, setIsClicked, data) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await updateProductPublished(id, data)
            if (res.status === 200) {
                dispatch(setProductPublished(data.published, id))
                setIsClicked(false)
                dispatch(setLoading(false))
                dispatch(toggleSnackbar(true, `Product ${!data.published ? 'un' : ''}published successfully!`))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const editReviewPublished = (id, setIsClicked, data) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await updateReviewPublished(id, data)
            if (res.status === 200) {
                dispatch(setReviewPublished(data.published, id))
                setIsClicked(false)
                dispatch(setLoading(false))
                dispatch(toggleSnackbar(true, `Review ${!data.published ? 'un' : ''}published successfully!`))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const getCategories = (cookie) => {
    return async (dispatch) => {
        try {
            const res = await fetchCategories(cookie)
            if (res.status === 200) {
                dispatch(setCategories(res.data.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const createCategory = (data, resetForm, setSubmitting, setEdit) => {
    return async (dispatch) => {
        try {
            const res = await storeCategory(data)
            if (res.status === 201) {
                dispatch(addCategory(res.data.data))
                resetForm()
                setSubmitting(false)
                setEdit(false)
                dispatch(toggleSnackbar(true, `Category created successfully!`))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const createSubCategory = (cat_id, data, resetForm, setSubmitting, setEdit) => {
    return async (dispatch) => {
        try {
            const res = await storeSubCategory(cat_id, data)
            if (res.status === 201) {
                dispatch(addSubCategory(res.data.data, cat_id))
                resetForm()
                setSubmitting(false)
                setEdit(false)
                dispatch(toggleSnackbar(true, `Sub Category created successfully!`))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const createBrand = (data, resetForm, setSubmitting, setEdit) => {
    return async (dispatch) => {
        try {
            const res = await storeBrand(data)
            if (res.status === 201) {
                dispatch(addBrand(res.data.data))
                resetForm()
                setSubmitting(false)
                setEdit(false)
                dispatch(toggleSnackbar(true, `Brand created successfully!`))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const editCategory = (id, data, resetForm, setSubmitting, setEdit) => {
    return async (dispatch) => {
        try {
            const res = await updateCategory(id, data)
            if (res.status === 200) {
                dispatch(updateCategories(res.data.data))
                resetForm()
                setSubmitting(false)
                setEdit(false)
                dispatch(toggleSnackbar(true, `Category updated successfully!`))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const editSubCategory = (id, data, resetForm, setSubmitting, setEdit) => {
    return async (dispatch) => {
        try {
            const res = await updateSubCategory(id, data)
            if (res.status === 200) {
                dispatch(updateSubCategories(res.data.data))
                resetForm()
                setSubmitting(false)
                setEdit(false)
                dispatch(toggleSnackbar(true, `Sub Category updated successfully!`))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const editBrand = (id, data, resetForm, setSubmitting, setEdit) => {
    return async (dispatch) => {
        try {
            const res = await updateBrand(id, data)
            if (res.status === 200) {
                dispatch(updateBrands(res.data.data))
                resetForm()
                setSubmitting(false)
                setEdit(false)
                dispatch(toggleSnackbar(true, `Brand updated successfully!`))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const createBanner = (data, setSubmitting, resetForm) => {
    return async (dispatch) => {
        try {
            const res = await storeBanner(data)
            if (res.status === 201) {
                dispatch(addBanner(res.data.data))
                resetForm()
                setSubmitting(false)
                dispatch(toggleSnackbar(true, `Banner created successfully!`))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const editBanner = (id, data, setSubmitting, resetForm) => {
    return async (dispatch) => {
        try {
            const res = await updateBanner(id, data)
            if (res.status === 200) {
                dispatch(updateBanners(res.data.data))
                resetForm()
                setSubmitting(false)
                dispatch(toggleSnackbar(true, `Banner updated successfully!`))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteBanner = (id, handleBannerChange) => {
    return async (dispatch) => {
        try {
            dispatch(toggleDialogLoading(true))
            const res = await destroyBanner(id)
            if (res.status === 204) {
                handleBannerChange(0)
                dispatch(dropBanner(id))
                dispatch(toggleDialogLoading(false))
                dispatch(toggleDeleteBannerDialog(false, null, null))
                dispatch(toggleSnackbar(true, `Banner deleted successfully!`))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteCategory = (id) => {
    return async (dispatch) => {
        try {
            dispatch(toggleDialogLoading(true))
            const res = await destroyCategory(id)
            if (res.status === 204) {
                dispatch(dropCategory(id))
                dispatch(toggleDialogLoading(false))
                dispatch(toggleDeleteCategoryDialog(false, null, null))
                dispatch(toggleSnackbar(true, `Category deleted successfully!`))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteSubCategory = (id) => {
    return async (dispatch) => {
        try {
            dispatch(toggleDialogLoading(true))
            const res = await destroySubCategory(id)
            if (res.status === 204) {
                dispatch(dropSubCategory(id))
                dispatch(toggleDialogLoading(false))
                dispatch(toggleDeleteSubCategoryDialog(false, null, null))
                dispatch(toggleSnackbar(true, `Sub Category deleted successfully!`))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteBrand = (id) => {
    return async (dispatch) => {
        try {
            dispatch(toggleDialogLoading(true))
            const res = await destroyBrand(id)
            if (res.status === 204) {
                dispatch(dropBrand(id))
                dispatch(toggleDialogLoading(false))
                dispatch(toggleDeleteBrandDialog(false, null, null))
                dispatch(toggleSnackbar(true, `Brand deleted successfully!`))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const createRegion = (data, resetForm, setSubmitting, setEdit, handleSelectedClick) => {
    return async (dispatch) => {
        try {
            const res = await storeRegion(data)
            if (res.status === 201) {
                dispatch(addRegion(res.data.data))
                handleSelectedClick(res.data.data)
                resetForm()
                setSubmitting(false)
                setEdit(false)
                dispatch(toggleSnackbar(true, `Region created successfully!`))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const editRegion = (id, data, resetForm, setSubmitting, setEdit) => {
    return async (dispatch) => {
        try {
            const res = await updateRegion(id, data)
            if (res.status === 200) {
                dispatch(updateRegions(res.data.data))
                resetForm()
                setSubmitting(false)
                setEdit(false)
                dispatch(toggleSnackbar(true, `Region updated successfully!`))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteRegion = (id, handleSelectedClick) => {
    return async (dispatch, getState) => {
        try {
            dispatch(toggleDialogLoading(true))
            const res = await destroyRegion(id)
            if (res.status === 204) {
                dispatch(dropRegion(id))
                handleSelectedClick(getState().regions[0])
                dispatch(toggleDialogLoading(false))
                dispatch(toggleDeleteRegionDialog(false, null, null))
                dispatch(toggleSnackbar(true, `Region deleted successfully!`))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const createDistrict = (reg_id, data, resetForm, setSubmitting, setEdit) => {
    return async (dispatch) => {
        try {
            const res = await storeDistrict(reg_id, data)
            if (res.status === 201) {
                dispatch(addDistrict(res.data.data, reg_id))
                resetForm()
                setSubmitting(false)
                setEdit(false)
                dispatch(toggleSnackbar(true, `District created successfully!`))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const editDistrict = (id, data, resetForm, setSubmitting, setEdit) => {
    return async (dispatch) => {
        try {
            const res = await updateDistrict(id, data)
            if (res.status === 200) {
                dispatch(updateDistricts(res.data.data))
                resetForm()
                setSubmitting(false)
                setEdit(false)
                dispatch(toggleSnackbar(true, `District updated successfully!`))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteDistrict = (id) => {
    return async (dispatch) => {
        try {
            dispatch(toggleDialogLoading(true))
            const res = await destroyDistrict(id)
            if (res.status === 204) {
                dispatch(dropDistrict(id))
                dispatch(toggleDialogLoading(false))
                dispatch(toggleDeleteDistrictDialog(false, null, null))
                dispatch(toggleSnackbar(true, `District deleted successfully!`))
            }
        } catch (e) {
            console.log(e)
        }
    }
}