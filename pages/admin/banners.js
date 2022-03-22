import { Grid, Paper } from "@mui/material"
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'
import AdminPageHead from "../../components/common/AdminPageHead"
import { wrapper } from "../../app/store"
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import Carousel from "react-material-ui-carousel"
import { useSelector } from "react-redux"
import BannerItem from "../../components/index/Banner/BannerItem"
import { getBanners } from "../../app/store/actions/async/common"
import { useState } from "react"
import BannersFormTabs from "../../components/admin/BannersFormTabs/BannersFormTabs"

const Banners = () => {

    const banners = useSelector(state => state.banners)

    const [ index, setIndex ] = useState(0)

    const handleBannerChange = (now) => {
        setIndex(now)
    }

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
                    onChange={ handleBannerChange }
                    index={index}
                >
                    {
                        banners.map(banner => (
                            <BannerItem key={banner.id} banner={banner}/>
                        ))
                    }
                </Carousel>
            </Grid>
            <Grid item xs={4}>
                <Paper>
                    <BannersFormTabs
                        banner={banners[index]}
                        handleBannerChange={handleBannerChange}
                    />
                </Paper>
            </Grid>
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