import Carousel from 'react-material-ui-carousel'
import BannerItem from './BannerItem'
import style from './Banner.module.css'
import { connect } from 'react-redux'

const Banner = ({ banners }) => {
    
    return (
        <Carousel className={style.wrapper}>
            {
                banners.map( (banner, i) => <BannerItem key={i} banner={banner} /> )
            }
        </Carousel>
    )
}

const mapStateToProps = (state) => ({
    banners: state.banners
})

export default connect(mapStateToProps)(Banner)