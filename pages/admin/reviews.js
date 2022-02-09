import { Grid } from "@mui/material"
import CommentIcon from '@mui/icons-material/Comment'
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import ReviewsTable from "../../components/admin/reviews/ReviewsTable"
import { wrapper } from "../../app/store"
import { getReviews } from "../../app/store/actions/async/admin"
import { useSelector } from "react-redux"
import { useState } from "react"
import { useRouter } from "next/router"
import AdminPageHead from "../../components/common/AdminPageHead"

const Reviews = () => {

    const router = useRouter()

    const reviews = useSelector(state => state.reviews.data)
    const meta = useSelector(state => state.reviews.meta)

    const [filterBy, setFilterBy] = useState('user_name')

    const handleSearch = (e) => {
        const value = e.target.value
        if (e.keyCode === 13) {
            if (!value) return

            if (router.query.user_name) {
                delete router.query.user_name
            } else if (router.query.product_title) {
                delete router.query.product_title
            }
            router.query[filterBy] = value

            router.push({
                query: { ...router.query }
            })
        }
    }
    const handleClick = () => {
        setFilterBy(prev => prev === 'user_name' ? 'product_title' : 'user_name')
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <AdminPageHead
                    title='Products'
                    titleIcon={<CommentIcon fontSize='large'/>}
                    onKeyUp={handleSearch}
                    onClick={handleClick}
                    buttonText={filterBy === 'user_name' ? 'By User' : 'By Product'}
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