import Carousel from 'react-material-ui-carousel'
import BannerItem from './BannerItem'
import { useSelector } from 'react-redux'

const Banner = () => {

    const banners = useSelector(state => state.banners)

    return (
        <Carousel sx={{ overflow: 'visible' }}>
            {
                banners.map( (banner) => <BannerItem key={banner.id} banner={banner} /> )
            }
        </Carousel>
    )
}

export default Banner