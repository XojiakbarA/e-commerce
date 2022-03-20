import { Grid } from "@mui/material"
import CategoryIcon from '@mui/icons-material/Category'
import AdminPageHead from '../../components/common/AdminPageHead'
import { wrapper } from "../../app/store"
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import { deleteCategory, getCategories } from "../../app/store/actions/async/admin"
import { useDispatch, useSelector } from "react-redux"
import CategoryList from "../../components/admin/CategoryList/CategoryList"
import BrandList from "../../components/admin/BrandList/BrandList"
import ConfirmDialog from "../../components/dialogs/ConfirmDialog"
import { useToggle } from "../../app/hooks/useToggle"
import { useFieldTitle } from "../../app/hooks/useFormik/useFieldTitle"

const CategoriesBrands = () => {

    const dispatch = useDispatch()

    const categories = useSelector(state => state.categories)
    const brands = useSelector(state => state.brands)

    const { deleteCategoryDialog, closeDeleteCategoryDialog } = useToggle()

    const { isOpen, text, payload } = deleteCategoryDialog

    const { isSubmitting, setSubmitting } = useFieldTitle()

    const handleDeleteClick = () => {
        dispatch(deleteCategory(payload.id, setSubmitting))
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
                <ConfirmDialog
                    open={isOpen}
                    content={text}
                    loading={isSubmitting}
                    handleCancelClick={closeDeleteCategoryDialog}
                    handleConfirmClick={handleDeleteClick}
                />
            </Grid>
            <Grid item xs={4}>
                <BrandList brands={brands}/>
            </Grid>
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({query, req}) => {

    const cookie = req?.headers.cookie

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