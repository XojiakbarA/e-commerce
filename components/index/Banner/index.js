import Carousel from 'react-material-ui-carousel'
import BannerItem from './BannerItem'
import style from './Banner.module.css'
import { useSelector } from 'react-redux'

const Banner = () => {

    const banners = useSelector(state => state.banners)

    return (
        <Carousel className={style.wrapper} autoPlay={false}>
            {
                banners.map( (banner) => <BannerItem key={banner.id} banner={banner} /> )
            }
        </Carousel>
    )
}

export default Banner