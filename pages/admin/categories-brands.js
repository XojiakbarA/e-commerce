import { Grid } from "@mui/material"
import CategoryIcon from '@mui/icons-material/Category'
import AdminPageHead from '../../components/common/AdminPageHead'
import { wrapper } from "../../app/store"
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import { getCategories } from "../../app/store/actions/async/admin"
import { useSelector } from "react-redux"
import CategoryList from "../../components/admin/CategoryList/CategoryList"
import BrandList from "../../components/admin/BrandList/BrandList"
import DeleteCategoryDialog from "../../components/dialogs/DeleteCategoryDialog"

const CategoriesBrands = () => {

    const categories = useSelector(state => state.categories)
    const brands = useSelector(state => state.brands)

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
            <DeleteCategoryDialog/>
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