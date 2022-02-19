import { Grid } from "@mui/material"
import CategoryIcon from '@mui/icons-material/Category'
import AdminPageHead from '../../components/common/AdminPageHead'
import { wrapper } from "../../app/store"
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import DataTabs from "../../components/admin/DataTabs/DataTabs"
import { getCategories } from "../../app/store/actions/async/admin"
import { useSelector } from "react-redux"

const Categories = () => {

    const categories = useSelector(state => state.categories)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <AdminPageHead
                    title='Categories'
                    titleIcon={<CategoryIcon fontSize='large'/>}
                />
            </Grid>
            <Grid item xs={12}>
                <DataTabs categories={categories}/>
            </Grid>
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({query, req}) => {

    const cookie = req?.headers.cookie

    await dispatch(getCategories(cookie))

})

export default Categories

Categories.getLayout = (page) => {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}