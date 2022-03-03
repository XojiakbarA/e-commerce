import {
    destroyBanner,
    destroyBrand,
    destroyCategory, destroyDistrict, destroyRegion, destroySubCategory, fetchCategories, fetchProducts,
    fetchRegions,
    fetchReviews, storeBanner, storeBrand, storeCategory, storeDistrict, storeRegion, storeSubCategory, updateBanner,
    updateBrand, updateCategory, updateDistrict, updateProductPublished, updateRegion, updateReviewPublished,
    updateSubCategory
} from "../../../../api/admin"
import {
    addBanner,
    addBrand, addCategory, addDistrict, addRegion, addSubCategory, dropBanner, dropBrand, dropCategory, dropDistrict, dropRegion, dropSubCategory,
    setCategories, setLoading, setProducts, setRegions, setReviews, setSnackbar,
    toggleDeleteBannerDialog,
    toggleDeleteBrandDialog,
    toggleDeleteCategoryDialog, toggleDeleteDistrictDialog, toggleDeleteRegionDialog, toggleDeleteSubCategoryDialog,
    updateBanners, updateBrands, updateCategories, updateDistricts, updateRegions, updateSubCategories
} from "../actionCreators"
import router from "next/router"

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

export const editProductPublished = (id, query, setIsClicked, data) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await updateProductPublished(id, data)
            if (res.status === 200) {
                setIsClicked(false)
                dispatch(setLoading(false))
                await router.push({query})
                dispatch(setSnackbar({isOpen: true, text: `Product ${!data.published ? 'un' : ''}published successfully!`}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const editReviewPublished = (id, query, setIsClicked, data) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await updateReviewPublished(id, data)
            if (res.status === 200) {
                setIsClicked(false)
                dispatch(setLoading(false))
                await router.push({query}, null, {scroll: false})
                dispatch(setSnackbar({isOpen: true, text: `Review ${!data.published ? 'un' : ''}published successfully!`}))
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
                dispatch(setSnackbar({isOpen: true, text: `Category created successfully!`}))
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
                dispatch(setSnackbar({isOpen: true, text: `Sub Category created successfully!`}))
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
                dispatch(setSnackbar({isOpen: true, text: `Brand created successfully!`}))
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
                dispatch(setSnackbar({isOpen: true, text: `Category updated successfully!`}))
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
                dispatch(setSnackbar({isOpen: true, text: `Sub Category updated successfully!`}))
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
                dispatch(setSnackbar({isOpen: true, text: `Brand updated successfully!`}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const createBanner = (data, resetForm, setSubmitting) => {
    return async (dispatch) => {
        try {
            const res = await storeBanner(data)
            if (res.status === 201) {
                dispatch(addBanner(res.data.data))
                resetForm()
                setSubmitting(false)
                dispatch(setSnackbar({isOpen: true, text: `Banner created successfully!`}))
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
                dispatch(setSnackbar({isOpen: true, text: `Banner updated successfully!`}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteBanner = (id, setSubmitting, handleBannerChange) => {
    return async (dispatch) => {
        try {
            setSubmitting(true)
            const res = await destroyBanner(id)
            if (res.status === 204) {
                handleBannerChange(0)
                dispatch(dropBanner(id))
                setSubmitting(false)
                dispatch(toggleDeleteBannerDialog(false, '', {}))
                dispatch(setSnackbar({isOpen: true, text: `Banner deleted successfully!`}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteCategory = (id, setSubmitting) => {
    return async (dispatch) => {
        try {
            setSubmitting(true)
            const res = await destroyCategory(id)
            if (res.status === 204) {
                dispatch(dropCategory(id))
                setSubmitting(false)
                dispatch(toggleDeleteCategoryDialog(false, '', {}))
                dispatch(setSnackbar({isOpen: true, text: `Category deleted successfully!`}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteSubCategory = (id, setSubmitting) => {
    return async (dispatch) => {
        try {
            setSubmitting(true)
            const res = await destroySubCategory(id)
            if (res.status === 204) {
                dispatch(dropSubCategory(id))
                setSubmitting(false)
                dispatch(toggleDeleteSubCategoryDialog(false, '', {}))
                dispatch(setSnackbar({isOpen: true, text: `Sub Category deleted successfully!`}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteBrand = (id, setSubmitting) => {
    return async (dispatch) => {
        try {
            setSubmitting(true)
            const res = await destroyBrand(id)
            if (res.status === 204) {
                dispatch(dropBrand(id))
                setSubmitting(false)
                dispatch(toggleDeleteBrandDialog(false, '', {}))
                dispatch(setSnackbar({isOpen: true, text: `Brand deleted successfully!`}))
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
                dispatch(setSnackbar({isOpen: true, text: `Region created successfully!`}))
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
                dispatch(setSnackbar({isOpen: true, text: `Region updated successfully!`}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteRegion = (id, setSubmitting, handleSelectedClick) => {
    return async (dispatch, getState) => {
        try {
            setSubmitting(true)
            const res = await destroyRegion(id)
            if (res.status === 204) {
                dispatch(dropRegion(id))
                handleSelectedClick(getState().regions[0])
                setSubmitting(false)
                dispatch(toggleDeleteRegionDialog(false, '', {}))
                dispatch(setSnackbar({isOpen: true, text: `Region deleted successfully!`}))
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
                dispatch(setSnackbar({isOpen: true, text: `District created successfully!`}))
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
                dispatch(setSnackbar({isOpen: true, text: `District updated successfully!`}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteDistrict = (id, setSubmitting) => {
    return async (dispatch) => {
        try {
            setSubmitting(true)
            const res = await destroyDistrict(id)
            if (res.status === 204) {
                dispatch(dropDistrict(id))
                setSubmitting(false)
                dispatch(toggleDeleteDistrictDialog(false, '', {}))
                dispatch(setSnackbar({isOpen: true, text: `District deleted successfully!`}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}