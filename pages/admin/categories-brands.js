import { Grid } from "@mui/material"
import CategoryIcon from '@mui/icons-material/Category'
import AdminPageHead from '../../components/common/AdminPageHead'
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import ConfirmDialog from "../../components/dialogs/ConfirmDialog"
import DataList from "../../components/admin/DataList/DataList"
import AddListItem from "../../components/admin/DataList/DataListItem/AddListItem"
import CustomListItemButton from "../../components/admin/DataList/DataListItem/ListItemButton"
import CustomListItem from "../../components/admin/DataList/DataListItem/ListItem"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { wrapper } from "../../app/store"
import { createBrand, createCategory, createSubCategory, deleteBrand, deleteCategory, deleteSubCategory, editBrand, editCategory, editSubCategory, getCategories } from "../../app/store/actions/async/admin"
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

    const [selected, setSelected] = useState(categories[0])

    const handleSelectedClick = (category) => {
        setSelected(category)
    }

    const closeDeleteCategoryDialog = () => {
        dispatch(toggleDeleteCategoryDialog(false, null, null))
    }
    const closeDeleteSubCategoryDialog = () => {
        dispatch(toggleDeleteSubCategoryDialog(false, null, null))
    }
    const closeDeleteBrandDialog = () => {
        dispatch(toggleDeleteBrandDialog(false, null, null))
    }
    const openDeleteCategoryDialog = (dialogText, id) => {
        dispatch(toggleDeleteCategoryDialog(true, dialogText, id))
    }
    const openDeleteSubCategoryDialog = (dialogText, id) => {
        dispatch(toggleDeleteSubCategoryDialog(true, dialogText, id))
    }
    const openDeleteBrandDialog = (dialogText, id) => {
        dispatch(toggleDeleteBrandDialog(true, dialogText, id))
    }

    const handleCategoryDeleteClick = () => {
        dispatch(deleteCategory(cat_id, handleSelectedClick))
    }
    const handleSubCategoryDeleteClick = () => {
        dispatch(deleteSubCategory(sub_cat_id))
    }
    const handleBrandDeleteClick = () => {
        dispatch(deleteBrand(brand_id))
    }

    const handleCatCreateSubmit = (data, resetForm, setSubmitting, setEdit) => {
        dispatch(createCategory(data, resetForm, setSubmitting, setEdit, handleSelectedClick))
    }
    const handleSubCatCreateSubmit = (data, resetForm, setSubmitting, setEdit, id) => {
        dispatch(createSubCategory(id, data, resetForm, setSubmitting, setEdit))
    }
    const handleBrandCreateSubmit = (data, resetForm, setSubmitting, setEdit) => {
        dispatch(createBrand(data, resetForm, setSubmitting, setEdit))
    }

    const handleCatEditSubmit = (id, data, resetForm, setSubmitting, setEdit) => {
        dispatch(editCategory(id, data, resetForm, setSubmitting, setEdit))
    }
    const handleSubCatEditSubmit = (id, data, resetForm, setSubmitting, setEdit) => {
        dispatch(editSubCategory(id, data, resetForm, setSubmitting, setEdit))
    }
    const handleBrandEditSubmit = (id, data, resetForm, setSubmitting, setEdit) => {
        dispatch(editBrand(id, data, resetForm, setSubmitting, setEdit))
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
                            <CustomListItemButton
                                key={category.id}
                                item={category}
                                field='title'
                                placeholder='Category Title'
                                handleSubmitEdit={handleCatEditSubmit}
                                handleSelectedClick={handleSelectedClick}
                                validationSchema={titleValidationSchema}
                                openDeleteDialog={openDeleteCategoryDialog}
                                isSelected={selected.id === category.id}
                            />
                        ))
                    }
                    <AddListItem
                        field='title'
                        placeholder='Category Title'
                        listItemText='Add Category'
                        handleCreateSubmit={handleCatCreateSubmit}
                        validationSchema={titleValidationSchema}
                    />
                </DataList>
            </Grid>
            <Grid item xs={4}>
                <DataList subHeader='Sub Categories'>
                {
                    selected.sub_categories.map(sub_category => (
                        <CustomListItem
                            key={sub_category.id}
                            item={sub_category}
                            field='title'
                            placeholder='Sub Category Title'
                            handleSubmitEdit={handleSubCatEditSubmit}
                            validationSchema={titleValidationSchema}
                            openDeleteDialog={openDeleteSubCategoryDialog}
                            listItemStyle={{ pl: 4, alignItems: 'flex-start' }}
                        />
                    ))
                }
                <AddListItem
                    field='title'
                    placeholder='Sub Category Title'
                    listItemText='Add Sub Category'
                    listItemStyle={{ pl: 4, alignItems: 'flex-start' }}
                    handleCreateSubmit={handleSubCatCreateSubmit}
                    validationSchema={titleValidationSchema}
                    id={selected.id}
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
                        field='title'
                        placeholder='Brand Title'
                        listItemText='Add Brand'
                        handleCreateSubmit={handleBrandCreateSubmit}
                        validationSchema={titleValidationSchema}
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