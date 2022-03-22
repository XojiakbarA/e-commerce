import { Grid } from "@mui/material"
import CategoryIcon from '@mui/icons-material/Category'
import AdminPageHead from '../../components/common/AdminPageHead'
import { wrapper } from "../../app/store"
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import { deleteBrand, deleteCategory, deleteSubCategory, getCategories } from "../../app/store/actions/async/admin"
import { useDispatch, useSelector } from "react-redux"
import CategoryList from "../../components/admin/CategoryList/CategoryList"
import BrandList from "../../components/admin/BrandList/BrandList"
import ConfirmDialog from "../../components/dialogs/ConfirmDialog"
import { toggleDeleteBrandDialog, toggleDeleteCategoryDialog, toggleDeleteSubCategoryDialog } from "../../app/store/actions/dialogActions"

const CategoriesBrands = () => {

    const dispatch = useDispatch()

    const categories = useSelector(state => state.categories)
    const brands = useSelector(state => state.brands)

    const {
        loading, text, cat_id, sub_cat_id, brand_id,
        deleteCategoryDialog, deleteSubCategoryDialog, deleteBrandDialog
    } = useSelector(state => state.dialog)

    const closeDeleteCategoryDialog = () => {
        dispatch(toggleDeleteCategoryDialog(false, null, null))
    }
    const closeDeleteSubCategoryDialog = () => {
        dispatch(toggleDeleteSubCategoryDialog(false, null, null))
    }
    const closeDeleteBrandDialog = () => {
        dispatch(toggleDeleteBrandDialog(false, null, null))
    }
    const handleCategoryDeleteClick = () => {
        dispatch(deleteCategory(cat_id))
    }
    const handleSubCategoryDeleteClick = () => {
        dispatch(deleteSubCategory(sub_cat_id))
    }
    const handleBrandDeleteClick = () => {
        dispatch(deleteBrand(brand_id))
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <AdminPageHead
                    title='Categories & Brands'
                    titleIcon={<CategoryIcon fontSize='large'/>}
                />
            </Grid>
            <Grid item xs={4}>
                <CategoryList categories={categories}/>
            </Grid>
            <Grid item xs={4}>
                <BrandList brands={brands}/>
            </Grid>
            <ConfirmDialog
                open={deleteCategoryDialog}
                content={text}
                loading={loading}
                handleCancelClick={closeDeleteCategoryDialog}
                handleConfirmClick={handleCategoryDeleteClick}
            />
            <ConfirmDialog
                open={deleteSubCategoryDialog}
                content={text}
                loading={loading}
                handleCancelClick={closeDeleteSubCategoryDialog}
                handleConfirmClick={handleSubCategoryDeleteClick}
            />
            <ConfirmDialog
                open={deleteBrandDialog}
                content={text}
                loading={loading}
                handleCancelClick={closeDeleteBrandDialog}
                handleConfirmClick={handleBrandDeleteClick}
            />
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch, getState}) => async ({query, req}) => {

    const cookie = req?.headers.cookie
    const isAdmin = getState()?.user?.role == 'admin'

    if (!isAdmin) {
        return {
            notFound: true
        }
    }

    await dispatch(getCategories(cookie))

})

export default CategoriesBrands

CategoriesBrands.getLayout = (page) => {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}