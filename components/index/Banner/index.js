import Carousel from 'react-material-ui-carousel'

import BannerItem from './BannerItem'

import style from './Banner.module.css'
import bannerImage1 from '../../../public/images/banner/nike-shoes-1.jpeg'
import bannerImage2 from '../../../public/images/banner/nike-shoes-2.jpeg'
import bannerImage3 from '../../../public/images/banner/nike-shoes-3.jpeg'
import { connect } from 'react-redux'

const banners = [
    {
        title: "50% Off For Your First Shopping",
        description: "Probably the most random thing you have ever seen!",
        image: bannerImage1
    },
    {
        title: "BROWSE OUR PREMIUM PRODUCT",
        description: "Us which over of signs divide dominion deep fill bring they're meat beho upon own earth without morning over third. Their male dry. They are great appear whose land fly grass.",
        image: bannerImage2
    },
    {
        title: "50% Off For Your First Shopping",
        description: "Probably the most random thing you have ever seen!",
        image: bannerImage3
    }
]

const Banner = () => {
    
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