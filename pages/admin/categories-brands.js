import { Grid } from "@mui/material"
import CategoryIcon from '@mui/icons-material/Category'
import AdminPageHead from '../../components/common/AdminPageHead'
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import ConfirmDialog from "../../components/dialogs/ConfirmDialog"
import DataList from "../../components/admin/DataList/DataList"
import CategoryListItem from "../../components/admin/DataList/DataListItem/CategoryListItem"
import AddListItem from "../../components/admin/DataList/DataListItem/AddListItem"
import CustomListItem from "../../components/admin/DataList/DataListItem/ListItem"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSingleField } from "../../app/hooks/useFormik/useSingleField"
import { wrapper } from "../../app/store"
import { createBrand, createCategory, deleteBrand, deleteCategory, deleteSubCategory, editBrand, getCategories } from "../../app/store/actions/async/admin"
import { toggleDeleteBrandDialog, toggleDeleteCategoryDialog, toggleDeleteSubCategoryDialog } from "../../app/store/actions/dialogActions"
import { titleValidationSchema } from "../../app/hooks/useFormik/validate"

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

    const [ catEdit, setCatEdit ] = useState(false)

    const handleCatCreateSubmit = (data, { resetForm, setSubmitting }) => {
        dispatch(createCategory(data, resetForm, setSubmitting, setCatEdit))
    }

    const catFormik = useSingleField('title', null, handleCatCreateSubmit, titleValidationSchema, catEdit, setCatEdit)

    const [brandEdit, setBrandEdit] = useState(false)

    const handleBrandCreateSubmit = (data, { resetForm, setSubmitting }) => {
        dispatch(createBrand(data, resetForm, setSubmitting, setBrandEdit))
    }

    const brandFormik = useSingleField('title', null, handleBrandCreateSubmit, titleValidationSchema, brandEdit, setBrandEdit)

    const handleBrandEditSubmit = (id, data, resetForm, setSubmitting, setEdit) => {
        dispatch(editBrand(id, data, resetForm, setSubmitting, setEdit))
    }
    const openDeleteBrandDialog = (dialogText, id) => {
        dispatch(toggleDeleteBrandDialog(true, dialogText, id))
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
                <DataList subHeader='Categories'>
                    {
                        categories.map(category => (
                            <CategoryListItem key={category.id} category={category}/>
                        ))
                    }
                    <AddListItem
                        formik={catFormik}
                        edit={catEdit}
                        placeholder='Category Title'
                        listItemText='Add Category'
                        field='title'
                    />
                </DataList>
            </Grid>
            <Grid item xs={4}>
                <DataList subHeader='Brands'>
                    {
                        brands.map(brand => (
                            <CustomListItem
                                key={brand.id}
                                item={brand}
                                field='title'
                                placeholder='Brand Title'
                                handleSubmitEdit={handleBrandEditSubmit}
                                validationSchema={titleValidationSchema}
                                openDeleteDialog={openDeleteBrandDialog}
                            />
                        ))
                    }
                    <AddListItem
                        formik={brandFormik}
                        edit={brandEdit}
                        placeholder='Brand Title'
                        listItemText='Add Brand'
                        field='title'
                    />
                </DataList>
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