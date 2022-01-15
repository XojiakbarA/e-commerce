import { Grid, Pagination } from "@mui/material"
import ShopCard from '../../components/shop/ShopCard'
import { wrapper } from "../../redux/store"
import { getShops } from "../../redux/actions"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

const Shops = () => {

    const router = useRouter()
    const data = useSelector(state => state.shops)
    const shops = data.data
    const currentPage = data.meta.current_page
    const lastPage = data.meta.last_page

    const handlePageChange = (e, p) => {
        router.push({
            query: { ...router.query, page: p }
        })
    }

    return(
        <>
            <Grid container spacing={2}>
                {
                    shops.map(shop => (
                        <Grid item xs={12} lg={4} key={shop.id}>
                            <ShopCard shop={shop} />
                        </Grid>
                    ))
                }
            </Grid>
            {
                lastPage > 1 &&
                <Pagination
                    size='large'
                    color='primary'
                    sx={{my: 2}}
                    page={currentPage}
                    count={lastPage}
                    onChange={handlePageChange}
                />
            }
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({query}) => {

    await dispatch(getShops(query))

})

export default Shops