import { Grid } from "@mui/material"
import CommentIcon from '@mui/icons-material/Comment'
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import { wrapper } from "../../app/store"
import { getReviews } from "../../app/store/actions/async/admin"
import { useSelector } from "react-redux"
import AdminPageHead from "../../components/common/AdminPageHead"
import DataTable from "../../components/admin/DataTable/DataTable"
import ReviewsTableRow from "../../components/admin/DataTable/DataTableRows/ReviewsTableRow"
import { useAdminSearch } from "../../app/hooks/useAdminSearch"

const headLabels = [
    {label: 'Published', field: 'published'},
    {label: 'User', field: 'user_name'},
    {label: 'Rating', field: 'rating'},
    {label: 'Text', field: 'text'},
    {label: 'Product', field: 'product_title'},
    {label: 'Created At', field: 'created_at'}
]

const colSpan = (field) => {
    return  field === 'product_title' ||
            field === 'created_at' ||
            field === 'user_name'
            ? 2 : 0
}

function* labelsGenerator() { 
    yield {label: 'By User', field: 'user_name'}
    return {label: 'By Product', field: 'product_title'}
}

const Reviews = () => {

    const reviews = useSelector(state => state.reviews.data)
    const meta = useSelector(state => state.reviews.meta)

    const { label, handleSearch, handleClick } = useAdminSearch(labelsGenerator)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <AdminPageHead
                    title='Reviews'
                    titleIcon={<CommentIcon fontSize='large'/>}
                    onKeyUp={handleSearch}
                    onClick={handleClick}
                    buttonText={label}
                />
            </Grid>
            <Grid item xs={12}>
                <DataTable meta={meta} labels={headLabels} colSpan={colSpan}>
                    {
                        reviews.map(review => (
                            <ReviewsTableRow key={review.id} review={review}/>
                        ))
                    }
                </DataTable>
            </Grid>
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({query, req}) => {

    const cookie = req?.headers.cookie

    query.count = query.count ?? 5
    query.page = query.page ?? 1

    await dispatch(getReviews(query, cookie))

})

export default Reviews

Reviews.getLayout = (page) => {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}