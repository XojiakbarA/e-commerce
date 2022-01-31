import { Grid } from "@mui/material"
import ShopCard from '../../components/shop/ShopCard'
import { wrapper } from "../../app/store"
import { getShops } from "../../app/store/actions/async/common"
import { useSelector } from "react-redux"
import MyPagination from "../../components/common/Pagination"

const Shops = () => {

    const shops = useSelector(state => state.shops.data)
    const meta = useSelector(state => state.shops.meta)

    return(
        <Grid container spacing={2}>
            {
                shops.map(shop => (
                    <Grid item xs={12} lg={4} key={shop.id}>
                        <ShopCard shop={shop} />
                    </Grid>
                ))
            }
            {
                meta.last_page > 1 &&
                <Grid item xs={12}>
                    <MyPagination meta={meta}/>
                </Grid>
            }
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({query}) => {

    await dispatch(getShops(query))

})

export default Shops