import { Grid, Paper } from "@mui/material"
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'
import AdminPageHead from "../../components/common/AdminPageHead"
import { wrapper } from "../../app/store"
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import Carousel from "react-material-ui-carousel"
import { useSelector } from "react-redux"
import BannerItem from "../../components/index/Banner/BannerItem"
import { getBanners } from "../../app/store/actions/async/common"
import EditBannerForm from "../../components/forms/EditBannerForm"
import { useState } from "react"

const Banners = () => {

    const [ bannerIndex, setBannerIndex ] = useState(0)

    const banners = useSelector(state => state.banners)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <AdminPageHead
                    title='Banners'
                    titleIcon={<ViewCarouselIcon fontSize='large'/>}
                />
            </Grid>
            <Grid item xs={8}>
                <Carousel
                    autoPlay={false}
                    onChange={ (now) => setBannerIndex(now) }
                    index={bannerIndex}
                >
                    {
                        banners.map(banner => (
                            <BannerItem key={banner.id} banner={banner}/>
                        ))
                    }
                </Carousel>
            </Grid>
            <Grid item xs={4}>
                <Paper sx={{padding: 2}}>
                    <EditBannerForm index={bannerIndex}/>
                </Paper>
            </Grid>
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({query, req}) => {

    const cookie = req?.headers.cookie

    await dispatch(getBanners())

})

export default Banners

Banners.getLayout = (page) => {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}