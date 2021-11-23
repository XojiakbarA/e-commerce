import Carousel from 'react-material-ui-carousel'
import BannerItem from './BannerItem'
import style from './Banner.module.css'
import { useSelector } from 'react-redux'

const Banner = () => {

    const banners = useSelector(state => state.banners)

    return (
        <Carousel className={style.wrapper}>
            {
                banners.map( (banner, i) => <BannerItem key={i} banner={banner} /> )
            }
        </Carousel>
    )
}

export default Banner