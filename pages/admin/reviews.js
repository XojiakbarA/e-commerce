import { Grid } from "@mui/material"
import CommentIcon from '@mui/icons-material/Comment'
import PageTitle from "../../components/common/PageTitle"
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import ReviewsTable from "../../components/admin/reviews/ReviewsTable"
import { wrapper } from "../../app/store"
import { getReviews } from "../../app/store/actions/async/admin"
import { useSelector } from "react-redux"

const Reviews = () => {

    const reviews = useSelector(state => state.reviews.data)
    const meta = useSelector(state => state.reviews.meta)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageTitle
                    title='Reviews'
                    titleIcon={<CommentIcon fontSize="large"/>}
                />
            </Grid>
            <Grid item xs={12}>
                <ReviewsTable reviews={reviews} meta={meta}/>
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